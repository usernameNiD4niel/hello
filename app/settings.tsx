import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAppStore } from '@/store/use-app-store';
import { LANGUAGES } from '@/constants/languages';
import { GradientColors } from '@/constants/theme';

export default function SettingsScreen() {
  const preferences = useAppStore((state) => state.preferences);
  const setPreferences = useAppStore((state) => state.setPreferences);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'border');

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setPreferences({ theme });
  };

  const handleLanguageChange = (language: string) => {
    setPreferences({ defaultLanguage: language });
  };

  const toggleAutoplay = () => {
    setPreferences({ audioAutoplay: !preferences.audioAutoplay });
  };

  const toggleNotifications = () => {
    setPreferences({ notificationsEnabled: !preferences.notificationsEnabled });
  };

  const handleAbout = () => {
    Alert.alert(
      'VoiceChat',
      'Version 1.0.0\n\nA multilingual AI voice assistant powered by advanced language models.',
      [{ text: 'OK' }]
    );
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === preferences.defaultLanguage);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theme Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>

          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <ThemedText style={styles.cardTitle}>Theme</ThemedText>
            <View style={styles.themeOptions}>
              <ThemeOption
                label="Light"
                isSelected={preferences.theme === 'light'}
                onPress={() => handleThemeChange('light')}
              />
              <ThemeOption
                label="Dark"
                isSelected={preferences.theme === 'dark'}
                onPress={() => handleThemeChange('dark')}
              />
              <ThemeOption
                label="Auto"
                isSelected={preferences.theme === 'auto'}
                onPress={() => handleThemeChange('auto')}
              />
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Language</ThemedText>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: cardBackground, borderColor }]}
            onPress={() => {
              Alert.alert(
                'Select Language',
                'Choose your default language',
                LANGUAGES.map((lang) => ({
                  text: `${lang.flag} ${lang.name}`,
                  onPress: () => handleLanguageChange(lang.code),
                }))
              );
            }}
          >
            <View style={styles.settingRow}>
              <ThemedText style={styles.settingLabel}>Default Language</ThemedText>
              <View style={styles.settingValue}>
                <ThemedText style={styles.languageText}>
                  {currentLanguage?.flag} {currentLanguage?.name}
                </ThemedText>
                <IconSymbol name="chevron.right" size={20} color={textColor} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Audio Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Audio</ThemedText>

          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <View style={styles.settingRow}>
              <ThemedText style={styles.settingLabel}>Autoplay Responses</ThemedText>
              <Switch
                value={preferences.audioAutoplay}
                onValueChange={toggleAutoplay}
                trackColor={{ false: '#767577', true: GradientColors.purple }}
                thumbColor={preferences.audioAutoplay ? GradientColors.pink : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>

          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <View style={styles.settingRow}>
              <ThemedText style={styles.settingLabel}>Push Notifications</ThemedText>
              <Switch
                value={preferences.notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#767577', true: GradientColors.purple }}
                thumbColor={preferences.notificationsEnabled ? GradientColors.pink : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About</ThemedText>

          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <TouchableOpacity style={styles.settingRow} onPress={handleAbout}>
              <ThemedText style={styles.settingLabel}>App Version</ThemedText>
              <View style={styles.settingValue}>
                <ThemedText style={styles.versionText}>1.0.0</ThemedText>
                <IconSymbol name="chevron.right" size={20} color={textColor} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

function ThemeOption({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  const textColor = useThemeColor({}, 'text');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.themeOption, isSelected && styles.themeOptionSelected]}
    >
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
      <ThemedText style={[styles.themeOptionText, { color: textColor }]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.6,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  themeOptions: {
    gap: 12,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  themeOptionSelected: {
    opacity: 1,
  },
  themeOptionText: {
    fontSize: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: GradientColors.purple,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GradientColors.purple,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageText: {
    fontSize: 16,
  },
  versionText: {
    fontSize: 16,
    opacity: 0.6,
  },
});
