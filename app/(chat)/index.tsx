import { View, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { GradientColors } from '@/constants/theme';

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
  const borderColor = useThemeColor({}, 'border');

  const handleConversationPress = (id: string) => {
    router.push(`/(chat)/${id}`);
  };

  const handleNewChat = () => {
    router.push('/new-chat');
  };

  const handleDeleteConversation = (id: string, title: string) => {
    Alert.alert(
      'Delete Conversation',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete functionality
            console.log('Delete conversation:', id);
          },
        },
      ]
    );
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
        <View>
          <ThemedText style={styles.headerTitle}>Conversations</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            {MOCK_CONVERSATIONS.length} active {MOCK_CONVERSATIONS.length === 1 ? 'chat' : 'chats'}
          </ThemedText>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsButton}>
          <IconSymbol name="gearshape.fill" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.conversationCard, { backgroundColor: cardBackground, borderColor }]}>
            <TouchableOpacity
              onPress={() => handleConversationPress(item.id)}
              style={styles.conversationTouchable}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={[GradientColors.pink, GradientColors.purple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarContainer}
              >
                <ThemedText style={styles.avatarEmoji}>💬</ThemedText>
              </LinearGradient>

              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <ThemedText style={styles.conversationTitle} numberOfLines={1}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={styles.conversationTime}>
                    {formatTime(item.updatedAt)}
                  </ThemedText>
                </View>
                <ThemedText style={styles.conversationPreview} numberOfLines={2}>
                  {item.lastMessage}
                </ThemedText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDeleteConversation(item.id, item.title)}
              style={styles.deleteButton}
            >
              <IconSymbol name="trash" size={20} color="#FF4444" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyEmoji}>💬</ThemedText>
            <ThemedText style={styles.emptyTitle}>No conversations yet</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Start a new chat to begin
            </ThemedText>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleNewChat}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[GradientColors.pink, GradientColors.purple]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <IconSymbol name="plus" size={28} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  settingsButton: {
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  conversationTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  conversationTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  conversationTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  conversationPreview: {
    fontSize: 14,
    opacity: 0.6,
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
