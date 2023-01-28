/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import './src/lib/dayjs';
import { getScheduleNotification, scheduleNotification } from './src/lib/notifications';

import {
  useFonts,
  Inter_400Regular as inter400Regular,
  Inter_600SemiBold as inter600SemiBold,
  Inter_700Bold as inter700Bold,
  Inter_800ExtraBold as inter800ExtraBold,
} from '@expo-google-fonts/inter';

import { StatusBar, Button } from 'react-native';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    inter400Regular,
    inter600SemiBold,
    inter700Bold,
    inter800ExtraBold,
  });

  if (!fontsLoaded) return <Loading />;

  return (
    <>
      <Routes />
      <Button title="Enviar notificação" onPress={scheduleNotification} />
      <Button title="Buscar notificações" onPress={getScheduleNotification} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}
