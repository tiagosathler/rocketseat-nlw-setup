import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import New from '../screens/New';
import Habit from '../screens/Habit';

export default function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />

      <Screen name="new" component={New} />

      <Screen name="habit" component={Habit} />
    </Navigator>
  );
}
