import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Message } from '@/types';
import { GradientColors } from '@/constants/theme';

interface ChatBubbleProps {
  message: Message;
  onPressAudio?: () => void;
  onCopy?: () => void;
  onLike?: () => void;
  onReply?: () => void;
}

export function ChatBubble({
  message,
  onPressAudio,
  onCopy,
  onLike,
  onReply,
}: ChatBubbleProps) {
  const botBubble = useThemeColor({}, 'botBubble');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const isUser = message.sender === 'user';

  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      {isUser ? (
        <LinearGradient
          colors={[GradientColors.pink, GradientColors.purple]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bubble}
        >
          <ThemedText style={{ color: '#FFFFFF' }}>{message.text}</ThemedText>
        </LinearGradient>
      ) : (
        <>
          <View style={[styles.bubble, { backgroundColor: botBubble }]}>
            <ThemedText style={{ color: textColor }}>{message.text}</ThemedText>
          </View>

          {/* Action buttons for bot messages */}
          <View style={styles.actions}>
            {onCopy && (
              <TouchableOpacity onPress={onCopy} style={styles.actionButton}>
                <IconSymbol name="doc.on.doc" size={16} color={iconColor} />
              </TouchableOpacity>
            )}
            {onLike && (
              <TouchableOpacity onPress={onLike} style={styles.actionButton}>
                <IconSymbol name="hand.thumbsup" size={16} color={iconColor} />
              </TouchableOpacity>
            )}
            {message.audioUrl && onPressAudio && (
              <TouchableOpacity onPress={onPressAudio} style={styles.actionButton}>
                <IconSymbol name="speaker.wave.2" size={16} color={iconColor} />
              </TouchableOpacity>
            )}
            {onReply && (
              <TouchableOpacity onPress={onReply} style={styles.actionButton}>
                <IconSymbol name="message" size={16} color={iconColor} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: 16,
    borderRadius: 20,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
});
