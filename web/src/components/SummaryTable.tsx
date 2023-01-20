import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import api from '../lib/axios';
import { MIN_SUMMARY_DATES_SIZE, WEEK_DAYS_ABBR } from '../utils/constants';
import generateDatesFromYearBeginning from '../utils/generateRangeFromYearBeginning';
import HabitDay from './HabitDay';
import HabitDayEmpty from './HabitDayEmpty';
import WeekDayLabel from './WeekDayLabel';

type SummaryElement = {
  id: string;
  date: string;
  completed: number;
  amount: number;
};

export default function SummaryTable() {
  const summaryDays = generateDatesFromYearBeginning();

  const amountOfDaysToFill = MIN_SUMMARY_DATES_SIZE - summaryDays.length;

  const [summary, setSummary] = useState<SummaryElement[]>([]);

  useEffect(() => {
    api
      .get('/summary')
      .then(({ data }) => setSummary(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {WEEK_DAYS_ABBR.map((weekDay, i) => (
          <WeekDayLabel key={`week_day_label_${i}`} label={weekDay} />
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDays.map((day, i) => {
          const dayInSummary = summary.find(({ date }) => dayjs(day).isSame(date, 'day'));
          return (
            <HabitDay
              key={`habit_day_${i}`}
              day={day}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_v, i) => (
            <HabitDayEmpty key={`habit_day_empty_${i}`} />
          ))}
      </div>
    </div>
  );
}
