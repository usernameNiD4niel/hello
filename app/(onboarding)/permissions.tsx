import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import { ThemedText } from '@/components/themed-text';
import { GradientColors } from '@/constants/theme';
import { useAppStore } from '@/store/use-app-store';

export default function PermissionsScreen() {
  const [isRequesting, setIsRequesting] = useState(false);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const handleAllowPermission = async () => {
    setIsRequesting(true);
    try {
      const { status } = await Audio.requestPermissionsAsync();

      if (status === 'granted') {
        completeOnboarding();
        router.replace('/');
      } else {
        Alert.alert(
          'Permission Denied',
          'Microphone access is required for voice messages. You can enable it later in Settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Try Again',
              onPress: handleAllowPermission,
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Failed to request microphone permission. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace('/');
  };

  return (
    <LinearGradient
      colors={['#000000', '#1A0A1A', '#2A0A2A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ThemedText style={styles.icon}>🎤</ThemedText>
          </View>
          <ThemedText style={styles.title}>Microphone Access</ThemedText>
          <ThemedText style={styles.subtitle}>
            We need access to your microphone to enable voice conversations with the AI assistant
          </ThemedText>
        </View>

        <View style={styles.features}>
          <PermissionFeature
            icon="✅"
            text="Record voice messages"
          />
          <PermissionFeature
            icon="🔒"
            text="Your audio stays private and secure"
          />
          <PermissionFeature
            icon="🎯"
            text="Better accuracy with voice input"
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={handleAllowPermission}
            disabled={isRequesting}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={[GradientColors.pink, GradientColors.purple]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <ThemedText style={styles.buttonText}>
                {isRequesting ? 'Requesting...' : 'Allow Microphone'}
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSkip}
            disabled={isRequesting}
            style={styles.skipButton}
          >
            <ThemedText style={styles.skipButtonText}>Skip for Now</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

function PermissionFeature({ icon, text }: { icon: string; text: string }) {
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
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 15,
    color: '#FFFFFF',
    flex: 1,
  },
  buttons: {
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 12,
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
  skipButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
});
