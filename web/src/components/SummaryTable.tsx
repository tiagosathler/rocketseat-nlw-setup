import generateDatesFromYearBeginning from '../utils/generateRangeFromYearBeginning';
import HabitDay from './HabitDay';
import HabitDayEmpty from './HabitDayEmpty';
import WeekDayLabel from './WeekDayLabel';

export default function SummaryTable() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const summaryDays = generateDatesFromYearBeginning();

  const MIN_SUMMARY_DATES_SIZE = 18 * 7;
  const amountOfDaysToFill = MIN_SUMMARY_DATES_SIZE - summaryDays.length;

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => (
          <WeekDayLabel key={`week_day_label_${i}`} label={weekDay} />
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDays.map((date, i) => (
          <HabitDay key={`habit_day_${i}`} completed={i} />
        ))}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_v, i) => (
            <HabitDayEmpty key={`habit_day_empty_${i}`} />
          ))}
      </div>
    </div>
  );
}
