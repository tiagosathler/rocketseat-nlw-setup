import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const beberAguaId = '0730ffac-d039-4194-9571-01aa2aa0efbd';
const exercitarId = '00880d75-a933-4fef-94ab-e05744435297';
const dormirId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00';
const pilotarId = '0fde0a6a-4eaa-4baf-a8a5-1007d4c2c10c';
const almocarId = 'ce42388e-c863-4680-bef8-cc611dd362bb';
const lerId = '2c30bf80-a1c1-40a5-9f4c-269ba412e96d';

// Hábito 'Beber 2l água' às segundas, terças e quartas
const beberAguaHabito = prisma.habit.create({
  data: {
    id: beberAguaId,
    title: 'Beber 2L água',
    created_at: new Date('2022-12-31T03:00:00.000'),
    weekDays: {
      create: [
        { week_day: 1 },
        { week_day: 2 },
        { week_day: 3 },
      ],
    },
  },
});

// Hábito 'Exercitar' às quartas, quintas e sextas
const exercitarHabito = prisma.habit.create({
  data: {
    id: exercitarId,
    title: 'Exercitar',
    created_at: new Date('2023-01-03T03:00:00.000'),
    weekDays: {
      create: [
        { week_day: 3 },
        { week_day: 4 },
        { week_day: 5 },
      ],
    },
  },
});

// Hábito 'Dormir 8h' às segunda, terça, quarta, quinta e sexta
const dormirHabito = prisma.habit.create({
  data: {
    id: dormirId,
    title: 'Dormir 8h',
    created_at: new Date('2023-01-08T03:00:00.000'),
    weekDays: {
      create: [
        { week_day: 1 },
        { week_day: 2 },
        { week_day: 3 },
        { week_day: 4 },
        { week_day: 5 },
      ],
    },
  },
});

// Hábito 'Pilotar' aos domingos
const pilotarHabito = prisma.habit.create({
  data: {
    id: pilotarId,
    title: 'Pilotar',
    created_at: new Date('2023-01-08T03:00:00.000'),
    weekDays: {
      create: [
        { week_day: 0 },
      ],
    },
  },
});

// Hábito 'Almoçar em família' aos sábados
const almocarHabito = prisma.habit.create({
  data: {
    id: almocarId,
    title: 'Almoçar em família',
    created_at: new Date('2022-12-30T03:00:00.000'),
    weekDays: {
      create: [
        { week_day: 6 },
      ],
    },
  },
});

// Hábito 'Ler um livro' às quartas e domingos
const lerHabito = prisma.habit.create({
  data: {
    id: lerId,
    title: 'Ler um livro',
    created_at: new Date('2022-12-04T03:00:00.000'),
    weekDays: {
      create: [
        { week_day: 0 },
        { week_day: 3 },
      ],
    },
  },
});

// Amostras de tarefas concluídas

// 'Beber 2L água' no dia 02/01 - segunda
const sample1 = prisma.day.create({
  data: {
    /** Monday */
    date: new Date('2023-01-02T03:00:00.000z'),
    dayHabits: {
      create: {
        habit_id: beberAguaId,
      },
    },
  },
});

// 'Beber 2L água' no dia 11/01 - quarta
const sample2 = prisma.day.create({
  data: {
    /** Friday */
    date: new Date('2023-01-11T03:00:00.000z'),
    dayHabits: {
      create: {
        habit_id: beberAguaId,
      },
    },
  },
});

// 'Beber 2L água' no dia 04/01 - segunda
// 'Exercitar' no dia 04/01 - segunda
const sample3 = prisma.day.create({
  data: {
    /** Wednesday */
    date: new Date('2023-01-04T03:00:00.000z'),
    dayHabits: {
      create: [
        { habit_id: beberAguaId },
      ],
    },
  },
});

// 'Pilotar' no dia 15/01 - domingo
const sample4 = prisma.day.create({
  data: {
    /** Sunday */
    date: new Date('2023-01-15T03:00:00.000z'),
    dayHabits: {
      create: [
        { habit_id: pilotarId },
      ],
    },
  },
});

// 'Almoço em família' no dia '14/01 - sábado'
const sample5 = prisma.day.create({
  data: {
    /** Sunday */
    date: new Date('2023-01-14T03:00:00.000z'),
    dayHabits: {
      create: [
        { habit_id: almocarId },
      ],
    },
  },
});

// 'Dormir 8h' no dia '10/01 - terça'
const sample6 = prisma.day.create({
  data: {
    /** Sunday */
    date: new Date('2023-01-10T03:00:00.000z'),
    dayHabits: {
      create: [
        { habit_id: dormirId },
      ],
    },
  },
});

// 'Ler um livro' no dia '18/01 - quarta'
// 'Exercitar' no dia '18/01 - quarta'
// 'Dormir 8h' no dia '18/01 - quarta'
const sample7 = prisma.day.create({
  data: {
    /** Sunday */
    date: new Date('2023-01-18T03:00:00.000z'),
    dayHabits: {
      create: [
        { habit_id: lerId },
        { habit_id: exercitarId },
        { habit_id: dormirId },
      ],
    },
  },
});

async function run(): Promise<void> {
  await prisma.dayHabit.deleteMany();
  await prisma.habitWeekDays.deleteMany();
  await prisma.day.deleteMany();
  await prisma.habit.deleteMany();

  /**
   * Create habits
   */
  await Promise.all([
    beberAguaHabito,
    exercitarHabito,
    dormirHabito,
    pilotarHabito,
    almocarHabito,
    lerHabito,
  ]);

  /**
   * Create done habits
   */
  await Promise.all([sample1, sample2, sample3, sample4, sample5, sample6, sample7]);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
