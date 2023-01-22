import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  progress?: number;
}

export default function ProgressBar({ progress = 0 }: Props) {
  const sharedProgress = useSharedValue<number>(progress);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${sharedProgress.value}%`,
  }));

  useEffect(() => {
    sharedProgress.value = withDelay(100, withTiming(progress));
  }, [progress, sharedProgress]);

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View className="h-3 rounded-xl bg-violet-600" style={animatedStyle} />
    </View>
  );
}
