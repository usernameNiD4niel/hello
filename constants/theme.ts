/**
 * Theme colors for the chatbot application.
 * Primary design: Dark mode with pink/purple gradient accents.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// Gradient colors for user messages and interactive elements
export const GradientColors = {
  pink: '#E85D9A',
  purple: '#A855F7',
  purpleDark: '#7C3AED',
};

export const Colors = {
  light: {
    // Base colors
    text: '#1A1A1A',
    textSecondary: '#666666',
    background: '#FFFFFF',
    backgroundElevated: '#F5F5F5',
    tint: '#E85D9A',
    icon: '#666666',
    tabIconDefault: '#666666',
    tabIconSelected: '#E85D9A',

    // Chat-specific colors
    userBubbleStart: '#E85D9A', // Gradient start (pink)
    userBubbleEnd: '#A855F7',   // Gradient end (purple)
    botBubble: '#F0F0F0',
    inputBackground: '#FFFFFF',
    border: '#E0E0E0',

    // Additional UI colors
    cardBackground: '#FFFFFF',
    divider: '#E0E0E0',
    error: '#DC2626',
    success: '#16A34A',
    warning: '#F59E0B',

    // Recording/Audio colors
    recordingActive: '#A855F7',
    waveform: '#E85D9A',
  },
  dark: {
    // Base colors
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    background: '#000000',
    backgroundElevated: '#1A1A1A',
    tint: tintColorDark,
    icon: '#A0A0A0',
    tabIconDefault: '#A0A0A0',
    tabIconSelected: tintColorDark,

    // Chat-specific colors
    userBubbleStart: '#E85D9A', // Gradient start (pink)
    userBubbleEnd: '#A855F7',   // Gradient end (purple)
    botBubble: '#2A2A2A',
    inputBackground: '#1A1A1A',
    border: '#3A3A3A',

    // Additional UI colors
    cardBackground: '#1F1F1F',
    divider: '#2A2A2A',
    error: '#FF4444',
    success: '#4CAF50',
    warning: '#FFC107',

    // Recording/Audio colors
    recordingActive: '#A855F7',
    waveform: '#E85D9A',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
