import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import calculateProgressPercentage from '../utils/calculateProgressPercentage';

import { DAY_SIZE } from '../utils/constants';

interface Props extends TouchableOpacityProps {
  date: Date;
  amount?: number;
  completed?: number;
}

export default function HabitDay({ date, amount = 0, completed = 0, ...rest }: Props) {
  const progress = calculateProgressPercentage(amount, completed);
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx('rounded-lg border-2 m-1', {
        ['bg-zinc-900 border-zinc-800']: progress === 0,
        ['bg-violet-900 border-violet-800']: progress > 0 && progress < 20,
        ['bg-violet-800 border-violet-700']: progress >= 20 && progress < 40,
        ['bg-violet-700 border-violet-600']: progress >= 40 && progress < 60,
        ['bg-violet-600 border-violet-500']: progress >= 60 && progress < 80,
        ['bg-violet-500 border-violet-400']: progress >= 80,
        ['border-white border-4']: isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
