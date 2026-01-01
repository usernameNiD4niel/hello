import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ audioUrl, autoPlay = false }: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const textColor = useThemeColor({}, 'text');
  const waveformColor = useThemeColor({}, 'waveform');

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]);

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: autoPlay },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
      }
    }
  };

  const togglePlayback = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      if (position >= duration) {
        await sound.setPositionAsync(0);
      }
      await sound.playAsync();
    }
  };

  const formatTime = (millis: number) => {
    const seconds = Math.floor(millis / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? position / duration : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
        <IconSymbol
          name={isPlaying ? 'pause.fill' : 'play.fill'}
          size={20}
          color={textColor}
        />
      </TouchableOpacity>

      <View style={styles.waveformContainer}>
        {/* Simple waveform visualization */}
        <View style={styles.waveform}>
          {Array.from({ length: 20 }).map((_, i) => {
            const height = Math.random() * 100;
            const isActive = i / 20 < progress;
            return (
              <View
                key={i}
                style={[
                  styles.waveformBar,
                  {
                    height: `${height}%`,
                    backgroundColor: isActive ? waveformColor : '#444',
                  },
                ]}
              />
            );
          })}
        </View>
        <ThemedText style={{ color: textColor, fontSize: 12, marginTop: 4 }}>
          {formatTime(position)} / {formatTime(duration)}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformContainer: {
    flex: 1,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 40,
  },
  waveformBar: {
    flex: 1,
    borderRadius: 2,
    minHeight: 4,
  },
});
