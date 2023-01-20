import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';

import CheckboxCustom from './Checkbox';
import ProgressBar from './ProgressBar';

interface HabitDayProps {
  day: Date;
  completed?: number;
  amount?: number;
}

const POSSIBLE_HABITS = [
  {
    id: '0730ffac-d039-4194-9571-01aa2aa0efbd',
    title: 'Beber 2L água',
    created_at: '2022-12-31T06:00:00.000Z',
  },
  {
    id: '1cf05e8a-2c6b-4e4b-abd4-a0660cd2fe03',
    title: 'Exercitar lógica de programação',
    created_at: '2023-01-17T03:00:00.000Z',
  },
  {
    id: 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00',
    title: 'Dormir 8h',
    created_at: '2023-01-08T06:00:00.000Z',
  },
];

const COMPLETED_HABITS = ['1cf05e8a-2c6b-4e4b-abd4-a0660cd2fe03'];

// type CompletedHabits = string[];
// type PossibleHabit = {
//   id: string;
//   title: string;
//   created_at: string;
// };

// interface Summary {
//   completedHabits?: CompletedHabits;
//   possibleHabits: PossibleHabit[];
// }

export default function HabitDay({ day, amount = 1, completed = 0 }: HabitDayProps) {
  const progress = Math.round((100 * completed) / amount);
  const weekDay = dayjs(day).format('dddd');
  const dayAndMonth = dayjs(day).format('DD/MM');

  const [completedHabits, setCompletedHabits] = useState(COMPLETED_HABITS);

  function handleCheckedChange(id: string) {
    if (completedHabits.includes(id)) {
      setCompletedHabits((prevState) => prevState.filter((habitId) => habitId !== id));
    } else {
      setCompletedHabits((prevState) => [...prevState, id]);
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg', {
          'bg-zinc-900 border-zinc-800': progress === 0,
          'bg-violet-900 border-violet-800': progress > 0 && progress < 20,
          'bg-violet-800 border-violet-700': progress >= 20 && progress < 40,
          'bg-violet-700 border-violet-600': progress >= 40 && progress < 60,
          'bg-violet-600 border-violet-500': progress >= 60 && progress < 80,
          'bg-violet-500 border-violet-400': progress >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{weekDay}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={progress} />

          <div className="mt-6 flex flex-col gap-3">
            {POSSIBLE_HABITS.map(({ id, title }) => (
              <CheckboxCustom
                key={id}
                rootStyle="flex items-center gap-3 group"
                itemStyle="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
                item={title}
                onCheckedChange={() => handleCheckedChange(id)}
                checked={completedHabits.includes(id)}
              />
            ))}
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
