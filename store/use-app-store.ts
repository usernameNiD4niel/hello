import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreferences, AuthState } from '@/types';
import { DEFAULT_LANGUAGE } from '@/constants/languages';

interface AppState {
  // Onboarding
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;

  // User preferences
  preferences: UserPreferences;
  setPreferences: (preferences: Partial<UserPreferences>) => void;

  // Authentication
  auth: AuthState;
  setAuth: (auth: Partial<AuthState>) => void;
  logout: () => void;

  // Current conversation
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;

  // Audio playback state
  isPlayingAudio: boolean;
  currentlyPlayingMessageId: string | null;
  setAudioPlayback: (isPlaying: boolean, messageId: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Onboarding state
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      // Initial preferences
      preferences: {
        defaultLanguage: DEFAULT_LANGUAGE,
        theme: 'dark', // Default to dark mode
        audioAutoplay: false,
        notificationsEnabled: true,
      },
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),

      // Initial auth state
      auth: {
        isAuthenticated: false,
      },
      setAuth: (newAuth) =>
        set((state) => ({
          auth: { ...state.auth, ...newAuth },
        })),
      logout: () =>
        set({
          auth: { isAuthenticated: false },
          currentConversationId: null,
        }),

      // Conversation state
      currentConversationId: null,
      setCurrentConversationId: (id) => set({ currentConversationId: id }),

      // Audio playback state
      isPlayingAudio: false,
      currentlyPlayingMessageId: null,
      setAudioPlayback: (isPlaying, messageId) =>
        set({
          isPlayingAudio: isPlaying,
          currentlyPlayingMessageId: messageId,
        }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        preferences: state.preferences,
        auth: state.auth,
      }),
    }
  )
);
