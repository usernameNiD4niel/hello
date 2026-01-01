import { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Animated as RNAnimated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { GradientColors } from '@/constants/theme';

interface PushToTalkButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording?: boolean;
  recordingDuration?: number;
}

export function PushToTalkButton({
  onStartRecording,
  onStopRecording,
  isRecording = false,
  recordingDuration = 0,
}: PushToTalkButtonProps) {
  const textColor = useThemeColor({}, 'text');
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    if (isRecording) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      scale.value = withTiming(1);
    }

    return {
      transform: [{ scale: scale.value }],
    };
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {isRecording && (
        <View style={styles.recordingInfo}>
          <View style={styles.recordingDot} />
          <ThemedText style={{ color: textColor, fontSize: 16 }}>
            {formatDuration(recordingDuration)}
          </ThemedText>
        </View>
      )}

      <Animated.View style={animatedStyle}>
        <Pressable
          onPressIn={onStartRecording}
          onPressOut={onStopRecording}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={[GradientColors.pink, GradientColors.purple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <IconSymbol name="mic.fill" size={32} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </Animated.View>

      {!isRecording && (
        <ThemedText style={{ color: textColor, marginTop: 12, fontSize: 14 }}>
          Hold to record
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
  buttonWrapper: {
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
