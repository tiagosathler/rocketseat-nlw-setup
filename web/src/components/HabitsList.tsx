import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import api from '../lib/axios';
import CheckboxCustom from './CheckboxCustom';

type PossibleHabit = {
  id: string;
  title: string;
  created_at: string;
};

type CompletedHabit = string;

type ResponseDataApi = {
  possibleHabits: PossibleHabit[];
  completedHabits?: CompletedHabit[];
};

interface HabitsListProps {
  day: Date;
  onCompletedChange: (completed: number) => void;
}

export default function HabitsList({ day, onCompletedChange }: HabitsListProps) {
  const [possibleHabits, setPossibleHabits] = useState<PossibleHabit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<CompletedHabit[]>([]);

  const isDateInPast = dayjs(day).endOf('day').isBefore(new Date());

  useEffect(() => {
    api
      .get('/day', {
        params: {
          date: day.toISOString(),
        },
      })
      .then((response) => {
        const data = response.data as ResponseDataApi;

        setPossibleHabits(data.possibleHabits);

        data.completedHabits
          ? setCompletedHabits(data.completedHabits)
          : setCompletedHabits([]);
      })
      .catch((e) => console.error(e));
  }, [day]);

  useEffect(() => {
    onCompletedChange(completedHabits.length);
  }, [completedHabits, onCompletedChange]);

  function handleToggleChange(id: string) {
    api
      .patch(`/habit/${id}/toggle`)
      .then(() => {
        if (completedHabits.includes(id)) {
          setCompletedHabits((prevState) =>
            prevState.filter((habitId) => habitId !== id),
          );
        } else {
          setCompletedHabits((prevState) => [...prevState, id]);
        }
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {possibleHabits.map(({ id, title }) => (
        <CheckboxCustom
          key={id}
          itemStyle="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
          item={title}
          onCheckedChange={() => handleToggleChange(id)}
          checked={completedHabits.includes(id)}
          disabled={isDateInPast}
        />
      ))}
    </div>
  );
}
