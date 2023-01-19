import dayjs from 'dayjs';
import { Habit } from '@prisma/client';
import prisma from '../lib/prisma';

export interface IHabit {
  title: string
  weekDays: number[]
}

export interface IDate {
  date: Date
}

export interface IGetDay {
  possibleHabits: Habit[]
  completedHabits?: string[]
}

export interface IToggleHabit {
  id: string
}

export interface ISummary {
  id: string
  date: Date
  completed: number
  amount: number
}

async function createHabitService(habit: IHabit): Promise<void> {
  const { title, weekDays } = habit;
  const today = dayjs().startOf('day').toDate();

  await prisma.habit.create({
    data: {
      title,
      created_at: today,
      weekDays: {
        create: weekDays.map((weekDay) => ({
          week_day: weekDay,
        })),
      },
    },
  });
}

async function getDayService(arg: IDate): Promise<IGetDay> {
  const parsedDate = dayjs(arg.date).startOf('day');
  const weekDay = parsedDate.get('day');

  const possibleHabits = await prisma.habit.findMany({
    where: { created_at: { lte: arg.date },
      weekDays: { some: {
        week_day: weekDay } },
    },
  });

  const day = await prisma.day.findFirst({
    where: { date: parsedDate.toDate() },
    include: { dayHabits: true },
  });

  const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id);

  return {
    possibleHabits,
    completedHabits,
  };
}

async function toggleHabitService(arg: IToggleHabit): Promise<void> {
  const { id } = arg;
  const today = dayjs().startOf('day').toDate();

  let day = await prisma.day.findUnique({ where: { date: today } });

  if (day === null) {
    day = await prisma.day.create({ data: { date: today } });
  }

  const dayHabit = await prisma.dayHabit.findUnique({
    where: { day_id_habit_id: { day_id: day.id, habit_id: id } } });

  if (dayHabit === null) {
    await prisma.dayHabit.create({ data: { day_id: day.id, habit_id: id } });
    return;
  }

  await prisma.dayHabit.delete({ where: { id: dayHabit.id } });
}

// eslint-disable-next-line max-lines-per-function
async function getSummaryService(): Promise<ISummary[]> {
  const summary: ISummary[] = await prisma.$queryRaw`
    SELECT
      D.id,
      D.date,
      (
        SELECT
          cast(count(*) as float)
        FROM day_habits DH
        WHERE
          DH.day_id = D.id
      ) as completed,
      (
        SELECT
          cast(count(*) as float)
        FROM habit_week_days HWD
        JOIN habits H
          ON H.id = HWD.habit_id
        WHERE
          HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND
          H.created_at <= D.date
      ) as amount
    FROM days D`;

  return summary;
}

export {
  createHabitService,
  getDayService,
  toggleHabitService,
  getSummaryService,
};
