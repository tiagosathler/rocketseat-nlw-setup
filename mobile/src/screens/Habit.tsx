/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackButton from '../components/BackButton';

import dayjs from 'dayjs';
import ProgressBar from '../components/ProgressBar';
import Checkbox from '../components/Checkbox';
import api from '../lib/axios';
import calculateProgressPercentage from '../utils/calculateProgressPercentage';
import { Loading } from '../components/Loading';
import NoHabitFound from '../components/NoHabitFound';
import clsx from 'clsx';

interface Params {
  date: string;
}

type PossibleHabits = Array<{
  id: string;
  title: string;
  created_at: string;
}>;

type CompletedHabits = string[];

type ResponseApiData = {
  possibleHabits: PossibleHabits;
  completedHabits?: CompletedHabits;
};

export default function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const [loading, setLoading] = useState<boolean>(true);

  const [possibleHabits, setSetPossibleHabits] = useState<PossibleHabits>([]);
  const [completedHabits, setCompletedHabits] = useState<CompletedHabits>([]);

  const progress = useMemo<number>(() => {
    const value = calculateProgressPercentage(possibleHabits.length, completedHabits.length);
    return value;
  }, [possibleHabits, completedHabits]);

  const fetchHabits = useCallback(() => {
    setLoading(true);
    api
      .get('/day', {
        params: {
          date,
        },
      })
      .then((response) => {
        const data = response.data as ResponseApiData;
        setSetPossibleHabits(data.possibleHabits);
        data.completedHabits ? setCompletedHabits(data.completedHabits) : [];
      })
      .catch((e) => {
        console.error(e);
        Alert.alert('Ops', 'Não foi carregar as informações dos hábitos!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [date]);

  useEffect(() => {
    fetchHabits();
  }, [date, fetchHabits]);

  function handleToggleCheckbox(id: string) {
    api
      .patch(`/habit/${id}/toggle`)
      .then(() => {
        if (completedHabits.includes(id)) {
          setCompletedHabits((prevState) => prevState.filter((habitId) => habitId !== id));
        } else {
          setCompletedHabits((prevState) => [...prevState, id]);
        }
      })
      .catch((e) => {
        console.error(e);
        Alert.alert('Ops', 'Não foi possível atualizar o hábito!');
      });
  }

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">{dayOfWeek}</Text>

        <Text className="mt-6 text-white font-extrabold text-3xl">{dayAndMonth}</Text>

        {possibleHabits.length > 0 ? (
          <View
            className={clsx('mt-6', {
              ['opacity-50']: isDateInPast,
            })}
          >
            <ProgressBar progress={progress} />

            <View className="mt-6">
              {possibleHabits.map(({ title, id }) => (
                <Checkbox
                  key={id}
                  title={title}
                  checked={completedHabits.includes(id)}
                  disabled={isDateInPast}
                  onPress={() => handleToggleCheckbox(id)}
                />
              ))}
            </View>

            {isDateInPast && (
              <Text className="text-white mt-10 text-center">
                Você não pode editar hábitos de uma data passada!
              </Text>
            )}
          </View>
        ) : (
          <NoHabitFound isDateInPast={isDateInPast} />
        )}
      </ScrollView>
    </View>
  );
}
