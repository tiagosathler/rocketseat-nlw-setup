/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-native/no-inline-styles */

import React, { useCallback, useEffect, useState } from 'react';

import { View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import HabitDay from '../components/HabitDay';
import HabitDayEmpty from '../components/HabitDayEmpty';
import WeekDayAbbreviation from '../components/WeekDayAbbreviation';

import { WEEK_DAYS_ABBR, MIN_SUMMARY_DATES_SIZES } from '../utils/constants';
import generateRangeFromYearBeginning from '../utils/generateRangeFromYearBeginning';
import api from '../lib/axios';
import { Loading } from '../components/Loading';
import dayjs from 'dayjs';

type SummaryElement = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

type SummaryArray = Array<SummaryElement>;

export default function Home() {
  const daysFromYearsStart = generateRangeFromYearBeginning();

  const amountOfDaysToFill = MIN_SUMMARY_DATES_SIZES - daysFromYearsStart.length;

  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryArray>([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/summary');
      const data = response.data as SummaryArray;
      setSummary(data);
    } catch (error) {
      Alert.alert('Não foi possível carregar o sumário de hábitos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {WEEK_DAYS_ABBR.map((weekDay, i) => (
          <WeekDayAbbreviation key={`week_day_abbr_${i}`} abbreviation={weekDay} />
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {daysFromYearsStart.map((day, i) => {
            const dayWithHabits = summary.find(({ date }) => dayjs(day).isSame(date));

            return (
              <HabitDay
                key={`habit_day_${i}`}
                date={day}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                onPress={() => navigate('habit', { date: day.toISOString() })}
              />
            );
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <HabitDayEmpty key={`habit_day_empty_${i}`} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
