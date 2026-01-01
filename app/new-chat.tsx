import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SUPPORTED_LANGUAGES } from '@/constants/languages';

export default function NewChatScreen() {
  const [title, setTitle] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const inputBg = useThemeColor({}, 'inputBackground');
  const cardBg = useThemeColor({}, 'cardBackground');

  const handleClose = () => {
    router.back();
  };

  const handleCreateChat = () => {
    // TODO: Create new conversation via API
    // For now, just navigate to a mock conversation
    router.replace('/(chat)/1');
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <IconSymbol name="xmark" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="title" style={{ color: textColor }}>
          New Conversation
        </ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={{ color: textColor, marginBottom: 12 }}>
            Conversation Title (Optional)
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
            placeholder="Enter a title..."
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={{ color: textColor, marginBottom: 12 }}>
            Select Language
          </ThemedText>
          <View style={styles.languageGrid}>
            {SUPPORTED_LANGUAGES.slice(0, 6).map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => setSelectedLanguage(lang.code)}
                style={[
                  styles.languageCard,
                  { backgroundColor: cardBg },
                  selectedLanguage === lang.code && styles.selectedLanguageCard,
                ]}
              >
                <ThemedText style={{ fontSize: 32, marginBottom: 4 }}>
                  {lang.flag}
                </ThemedText>
                <ThemedText style={{ color: textColor, fontSize: 12 }}>
                  {lang.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleCreateChat}
          style={styles.createButton}
        >
          <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
            Start Conversation
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 4,
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languageCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  selectedLanguageCard: {
    borderWidth: 2,
    borderColor: '#A855F7',
  },
  createButton: {
    backgroundColor: '#A855F7',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
});
