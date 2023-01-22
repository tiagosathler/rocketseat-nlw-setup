import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

type HoHabitFoundProps = {
  isDateInPast: boolean;
};

export default function NoHabitFound({ isDateInPast }: HoHabitFoundProps) {
  const { navigate } = useNavigation();
  return (
    <View className="mt-10">
      <Text className="text-zinc-400 text-base">
        Você não {isDateInPast ? 'estava' : 'está'} monitorando nenhum hábito neste dia!{' '}
      </Text>

      <Text
        className="mt-4 text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate('new')}
      >
        Comece criando um novo hábito.
      </Text>
    </View>
  );
}
