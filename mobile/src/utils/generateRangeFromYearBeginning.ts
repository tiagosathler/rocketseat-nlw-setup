import dayjs from 'dayjs';

export default function generateRangeFromYearBeginning(): Date[] {
  const startDate = dayjs().startOf('year');
  const endDate = new Date();

  const dateRange = [];
  let compareDate = startDate;

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dateRange;
}