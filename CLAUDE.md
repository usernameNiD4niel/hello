# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **multilingual voice chatbot application** built with Expo/React Native. The app allows users to:
- Record audio messages using push-to-talk interaction
- Receive responses as both text and audio (translated based on user's language preference)
- Manage multiple conversation threads
- Switch languages mid-conversation
- Sync chat history with backend (separate codebase)

**Key Features:**
- Voice input with push-to-talk UI (hold to record, release to send)
- Text-to-speech audio playback for responses
- Multi-language support with in-chat language picker
- Multiple conversation threads (like WhatsApp/Telegram)
- Backend-synced chat history
- Dark mode UI design (reference: modern messaging apps)

## Package Manager

**This project uses Bun** as the package manager. Use `bun` commands instead of `npm`:

```bash
bun install           # Install dependencies
bun run start         # Start Expo dev server
bun run android       # Run on Android emulator
bun run ios           # Run on iOS simulator
bun run web           # Run in web browser
bun run lint          # Run ESLint
bun run reset-project # Reset to blank template
```

**Note:** Testing is not yet configured in package.json.

## Architecture Overview

### Application Architecture

**Frontend-Backend Separation:**
- This repository contains the **mobile frontend only**
- Backend API (separate codebase) handles:
  - Speech-to-text conversion (audio → text)
  - LLM processing for chatbot responses
  - Text-to-speech synthesis (text → audio)
  - Language translation
  - Chat history persistence and sync

**Data Flow:**
1. User records audio (push-to-talk) → Frontend captures audio file
2. Frontend sends audio + user language preference → Backend API
3. Backend processes: Speech-to-text → LLM → Text-to-speech + Translation
4. Backend returns: text response + audio URL (both in user's language)
5. Frontend displays text in chat bubble + plays audio response

### File-Based Routing (expo-router)

**Current Structure (Starter Template):**
This project uses expo-router v6 for declarative, file-system-based routing:

- **`app/_layout.tsx`**: Root layout with ThemeProvider and Stack Navigator
- **`app/(tabs)/_layout.tsx`**: Tab navigator (Home, Explore) - **to be replaced**
- **`app/(tabs)/index.tsx`**: Home screen - **to be replaced**
- **`app/(tabs)/explore.tsx`**: Explore/info screen - **to be replaced**
- **`app/modal.tsx`**: Modal example - **to be replaced**

**Target Structure (Chatbot App):**
Will be refactored to:
- `app/_layout.tsx`: Root layout with auth/theme providers
- `app/(chat)/`: Chat route group
  - `index.tsx`: Conversation list screen (all chat threads)
  - `[id].tsx`: Individual chat conversation screen
  - `_layout.tsx`: Chat stack navigator
- `app/(settings)/`: Settings route group
  - `index.tsx`: App settings (language preference, theme, etc.)
- `app/new-chat.tsx`: New conversation modal/screen

**Key routing concepts:**
- Folders in parentheses like `(chat)` are route groups (don't appear in URL)
- `_layout.tsx` files define nested navigation structures
- `[id].tsx` creates dynamic routes (e.g., /chat/123)
- Typed routes experiment enabled in app.json for type-safe navigation

### Theme System Architecture

The theming system is built around automatic light/dark mode with these key pieces:

**1. Theme Detection:**
- `hooks/use-color-scheme.ts` (native): Re-exports React Native's useColorScheme
- `hooks/use-color-scheme.web.ts` (web): Adds hydration logic to prevent SSR mismatches
- Platform-specific files (.web.ts) automatically override base implementations

**2. Theme Constants:**
- `constants/theme.ts`: Defines Colors (light/dark palettes) and Fonts (platform-specific)
- Colors include: text, background, tint (accent), icon, tab icon states
- Fonts use Platform.select() for iOS, Android, and web-specific font stacks

**3. Theme Application:**
- `hooks/use-theme-color.ts`: Hook that resolves theme colors with override support
- Root layout applies React Navigation's DarkTheme/DefaultTheme based on color scheme
- All UI components use themed wrappers for consistency

**4. Themed Components:**
- `components/themed-text.tsx` and `components/themed-view.tsx`: Accept `lightColor`/`darkColor` props
- These components use useThemeColor internally to resolve final colors
- ThemedText supports type variants: 'default', 'title', 'defaultSemiBold', 'subtitle', 'link'

### Component Architecture Patterns

**Platform-Specific Implementations:**
Components can have platform variants using file extensions:
- `components/ui/icon-symbol.ios.tsx`: Uses expo-symbols (SF Symbols) on iOS
- `components/ui/icon-symbol.tsx`: Fallback using @expo/vector-icons Material Icons
- Metro bundler automatically selects the correct file per platform

**Reusable Component Categories:**

1. **Basic Themed Wrappers** (`themed-text.tsx`, `themed-view.tsx`):
   - Compose native RN components with theme support
   - Accept color override props for flexibility

2. **Animated Components** (`parallax-scroll-view.tsx`, `hello-wave.tsx`):
   - Use react-native-reanimated for smooth 60fps animations
   - ParallaxScrollView implements header parallax with scroll interpolation
   - Animation worklets run on UI thread for performance

3. **Enhanced Interactions** (`haptic-tab.tsx`, `external-link.tsx`):
   - HapticTab: Adds iOS haptic feedback to tab presses (uses expo-haptics)
   - ExternalLink: Opens links in in-app browser on native, new tab on web
   - Platform detection via EXPO_OS environment variable

4. **UI Components** (`ui/collapsible.tsx`):
   - Accordion/expandable section with animated chevron
   - Local state management with useState (no global state in this project)

### Key Directories

- **`app/`**: File-based routing structure; add new screens here as .tsx files
- **`components/`**: Reusable UI components; prefer themed wrappers for consistency
- **`hooks/`**: Custom React hooks; platform variants use file extensions
- **`constants/`**: Theme definitions (Colors, Fonts); modify for design system changes
- **`assets/images/`**: Static images; referenced via require() in components
- **`scripts/`**: Node.js build scripts (e.g., reset-project.js)

### Configuration Files

- **`app.json`**: Expo configuration (app metadata, plugins, experiments)
  - `newArchEnabled: true` - React Native New Architecture enabled
  - `experiments.typedRoutes: true` - Type-safe routing
  - `experiments.reactCompiler: true` - React Compiler optimization

- **`tsconfig.json`**:
  - Path alias: `@/*` maps to repository root
  - Extends expo/tsconfig.base with strict mode

- **`eslint.config.js`**: Uses Expo's flat config format (ESLint 9+)

### Development Workflow

1. **Adding a new screen**: Create a .tsx file in `app/` (e.g., `app/settings.tsx` → /settings route)
2. **Creating themed components**: Use ThemedText/ThemedView as base, wrap with useThemeColor for custom colors
3. **Platform-specific code**: Create .ios.tsx or .web.ts variants, or use Platform.select()
4. **Navigation**: Import from 'expo-router' and use `router.push()`, `router.back()`, or `<Link>` component
5. **Icons**: Use IconSymbol component which automatically selects SF Symbols (iOS) or Material Icons (Android/Web)

### State Management (To Be Implemented)

**Current:** Local component state only (useState/useReducer)

**Planned for Chatbot:**
- **Global state needed** for:
  - User authentication state
  - Current language preference
  - Active conversation threads
  - Message cache/offline support
  - Audio playback state

**Recommended approach:**
- Use **Zustand** or **React Context + useReducer** for lightweight state management
- Consider **TanStack Query (React Query)** for server state (chat history, messages)
- Use **AsyncStorage** for persisting user preferences locally

### Audio Handling Architecture

**Audio Recording (expo-av or expo-audio):**
- Push-to-talk interaction pattern
- Record in formats compatible with backend (e.g., AAC, MP3, WAV)
- Show visual feedback during recording (waveform animation)
- Handle permissions (microphone access)

**Audio Playback:**
- Play backend-generated TTS audio responses
- Queue multiple audio messages
- Show playback progress indicator
- Support pause/resume controls
- Handle interruptions (phone calls, notifications)

**Key considerations:**
- Audio files may be large; implement upload/download progress indicators
- Cache played audio for replay without re-downloading
- Handle background audio if user switches apps during playback

### Backend API Integration (To Be Implemented)

**Expected API Endpoints:**
```typescript
POST /api/chat/send
  Body: { audio: File, language: string, conversationId: string }
  Response: { messageId: string, text: string, audioUrl: string }

GET /api/conversations
  Response: { conversations: Array<{ id, title, lastMessage, updatedAt }> }

GET /api/conversations/:id/messages
  Response: { messages: Array<{ id, text, audioUrl, sender, timestamp }> }

POST /api/conversations/new
  Response: { conversationId: string }
```

**Implementation notes:**
- Use **fetch** or **axios** for HTTP requests
- Implement retry logic for failed requests
- Handle offline mode gracefully (queue messages, sync when online)
- Use **FormData** for audio file uploads
- Implement request/response interceptors for auth headers

### UI/UX Design Requirements

**Based on reference design:**
- Dark mode as primary theme (matching reference screenshots)
- Chat bubbles: User messages (gradient pink/purple), Bot messages (dark gray)
- Push-to-talk button: Large circular button at bottom center (pink/purple gradient)
- Recording state: Visual feedback (pulsing animation, timer)
- Audio playback: Waveform visualization or animated dots
- Conversation list: Thread title, last message preview, timestamp
- In-chat language picker: Compact selector in header/toolbar
- Message actions: Copy text, replay audio, like/dislike feedback icons

**Component structure to build:**
- `ChatBubble` component (user vs bot styling)
- `PushToTalkButton` component (recording state handling)
- `AudioPlayer` component (playback controls, waveform)
- `ConversationListItem` component
- `LanguagePicker` component (dropdown or modal selector)
- `ChatHeader` component (conversation title, language, settings)

### Important Notes

- **State management**: Will need global state for auth, language, conversations (Zustand recommended)
- **Animation performance**: Use react-native-reanimated's worklets for smooth animations; avoid Animated API
- **Type safety**: TypeScript strict mode is enabled; define types for API responses and app state
- **Audio permissions**: Handle microphone permissions gracefully with clear prompts
- **Offline support**: Implement message queueing and sync when connection restored
- **Cross-platform**: Test audio recording/playback on iOS, Android, and web (web may have limitations)
- **Expo Go limitations**: Audio recording requires development build; expo-av needs native compilation
- **Accessibility**: Add labels for screen readers, support voice-over navigation
