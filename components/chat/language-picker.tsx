import { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '@/constants/languages';

interface LanguagePickerProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

export function LanguagePicker({
  selectedLanguage,
  onLanguageChange,
}: LanguagePickerProps) {
  const [isVisible, setIsVisible] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({}, 'cardBackground');

  const selectedLang = getLanguageByCode(selectedLanguage);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.trigger}
      >
        <ThemedText style={{ fontSize: 20 }}>
          {selectedLang?.flag || '🌐'}
        </ThemedText>
        <IconSymbol name="chevron.down" size={16} color={textColor} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <ThemedView style={[styles.modal, { backgroundColor }]}>
              <View style={styles.modalHeader}>
                <ThemedText type="title" style={{ color: textColor }}>
                  Select Language
                </ThemedText>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <IconSymbol name="xmark" size={24} color={textColor} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={SUPPORTED_LANGUAGES}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onLanguageChange(item.code);
                      setIsVisible(false);
                    }}
                    style={[
                      styles.languageItem,
                      { backgroundColor: cardBackground },
                      selectedLanguage === item.code && styles.selectedItem,
                    ]}
                  >
                    <View style={styles.languageInfo}>
                      <ThemedText style={{ fontSize: 24, marginRight: 12 }}>
                        {item.flag}
                      </ThemedText>
                      <View>
                        <ThemedText
                          type="defaultSemiBold"
                          style={{ color: textColor }}
                        >
                          {item.name}
                        </ThemedText>
                        <ThemedText style={{ color: textColor, fontSize: 12 }}>
                          {item.nativeName}
                        </ThemedText>
                      </View>
                    </View>
                    {selectedLanguage === item.code && (
                      <IconSymbol name="checkmark" size={20} color="#A855F7" />
                    )}
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#A855F7',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 4,
  },
});
