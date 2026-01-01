import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@/lib/api/chat';
import { CreateConversationRequest } from '@/types';

export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: chatApi.getConversations,
  });
};

export const useMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => chatApi.getMessages(conversationId),
    enabled: !!conversationId,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConversationRequest) =>
      chatApi.createConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.sendMessage,
    onSuccess: (data, variables) => {
      // Invalidate messages query for this conversation
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.conversationId],
      });
      // Invalidate conversations to update last message
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
