# Expo Audio Migration Fix

## Issue Fixed
The app was crashing when entering chat screens because of incorrect expo-audio API usage.

## Changes Made

### 1. Fixed `hooks/use-audio-recording.ts`

**Import Changes:**
```typescript
// OLD (expo-av style):
import { AudioRecording, RecordingOptions, RecordingPresets } from 'expo-audio';

// NEW (correct expo-audio):
import { createRecording, RecordingPreset, useAudioRecorderPermissions } from 'expo-audio';
```

**Recording Creation:**
```typescript
// OLD:
const newRecording = new AudioRecording(RecordingPresets.HIGH_QUALITY);
await newRecording.prepareAsync();
await newRecording.startAsync();

// NEW:
const newRecording = await createRecording({
  ...RecordingPreset.HIGH_QUALITY,
});
await newRecording.record();
```

**Stop Recording:**
```typescript
// OLD:
const uri = await recording.stopAsync();

// NEW:
const uri = await recording.stop();
```

**Cleanup:**
```typescript
// OLD:
recording.stopAndUnloadAsync();

// NEW:
recording.stop();
```

### 2. Updated `components/chat/audio-player.tsx`

Now uses the new `useAudioPlayer` hook from expo-audio:
```typescript
const player = useAudioPlayer(audioUrl);

// Playing/pausing:
player.play();
player.pause();

// Seeking:
player.seekTo(0);

// State:
player.playing // boolean
player.currentTime // number (seconds)
player.duration // number (seconds)
```

### 3. Updated `app.json`

Changed plugin from expo-av to expo-audio:
```json
[
  "expo-audio",
  {
    "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone for voice messages."
  }
]
```

## API Differences: expo-av vs expo-audio

| expo-av (OLD) | expo-audio (NEW) |
|---------------|------------------|
| `Audio.Recording.createAsync()` | `createRecording()` |
| `recording.startAsync()` | `recording.record()` |
| `recording.stopAsync()` | `recording.stop()` |
| `recording.stopAndUnloadAsync()` | `recording.stop()` |
| `Audio.Sound.createAsync()` | `useAudioPlayer()` hook |
| `sound.playAsync()` | `player.play()` |
| `sound.pauseAsync()` | `player.pause()` |
| `sound.setPositionAsync()` | `player.seekTo()` |
| `RecordingOptionsPresets.HIGH_QUALITY` | `RecordingPreset.HIGH_QUALITY` |

## Testing

After these fixes, the app should:
- ✅ Load chat screens without errors
- ✅ Display conversation list
- ✅ Show chat messages
- ✅ Allow push-to-talk recording (on development build)
- ✅ Play audio messages (when backend provides audio URLs)

## Notes

- expo-audio is the modern replacement for expo-av
- expo-av was deprecated in SDK 53
- expo-audio uses simpler, more React-friendly hooks
- Recording still requires a development build (not Expo Go)

## Run the App

```bash
# Clear cache and restart
bun run start --clear

# For web (no audio recording)
bun run web

# For native with full features
npx expo prebuild
npx expo run:ios
# or
npx expo run:android
```
