/* eslint-disable react-native/no-inline-styles */

import React from 'react';

import { View, ScrollView } from 'react-native';
import Header from '../components/Header';
import HabitDay from '../components/HabitDay';

import generateRangeFromYearBeginning from '../utils/generateRangeFromYearBeginning';
import HabitDayEmpty from '../components/HabitDayEmpty';
import WeekDayLabel from '../components/WeekDayLabel';

import { WEEK_DAYS_LABELS, MIN_SUMMARY_DATES_SIZES } from '../utils/constants';

export default function Home() {
  const daysFromYearsStart = generateRangeFromYearBeginning();

  const amountOfDaysToFill = MIN_SUMMARY_DATES_SIZES - daysFromYearsStart.length;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {WEEK_DAYS_LABELS.map((weekDay, i) => (
          <WeekDayLabel key={`week_day_label_${i}`} label={weekDay} />
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {daysFromYearsStart.map((_, i) => (
            <HabitDay key={`habit_day_${i}`} />
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
