import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { GradientColors } from '@/constants/theme';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  gradientColors?: string[];
  onPress: () => void;
}

export function CategoryCard({
  title,
  description,
  icon,
  gradientColors = [GradientColors.pink, GradientColors.purple],
  onPress,
}: CategoryCardProps) {
  const cardBackground = useThemeColor({}, 'cardBackground');

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <ThemedText style={styles.icon}>{icon}</ThemedText>
        </LinearGradient>

        <View style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.description}>{description}</ThemedText>
        </View>

        <View style={styles.arrow}>
          <ThemedText style={styles.arrowText}>→</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.6,
  },
  arrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 20,
    opacity: 0.4,
  },
});
