import { StyleSheet, Text, View, StatusBar } from 'react-native';

import {
  useFonts,
  Inter_400Regular as inter400Regular,
  Inter_600SemiBold as inter600SemiBold,
  Inter_700Bold as inter700Bold,
  Inter_800ExtraBold as inter800ExtraBold,
} from '@expo-google-fonts/inter';

import React from 'react';
import { Loading } from './src/components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontFamily: 'inter800ExtraBold',
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    inter400Regular,
    inter600SemiBold,
    inter700Bold,
    inter800ExtraBold,
  });

  if (!fontsLoaded) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.tsx to start working on your app!</Text>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </View>
  );
}
