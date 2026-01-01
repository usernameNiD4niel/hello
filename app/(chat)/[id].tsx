import { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ChatBubble } from '@/components/chat/chat-bubble';
import { PushToTalkButton } from '@/components/chat/push-to-talk-button';
import { LanguagePicker } from '@/components/chat/language-picker';
import { useAudioRecording } from '@/hooks/use-audio-recording';
import { useSendMessage } from '@/hooks/use-conversations';
import { Message } from '@/types';

// Temporary mock data
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    conversationId: '1',
    text: 'Describe to me the basic principles of healthy eating. Briefly, but with all the important aspects, please, also you can tell me a little more about the topic of sports and training',
    sender: 'user',
    timestamp: new Date(Date.now() - 120000),
    language: 'en',
  },
  {
    id: '2',
    conversationId: '1',
    text: 'Basic principles of a healthy diet:\n\nBalance: Make sure your diet contains all the essential macro and micronutrients in the correct proportions: carbohydrates, proteins, fats, vitamins and minerals. It is important to maintain a balance of calories to meet your body\'s needs, but not to overeat.',
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000),
    language: 'en',
  },
  {
    id: '3',
    conversationId: '1',
    text: 'Tell me more about it, please',
    sender: 'user',
    timestamp: new Date(),
    language: 'en',
  },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');

  // Audio recording hook
  const { startRecording, stopRecording, isRecording, duration } = useAudioRecording();

  // API mutation hook
  const sendMessage = useSendMessage();

  const handleBack = () => {
    router.back();
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = async () => {
    const audioUri = await stopRecording();

    if (audioUri) {
      // TODO: Convert URI to Blob for API
      // For now, just add a placeholder message
      const newMessage: Message = {
        id: Date.now().toString(),
        conversationId: id,
        text: 'Recording sent... (waiting for backend)',
        sender: 'user',
        timestamp: new Date(),
        language: currentLanguage,
        status: 'sending',
      };

      setMessages((prev) => [...prev, newMessage]);

      // TODO: Uncomment when backend is ready
      // try {
      //   const response = await fetch(audioUri);
      //   const blob = await response.blob();
      //
      //   sendMessage.mutate({
      //     audio: blob,
      //     language: currentLanguage,
      //     conversationId: id,
      //   });
      // } catch (error) {
      //   console.error('Error sending message:', error);
      // }
    }
  };

  const handleCopyMessage = (text: string) => {
    // Use expo-clipboard instead of deprecated Clipboard
    // For now, just show alert
    Alert.alert('Copy', 'Text copied to clipboard');
  };

  const handleLikeMessage = () => {
    Alert.alert('Like', 'Message liked');
  };

  const handlePlayAudio = (audioUrl: string) => {
    // Audio will be played by AudioPlayer component
    console.log('Playing audio:', audioUrl);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={textColor} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <ThemedText type="defaultSemiBold" style={{ color: textColor }}>
              Text writer
            </ThemedText>
            <ThemedText style={{ color: textColor, fontSize: 12 }}>
              Healthy eating tips
            </ThemedText>
          </View>
          <LanguagePicker
            selectedLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              onCopy={() => handleCopyMessage(item.text)}
              onLike={handleLikeMessage}
              onPressAudio={item.audioUrl ? () => handlePlayAudio(item.audioUrl!) : undefined}
            />
          )}
          contentContainerStyle={styles.messagesList}
          inverted={false}
        />

        {/* Push-to-Talk Button */}
        <View style={[styles.inputContainer, { borderTopColor: borderColor }]}>
          <PushToTalkButton
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            isRecording={isRecording}
            recordingDuration={duration}
          />
        </View>
      </KeyboardAvoidingView>
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
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
});
