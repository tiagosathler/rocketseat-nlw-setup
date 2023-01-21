import { Check } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';

import api from '../lib/axios';
import { WEEK_DAYS_NAMES } from '../utils/constants';
import CheckboxCustom from './CheckboxCustom';

export default function NewHabitForm() {
  const [title, setTitle] = useState<string>('');

  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (weekDays.length === 0) {
      return;
    }

    api
      .post('/habit', {
        title,
        weekDays,
      })
      .then(() => {
        window.alert('Hábito criado com sucesso');
      })
      .catch((e) => {
        console.error(e);
        window.alert(`Falha do servidor: ${e.message}`);
      })
      .then(() => {
        setTitle('');
        setWeekDays([]);
      });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;
    setTitle(value);
  }

  function handleToggleCheckbox(i: number) {
    if (weekDays.includes(i)) {
      setWeekDays((prevState) => prevState.filter((e) => e !== i));
    } else {
      setWeekDays((prevState) => [...prevState, i]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        type="text"
        id="title"
        value={title}
        placeholder="ex: Exercícios, dormir, etc"
        onChange={handleInputChange}
        required
      />

      <label htmlFor="confirm-btn" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {WEEK_DAYS_NAMES.map((weekDay, i) => (
          <CheckboxCustom
            key={`week_day_name_${i}`}
            itemStyle="text-white leading-tight"
            item={weekDay}
            onCheckedChange={() => handleToggleCheckbox(i)}
            checked={weekDays.includes(i)}
          />
        ))}
      </div>

      <button
        type="submit"
        id="confirm-btn"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
