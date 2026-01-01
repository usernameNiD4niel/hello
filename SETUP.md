# Chatbot App Setup Guide

## What We've Built

A multilingual voice chatbot mobile application with the following features:

### ✅ Completed Features

1. **Project Setup**
   - Installed all required dependencies (expo-av, zustand, react-query, axios, etc.)
   - Configured Bun as package manager
   - Set up TypeScript types for the entire application

2. **Routing Structure**
   - File-based routing with expo-router
   - Conversation list screen (`/(chat)/index.tsx`)
   - Individual chat screen (`/(chat)/[id].tsx`)
   - New conversation modal (`/new-chat.tsx`)
   - Removed starter template code

3. **Theme System**
   - Dark mode design with pink/purple gradients
   - Updated color palette to match reference design
   - Gradient colors for user messages
   - Dark backgrounds for bot messages

4. **UI Components**
   - ✅ `ChatBubble` - Message bubbles with gradient for user, dark for bot
   - ✅ `PushToTalkButton` - Animated recording button with pulse effect
   - ✅ `AudioPlayer` - Audio playback with waveform visualization
   - ✅ `LanguagePicker` - Multi-language selector with flags

5. **State Management**
   - ✅ Zustand store for global state (preferences, auth, audio playback)
   - ✅ AsyncStorage persistence for user settings
   - ✅ React Query setup for server state management

6. **API Integration Layer**
   - ✅ Axios client with interceptors
   - ✅ API service functions (sendMessage, getConversations, etc.)
   - ✅ React Query hooks (useConversations, useSendMessage, etc.)

## Next Steps

### 1. Environment Setup

Create a `.env` file in the root directory:

\`\`\`bash
EXPO_PUBLIC_API_URL=http://your-backend-url.com
\`\`\`

### 2. Audio Recording Implementation

The `PushToTalkButton` component is ready, but you need to implement the actual recording logic:

\`\`\`typescript
// In your chat screen, add:
import { Audio } from 'expo-av';

const [recording, setRecording] = useState<Audio.Recording | null>(null);

const startRecording = async () => {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  } catch (err) {
    console.error('Failed to start recording', err);
  }
};

const stopRecording = async () => {
  if (!recording) return;

  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  setRecording(null);

  // Send to backend
  // const blob = await fetch(uri).then(r => r.blob());
  // sendMessage.mutate({ audio: blob, ... });
};
\`\`\`

### 3. Connect to Backend API

Update the API client in `lib/api/client.ts`:
- Set your backend URL
- Implement token management in interceptors
- Handle authentication flow

### 4. Implement Real Data

Replace mock data in screens with React Query hooks:

\`\`\`typescript
// In (chat)/index.tsx
import { useConversations } from '@/hooks/use-conversations';

const { data, isLoading } = useConversations();
\`\`\`

### 5. Add Missing Screens

- Settings screen for user preferences
- Authentication screens (login/signup)
- Onboarding flow

### 6. Audio Permissions

Add to `app.json`:

\`\`\`json
{
  "expo": {
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone for voice messages."
        }
      ]
    ]
  }
}
\`\`\`

### 7. Build Development Build

Since expo-av requires native modules, you'll need a development build:

\`\`\`bash
bun run ios
# or
bun run android
\`\`\`

For development builds:
\`\`\`bash
npx expo prebuild
# Then build with Xcode (iOS) or Android Studio (Android)
\`\`\`

## Project Structure

\`\`\`
hello/
├── app/                          # Routing
│   ├── (chat)/
│   │   ├── index.tsx            # Conversation list
│   │   ├── [id].tsx             # Chat screen
│   │   └── _layout.tsx
│   ├── _layout.tsx              # Root layout with providers
│   └── new-chat.tsx             # New conversation modal
│
├── components/
│   ├── chat/                    # Chat-specific components
│   │   ├── chat-bubble.tsx
│   │   ├── push-to-talk-button.tsx
│   │   ├── audio-player.tsx
│   │   └── language-picker.tsx
│   ├── themed-text.tsx
│   └── themed-view.tsx
│
├── constants/
│   ├── theme.ts                 # Colors and fonts
│   └── languages.ts             # Supported languages
│
├── hooks/
│   ├── use-conversations.ts     # React Query hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
│
├── lib/
│   ├── api/
│   │   ├── client.ts           # Axios client
│   │   └── chat.ts             # Chat API functions
│   └── query-client.tsx        # React Query client
│
├── store/
│   └── use-app-store.ts        # Zustand global state
│
└── types/
    └── index.ts                # TypeScript types

\`\`\`

## Running the App

\`\`\`bash
# Install dependencies
bun install

# Start development server
bun run start

# Run on specific platform
bun run ios
bun run android
bun run web
\`\`\`

## Key Technologies

- **Expo ~54.0** - React Native framework
- **expo-router ~6.0** - File-based routing
- **Zustand** - Global state management
- **TanStack Query** - Server state management
- **expo-av** - Audio recording and playback
- **axios** - HTTP client
- **react-native-reanimated** - Animations
- **expo-linear-gradient** - Gradient effects

## Notes

- The app is designed for dark mode primarily
- Push-to-talk is the main interaction pattern
- Language can be changed mid-conversation
- All chat history will sync with backend
- Audio files are cached for offline replay
