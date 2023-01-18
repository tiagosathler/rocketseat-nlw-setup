import React from 'react';

import { Text } from 'react-native';

import { DAY_SIZE } from '../utils/constants';

interface WeekDayLabelInterface {
  label: string;
}

export default function WeekDayLabel(props: WeekDayLabelInterface) {
  const { label } = props;
  return (
    <Text className="text-zinc-400 text-xl font-bold text-center mx-1" style={{ width: DAY_SIZE }}>
      {label}
    </Text>
  );
}
