import dayjs from 'dayjs';
import { Habit } from '@prisma/client';
import prisma from '../lib/prisma';

interface IHabit {
  title: string
  weekDays: number[]
}

interface IDate {
  date: Date
}

export interface IGetDay {
  possibleHabits: Habit[]
  completedHabits?: string[]
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

export {
  createHabitService,
  getDayService,
};
