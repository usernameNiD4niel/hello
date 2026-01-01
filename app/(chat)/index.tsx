import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Temporary mock data
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    title: 'Healthy eating tips',
    lastMessage: 'Tell me more about it, please',
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Marketing in 2025',
    lastMessage: 'Tell me about this year\'s top 5 trends',
    updatedAt: new Date(Date.now() - 86400000),
  },
];

export default function ConversationListScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const dividerColor = useThemeColor({}, 'divider');

  const handleConversationPress = (id: string) => {
    router.push(`/(chat)/${id}`);
  };

  const handleNewChat = () => {
    router.push('/new-chat');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <ThemedText type="title" style={{ color: textColor }}>
          Conversations
        </ThemedText>
        <TouchableOpacity onPress={handleNewChat} style={styles.newChatButton}>
          <IconSymbol name="plus" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleConversationPress(item.id)}
            style={[styles.conversationItem, { backgroundColor: cardBackground }]}
          >
            <View style={styles.avatarContainer}>
              <IconSymbol name="sparkles" size={24} color={textColor} />
            </View>
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <ThemedText type="defaultSemiBold" style={{ color: textColor }}>
                  {item.title}
                </ThemedText>
                <ThemedText style={{ color: textSecondary, fontSize: 12 }}>
                  {formatTime(item.updatedAt)}
                </ThemedText>
              </View>
              <ThemedText
                style={{ color: textSecondary, fontSize: 14 }}
                numberOfLines={1}
              >
                {item.lastMessage}
              </ThemedText>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: dividerColor }]} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  newChatButton: {
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    marginVertical: 4,
  },
});
