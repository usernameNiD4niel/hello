import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ audioUrl, autoPlay = false }: AudioPlayerProps) {
  const player = useAudioPlayer(audioUrl);
  const [duration, setDuration] = useState(0);

  const textColor = useThemeColor({}, 'text');
  const waveformColor = useThemeColor({}, 'waveform');

  useEffect(() => {
    if (player && autoPlay) {
      player.play();
    }
  }, [player, autoPlay]);

  useEffect(() => {
    if (player?.duration) {
      setDuration(player.duration);
    }
  }, [player?.duration]);

  const togglePlayback = async () => {
    if (!player) return;

    if (player.playing) {
      player.pause();
    } else {
      if (player.currentTime >= duration) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (player?.currentTime || 0) / duration : 0;
  const position = player?.currentTime || 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
        <IconSymbol
          name={player?.playing ? 'pause.fill' : 'play.fill'}
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
