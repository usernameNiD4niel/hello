import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { GradientColors } from '@/constants/theme';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/(onboarding)/language');
  };

  return (
    <LinearGradient
      colors={['#000000', '#1A0A1A', '#2A0A2A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Welcome to VoiceChat</ThemedText>
          <ThemedText style={styles.subtitle}>
            Your multilingual AI voice assistant
          </ThemedText>
        </View>

        <View style={styles.features}>
          <FeatureItem
            icon="🎤"
            text="Voice-powered conversations"
          />
          <FeatureItem
            icon="🌍"
            text="12 languages supported"
          />
          <FeatureItem
            icon="💬"
            text="Natural AI responses"
          />
          <FeatureItem
            icon="📱"
            text="Multiple conversation threads"
          />
        </View>

        <TouchableOpacity
          onPress={handleGetStarted}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={[GradientColors.pink, GradientColors.purple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <ThemedText style={styles.buttonText}>Get Started</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <ThemedText style={styles.featureIcon}>{icon}</ThemedText>
      <ThemedText style={styles.featureText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  features: {
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    fontSize: 32,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {
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
