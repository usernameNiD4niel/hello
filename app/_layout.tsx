import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient } from '@/lib/query-client';
import { useAppStore } from '@/store/use-app-store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for navigation to be fully ready
    if (navigationState?.key) {
      setTimeout(() => setIsReady(true), 100);
    }
  }, [navigationState?.key]);

  useEffect(() => {
    // Don't do anything if navigation isn't ready
    if (!isReady) return;

    const inOnboarding = segments[0] === '(onboarding)';

    if (!hasCompletedOnboarding && !inOnboarding) {
      // User hasn't completed onboarding, redirect to welcome screen
      router.replace('/(onboarding)/welcome');
    } else if (hasCompletedOnboarding && inOnboarding) {
      // User has completed onboarding but is still in onboarding screens, redirect to home
      router.replace('/');
    }
  }, [hasCompletedOnboarding, segments, isReady]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(chat)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="new-chat" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
