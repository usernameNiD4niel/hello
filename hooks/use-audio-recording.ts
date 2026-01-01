import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { AudioRecordingState } from '@/types';

export function useAudioRecording() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingState, setRecordingState] = useState<AudioRecordingState>({
    isRecording: false,
    duration: 0,
    uri: undefined,
  });
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync().catch(console.error);
      }
    };
  }, [recording]);

  const startRecording = async () => {
    try {
      // Request permissions if not granted
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission...');
        const permission = await requestPermission();
        if (!permission.granted) {
          console.error('Permission to access microphone denied');
          return;
        }
      }

      // Configure audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording...');
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        (status) => {
          // Update duration during recording
          if (status.isRecording) {
            setRecordingState((prev) => ({
              ...prev,
              duration: Math.floor(status.durationMillis / 1000),
            }));
          }
        }
      );

      setRecording(newRecording);
      setRecordingState({
        isRecording: true,
        duration: 0,
        uri: undefined,
      });

      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async (): Promise<string | undefined> => {
    if (!recording) {
      console.log('No active recording to stop');
      return undefined;
    }

    try {
      console.log('Stopping recording...');
      await recording.stopAndUnloadAsync();

      // Reset audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      console.log('Recording stopped, file location:', uri);

      setRecording(null);
      setRecordingState({
        isRecording: false,
        duration: 0,
        uri,
      });

      return uri;
    } catch (err) {
      console.error('Failed to stop recording', err);
      return undefined;
    }
  };

  const cancelRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      setRecording(null);
      setRecordingState({
        isRecording: false,
        duration: 0,
        uri: undefined,
      });

      console.log('Recording cancelled');
    } catch (err) {
      console.error('Failed to cancel recording', err);
    }
  };

  return {
    startRecording,
    stopRecording,
    cancelRecording,
    isRecording: recordingState.isRecording,
    duration: recordingState.duration,
    uri: recordingState.uri,
    hasPermission: permissionResponse?.granted ?? false,
  };
}
