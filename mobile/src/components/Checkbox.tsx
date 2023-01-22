import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

interface Props extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export default function Checkbox({ checked = false, title, ...rest }: Props) {
  return (
    <TouchableOpacity className="flex-row mb-2 items-center" activeOpacity={0.7} {...rest}>
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      )}

      <Text className="text-white font-semibold text-base ml-3">{title}</Text>
    </TouchableOpacity>
  );
}
