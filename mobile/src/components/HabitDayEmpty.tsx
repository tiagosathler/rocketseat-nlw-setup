import React from 'react';

import { View } from 'react-native';

import { DAY_SIZE } from '../utils/constants';

export default function HabitDayEmpty() {
  return (
    <View
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  );
}
