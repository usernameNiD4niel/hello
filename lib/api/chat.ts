import { apiClient } from './client';
import {
  SendMessageRequest,
  SendMessageResponse,
  GetConversationsResponse,
  GetMessagesResponse,
  CreateConversationRequest,
  CreateConversationResponse,
} from '@/types';

export const chatApi = {
  // Send a message (audio + language)
  async sendMessage(data: {
    audio: Blob | File;
    language: string;
    conversationId: string;
  }): Promise<SendMessageResponse> {
    const formData = new FormData();
    formData.append('audio', data.audio);
    formData.append('language', data.language);
    formData.append('conversationId', data.conversationId);

    const response = await apiClient.post<SendMessageResponse>(
      '/api/chat/send',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Get all conversations
  async getConversations(): Promise<GetConversationsResponse> {
    const response = await apiClient.get<GetConversationsResponse>(
      '/api/conversations'
    );
    return response.data;
  },

  // Get messages for a conversation
  async getMessages(conversationId: string): Promise<GetMessagesResponse> {
    const response = await apiClient.get<GetMessagesResponse>(
      `/api/conversations/${conversationId}/messages`
    );
    return response.data;
  },

  // Create a new conversation
  async createConversation(
    data: CreateConversationRequest
  ): Promise<CreateConversationResponse> {
    const response = await apiClient.post<CreateConversationResponse>(
      '/api/conversations/new',
      data
    );
    return response.data;
  },

  // Delete a conversation
  async deleteConversation(conversationId: string): Promise<void> {
    await apiClient.delete(`/api/conversations/${conversationId}`);
  },
};
