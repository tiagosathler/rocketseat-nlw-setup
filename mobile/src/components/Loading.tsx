import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09090A',
  },
});

export function Loading() {
  return (
    <View style={style.container}>
      <ActivityIndicator color="#7C3AED" />
    </View>
  );
}
