/* eslint-disable react-native/no-inline-styles */

import React from 'react';

import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import HabitDay from '../components/HabitDay';
import HabitDayEmpty from '../components/HabitDayEmpty';
import WeekDayAbbreviation from '../components/WeekDayAbbreviation';

import { WEEK_DAYS_ABBR, MIN_SUMMARY_DATES_SIZES } from '../utils/constants';
import generateRangeFromYearBeginning from '../utils/generateRangeFromYearBeginning';

export default function Home() {
  const daysFromYearsStart = generateRangeFromYearBeginning();

  const amountOfDaysToFill = MIN_SUMMARY_DATES_SIZES - daysFromYearsStart.length;

  const { navigate } = useNavigation();

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
          {daysFromYearsStart.map((day, i) => (
            <HabitDay
              key={`habit_day_${i}`}
              onPress={() => navigate('habit', { date: day.toISOString() })}
            />
          ))}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <HabitDayEmpty key={`habit_day_empty_${i}`} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
