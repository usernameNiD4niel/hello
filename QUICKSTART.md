# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

The `.env` file has been created with default settings:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**Important:** Update this URL when your backend is ready!

- **iOS Simulator:** Use `http://localhost:3000`
- **Android Emulator:** Use `http://10.0.2.2:3000`
- **Physical Device:** Use your computer's IP (e.g., `http://192.168.1.100:3000`)

### 3. Run the App

```bash
# Start development server
bun run start

# Or run directly on platform
bun run ios      # iOS Simulator
bun run android  # Android Emulator
bun run web      # Web browser
```

## ✅ What's Already Working

### Fully Functional Features

1. **Navigation**
   - ✅ Conversation list screen
   - ✅ Individual chat screens
   - ✅ New conversation modal
   - ✅ Language picker in chat header

2. **Audio Recording**
   - ✅ Push-to-talk button with animation
   - ✅ Recording permission handling
   - ✅ Duration tracking
   - ✅ Audio file creation

3. **UI Components**
   - ✅ ChatBubble with gradient (user) and dark (bot) styling
   - ✅ PushToTalkButton with pulsing animation
   - ✅ AudioPlayer with waveform (ready for backend audio)
   - ✅ LanguagePicker with 12 languages

4. **State Management**
   - ✅ Zustand store for global state
   - ✅ AsyncStorage persistence
   - ✅ React Query setup

## 🔧 Development Build Required

Since this app uses **expo-av** for audio recording, you'll need a development build (Expo Go won't work for recording).

### Option 1: Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build development build
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

### Option 2: Local Native Build

```bash
# Generate native folders
npx expo prebuild

# For iOS
cd ios && pod install && cd ..
npx expo run:ios

# For Android
npx expo run:android
```

## 📱 Testing the App

### Current Functionality

1. **Open the app** → You'll see the conversation list
2. **Tap "New Chat"** → Create a new conversation
3. **Select a language** → Choose from 12 supported languages
4. **Open a conversation** → View mock messages
5. **Hold the microphone button** → Start recording
6. **Release** → Stop recording (currently shows placeholder message)
7. **Tap language picker** → Change language mid-conversation

### Mock Data

The app currently uses mock data for:
- Conversation list
- Messages
- No real API calls yet

## 🔌 Connecting to Your Backend

When your backend is ready:

1. **Update the API URL** in `.env`:
   ```bash
   EXPO_PUBLIC_API_URL=https://your-backend-url.com
   ```

2. **Enable API calls** in `app/(chat)/[id].tsx`:

   Uncomment lines 94-106:
   ```typescript
   try {
     const response = await fetch(audioUri);
     const blob = await response.blob();

     sendMessage.mutate({
       audio: blob,
       language: currentLanguage,
       conversationId: id,
     });
   } catch (error) {
     console.error('Error sending message:', error);
   }
   ```

3. **Update token handling** in `lib/api/client.ts`:

   Uncomment lines 16-19 to add authentication:
   ```typescript
   const token = useAppStore.getState().auth.token;
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   ```

## 🎨 Customization

### Update App Name & Icons

Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

Replace icons in `assets/images/`:
- `icon.png` - App icon
- `splash-icon.png` - Splash screen
- `favicon.png` - Web favicon

### Update Theme Colors

Edit `constants/theme.ts`:
```typescript
export const GradientColors = {
  pink: '#E85D9A',      // Your primary color
  purple: '#A855F7',    // Your secondary color
  purpleDark: '#7C3AED',
};
```

### Add More Languages

Edit `constants/languages.ts`:
```typescript
export const SUPPORTED_LANGUAGES: Language[] = [
  // Add your language here
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭' },
  // ...
];
```

## 🐛 Troubleshooting

### "Cannot record audio"
- Make sure you're using a development build (not Expo Go)
- Check microphone permissions in device settings
- Restart the app after granting permissions

### "API calls not working"
- Verify the API URL in `.env`
- Check that your backend is running
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For physical devices, ensure you're on the same network

### "App crashes on start"
- Clear cache: `bun run start --clear`
- Reinstall dependencies: `rm -rf node_modules && bun install`
- Reset Metro bundler: `watchman watch-del-all` (if using watchman)

## 📚 Next Steps

1. **Backend Integration**
   - Implement authentication
   - Connect send message API
   - Handle audio upload/download

2. **Additional Features**
   - User profile/settings screen
   - Message search
   - Push notifications
   - Offline message queue

3. **Polish**
   - Loading states
   - Error handling
   - Haptic feedback
   - Animations refinement

## 📖 Documentation

- [CLAUDE.md](CLAUDE.md) - Architecture and patterns for AI assistants
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)

## 🎯 Key Files to Understand

```
app/(chat)/[id].tsx          # Main chat screen - start here!
hooks/use-audio-recording.ts # Audio recording logic
components/chat/             # All chat UI components
store/use-app-store.ts       # Global state management
lib/api/                     # API integration layer
```

Happy coding! 🚀
