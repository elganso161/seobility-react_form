import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Calendar from '../Calendar/Calendar';
import styles from './Form.module.scss';

interface InputFields {
  name: string;
  email: string;
  phoneNumber: number;
  message: string;
  calendar: string;
  text: string;
}

const Form: React.FC = () => {
  const [nameValue, setNameValue] = React.useState('');
  const [selectedDate, selectDate] = React.useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputFields>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<InputFields> = (data) => {
    alert(`your name ${data.name}${data.email}${selectedDate}`);
    reset();
    setNameValue('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {errors.name && <div className={styles.error}>{errors.name.message}</div>}
      <input
        className={styles.nameInput}
        {...register('name', {
          required: 'Обязательное поле',
          minLength: {
            value: 3,
            message: 'Минимум 3 символа',
          },
        })}
        onChange={(e) => setNameValue(e.target.value.toUpperCase())}
        value={nameValue}
        placeholder="Имя и Фамилия"
      />
      {errors.email && (
        <div className={styles.error}>{errors.email.message}</div>
      )}
      <input
        className={styles.emailInput}
        {...register('email', {
          required: 'Обязательное поле',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Не верный email',
          },
        })}
        placeholder="Email"
      />
      {errors.phoneNumber && (
        <div className={styles.error}>{errors.phoneNumber.message}</div>
      )}
      <input
        type="number"
        className={styles.phoneInput}
        {...register('phoneNumber', {
          pattern: {
            value: /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            message: 'Не верный номер телефона',
          },
        })}
        placeholder="Введите номер телефона"
      />
      <Calendar
        selectDate={selectDate}
        selectedDate={selectedDate}
        {...register('calendar')}
      />
      {errors.text && <div className={styles.error}>{errors.text.message}</div>}
      <textarea
        className={styles.userMessage}
        {...register('text', {
          minLength: {
            value: 30,
            message: 'Минимум 30 символов',
          },
          maxLength: {
            value: 300,
            message: 'Мфксимум 300 символов',
          },
        })}
      />
      <input type="submit" className={styles.submitButton} />
    </form>
  );
};

export default Form;
