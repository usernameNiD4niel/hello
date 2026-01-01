import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { GradientColors } from '@/constants/theme';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/constants/languages';
import { useAppStore } from '@/store/use-app-store';

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);
  const setPreferences = useAppStore((state) => state.setPreferences);

  const handleContinue = () => {
    setPreferences({ defaultLanguage: selectedLanguage });
    router.push('/(onboarding)/permissions');
  };

  return (
    <LinearGradient
      colors={['#000000', '#1A0A1A', '#2A0A2A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Choose Your Language</ThemedText>
          <ThemedText style={styles.subtitle}>
            Select your preferred language for conversations
          </ThemedText>
        </View>

        <ScrollView
          style={styles.languageList}
          contentContainerStyle={styles.languageGrid}
          showsVerticalScrollIndicator={false}
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <TouchableOpacity
              key={language.code}
              onPress={() => setSelectedLanguage(language.code)}
              style={[
                styles.languageCard,
                selectedLanguage === language.code && styles.languageCardSelected,
              ]}
            >
              <ThemedText style={styles.languageFlag}>{language.flag}</ThemedText>
              <ThemedText style={styles.languageName}>{language.name}</ThemedText>
              <ThemedText style={styles.languageNative}>{language.nativeName}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={handleContinue}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={[GradientColors.pink, GradientColors.purple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  languageList: {
    flex: 1,
  },
  languageGrid: {
    gap: 12,
    paddingBottom: 16,
  },
  languageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageCardSelected: {
    borderColor: GradientColors.purple,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
  },
  languageFlag: {
    fontSize: 32,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  languageNative: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
