/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import clsx from 'clsx';

import BackButton from '../components/BackButton';
import Checkbox from '../components/Checkbox';

import api from '../lib/axios';

import { WEEK_DAYS_NAMES } from '../utils/constants';

export default function New() {
  const { goBack } = useNavigation();

  const [weekDays, setWeekDays] = useState<number[]>([]);

  const [title, setTitle] = useState<string>('');

  const [enabledCheckbox, setEnabledCheckbox] = useState<boolean>(false);

  function handleSubmit() {
    api
      .post('/habits', {
        title: title.trim(),
        weekDays,
      })
      .then(() => {
        Alert.alert('Hábito criado com sucesso!');
      })
      .catch((e) => {
        console.error(e);
        Alert.alert('Falha na conexão com o servidor');
      })
      .finally(() => goBack());
  }

  useEffect(
    () => setEnabledCheckbox(title.trim().length > 0 && weekDays.length > 0),
    [title, weekDays],
  );

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex));
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">Criar hábito</Text>

        <Text className="mt-6 text-white font-semibold text-base">Qual seu comprometimento?</Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-x-green-600"
          placeholder="Exercícios, dormir bem, etc"
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={setTitle}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">Qual a recorrência?</Text>

        {WEEK_DAYS_NAMES.map((weekDay, i) => (
          <Checkbox
            key={`week_day_name_${i}`}
            title={weekDay}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
          />
        ))}

        <TouchableOpacity
          className={clsx(
            'w-full h-14 flex-row items-center justify-center rounded-md mt-6 bg-green-900',
            {
              ['bg-green-600']: enabledCheckbox,
            },
          )}
          activeOpacity={0.7}
          onPress={() => handleSubmit()}
          disabled={!enabledCheckbox}
        >
          <Feather
            name="check"
            size={20}
            color={enabledCheckbox ? colors.white : colors.gray[500]}
          />

          <Text
            className={clsx('font-semibold text-base ml-2 text-gray-500', {
              ['text-white']: enabledCheckbox,
            })}
          >
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
