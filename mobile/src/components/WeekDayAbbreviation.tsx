import React from 'react';

import { Text } from 'react-native';

import { DAY_SIZE } from '../utils/constants';

interface WeekDayLabelInterface {
  abbreviation: string;
}

export default function WeekDayAbbreviation(props: WeekDayLabelInterface) {
  const { abbreviation } = props;
  return (
    <Text className="text-zinc-400 text-xl font-bold text-center mx-1" style={{ width: DAY_SIZE }}>
      {abbreviation}
    </Text>
  );
}
