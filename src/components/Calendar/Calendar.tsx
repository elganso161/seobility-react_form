import React from 'react';
import { checkDateIsEqual } from '../../utils/helpers/date/checkDateIsEqual';
import { checkIsToday } from '../../utils/helpers/date/checkIsToday';
import { formateDate } from '../../utils/helpers/date/formateDate';
import styles from './Calendar.module.scss';
import { useCalendar } from './hooks/useCalendar';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDay?: number;
}

const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  firstWeekDay = 2,
  selectDate,
  selectedDate,
}) => {
  const { state, functions } = useCalendar({
    firstWeekDay,
    locale,
    selectedDate,
  });

  return (
    <>
      <div className={styles.dateContainer}>
        Дата рождения : {formateDate(selectedDate, 'DD MM YYYY')}
      </div>
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <div
            onClick={() => functions.onClickArrow('left')}
            className={styles.calendarHeaderArrowLeft}>
            <b>{'<'}</b>
          </div>
          {state.mode === 'days' && (
            <div onClick={() => functions.setMode('monthes')}>
              {state.monthesNames[state.selectedMonth.monthIndex].month}{' '}
              {state.selectedYear}
            </div>
          )}
          {state.mode === 'monthes' && (
            <div onClick={() => functions.setMode('years')}>
              {state.selectedYear}
            </div>
          )}
          {state.mode === 'years' && (
            <div onClick={() => functions.setMode('days')}>
              {state.selectedYearInterval[0]} -{' '}
              {
                state.selectedYearInterval[
                  state.selectedYearInterval.length - 1
                ]
              }
            </div>
          )}
          <div
            onClick={() => functions.onClickArrow('right')}
            className={styles.calendarHeaderArrowRight}>
            <b>{'>'}</b>
          </div>
        </div>
        <div className={styles.calendarBody}>
          {state.mode === 'days' && (
            <>
              <div className={styles.calendarWeekNames}>
                {state.weekDaysNames.map((weekDaysName) => (
                  <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                ))}
              </div>
              <div className={styles.calendarDays}>
                {state.calendarDays.map((day) => {
                  const isToday = checkIsToday(day.date);
                  const isSelectedDay = checkDateIsEqual(
                    day.date,
                    state.selectedDate.date
                  );
                  const isAdditionalDay =
                    day.monthIndex !== state.selectedMonth.monthIndex;
                  return (
                    <div
                      key={`${day.dayNumber}-${day.monthIndex}`}
                      onClick={() => {
                        functions.setSelectedDay(day);
                        selectDate(day.date);
                      }}
                      className={`${styles.calendarDay} ${
                        isToday ? styles.calendareTodayItem : ''
                      } ${isSelectedDay ? styles.calendarSelectedItem : ''} ${
                        isAdditionalDay ? styles.calendarAdditionalDay : ''
                      }`}>
                      {day.dayNumber}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {state.mode === 'monthes' && (
            <div className={styles.calendarPickItemContainer}>
              {state.monthesNames.map((monthesName) => {
                const isCurrentMonth =
                  new Date().getMonth() === monthesName.monthIndex &&
                  new Date().getFullYear() === state.selectedYear;
                const isSelectedMonth =
                  monthesName.monthIndex === state.selectedMonth.monthIndex;

                return (
                  <div
                    onClick={() => {
                      functions.setSelectedMonthByIndex(monthesName.monthIndex);
                      functions.setMode('days');
                    }}
                    className={`${styles.calendarPickItem} ${
                      isCurrentMonth ? styles.calendareTodayItem : ''
                    } ${isSelectedMonth ? styles.calendarSelectedItem : ''}`}>
                    {monthesName.monthShort}
                  </div>
                );
              })}
            </div>
          )}
          {state.mode === 'years' && (
            <div className={styles.calendarPickItemContainer}>
              <div className={styles.calendarUnchoosableYear}>
                {state.selectedYearInterval[0] - 1}
              </div>
              {state.selectedYearInterval.map((year) => {
                const isCurrentYear = new Date().getFullYear() === year;
                const isSelectedYear = year === state.selectedYear;
                return (
                  <div
                    onClick={() => {
                      functions.setSelectedYear(year);
                      functions.setMode('monthes');
                    }}
                    className={`${styles.calendarPickItem} ${
                      isCurrentYear ? styles.calendareTodayItem : ''
                    } ${isSelectedYear ? styles.calendarSelectedItem : ''}`}>
                    {year}
                  </div>
                );
              })}
              <div className={styles.calendarUnchoosableYear}>
                {state.selectedYearInterval[
                  state.selectedYearInterval.length - 1
                ] + 1}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
