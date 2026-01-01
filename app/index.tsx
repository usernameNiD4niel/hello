import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SearchBar } from '@/components/home/search-bar';
import { CategoryCard } from '@/components/home/category-card';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useConversations } from '@/hooks/use-conversations';
import { GradientColors } from '@/constants/theme';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: conversations = [] } = useConversations();

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  const handleCategoryPress = (category: string) => {
    router.push('/new-chat');
  };

  const handleConversationPress = (id: string) => {
    router.push(`/(chat)/${id}`);
  };

  const handleViewAllConversations = () => {
    router.push('/(chat)');
  };

  const recentConversations = conversations.slice(0, 3);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor }]}>
        <View>
          <ThemedText style={styles.greeting}>Hello!</ThemedText>
          <ThemedText style={styles.subtitle}>How can I help you today?</ThemedText>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <IconSymbol name="gearshape.fill" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.section}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search conversations..."
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>What would you like to do?</ThemedText>

          <CategoryCard
            icon="✍️"
            title="AI Text Writer"
            description="Generate text, translate, or write creatively"
            gradientColors={[GradientColors.pink, GradientColors.purple]}
            onPress={() => handleCategoryPress('text')}
          />

          <CategoryCard
            icon="🎨"
            title="AI Image Generator"
            description="Create and edit images with AI"
            gradientColors={['#F59E0B', '#F97316']}
            onPress={() => handleCategoryPress('image')}
          />

          <CategoryCard
            icon="💻"
            title="AI Code Helper"
            description="Write, debug, and explain code"
            gradientColors={['#3B82F6', '#8B5CF6']}
            onPress={() => handleCategoryPress('code')}
          />

          <CategoryCard
            icon="🎤"
            title="Voice Chat"
            description="Have a natural conversation with AI"
            gradientColors={[GradientColors.purple, GradientColors.purpleDark]}
            onPress={() => handleCategoryPress('voice')}
          />
        </View>

        {/* Recent Conversations */}
        {recentConversations.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Recent Conversations</ThemedText>
              <TouchableOpacity onPress={handleViewAllConversations}>
                <ThemedText style={styles.viewAllText}>View All</ThemedText>
              </TouchableOpacity>
            </View>

            {recentConversations.map((conversation) => (
              <TouchableOpacity
                key={conversation.id}
                onPress={() => handleConversationPress(conversation.id)}
                style={styles.conversationItem}
              >
                <View style={styles.conversationIcon}>
                  <ThemedText style={styles.conversationEmoji}>💬</ThemedText>
                </View>
                <View style={styles.conversationContent}>
                  <ThemedText style={styles.conversationTitle} numberOfLines={1}>
                    {conversation.title}
                  </ThemedText>
                  <ThemedText style={styles.conversationPreview} numberOfLines={1}>
                    {conversation.language} • {new Date(conversation.updatedAt).toLocaleDateString()}
                  </ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={20} color={textColor} style={{ opacity: 0.4 }} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/new-chat')}
        activeOpacity={0.8}
      >
        <View style={styles.fabGradient}>
          <IconSymbol name="plus" size={28} color="#FFFFFF" />
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: GradientColors.purple,
    fontWeight: '600',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  conversationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationEmoji: {
    fontSize: 24,
  },
  conversationContent: {
    flex: 1,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  conversationPreview: {
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
    backgroundColor: GradientColors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
