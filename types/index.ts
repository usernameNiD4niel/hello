// Core data types for the chatbot application

export type MessageSender = 'user' | 'bot';

export type MessageStatus = 'sending' | 'sent' | 'error';

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  audioUrl?: string;
  sender: MessageSender;
  timestamp: Date;
  status?: MessageStatus;
  language: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  lastMessageTimestamp?: Date;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

// API Request/Response types
export interface SendMessageRequest {
  audio: File | Blob;
  language: string;
  conversationId: string;
}

export interface SendMessageResponse {
  messageId: string;
  text: string;
  audioUrl: string;
  timestamp: string;
}

export interface GetConversationsResponse {
  conversations: Array<{
    id: string;
    title: string;
    lastMessage: string;
    updatedAt: string;
    language: string;
  }>;
}

export interface GetMessagesResponse {
  messages: Array<{
    id: string;
    text: string;
    audioUrl?: string;
    sender: MessageSender;
    timestamp: string;
    language: string;
  }>;
}

export interface CreateConversationRequest {
  title?: string;
  language: string;
}

export interface CreateConversationResponse {
  conversationId: string;
  title: string;
  createdAt: string;
}

// Audio recording state
export interface AudioRecordingState {
  isRecording: boolean;
  duration: number;
  uri?: string;
}

// App state types
export interface UserPreferences {
  defaultLanguage: string;
  theme: 'light' | 'dark' | 'auto';
  audioAutoplay: boolean;
  notificationsEnabled: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  userId?: string;
  token?: string;
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}
