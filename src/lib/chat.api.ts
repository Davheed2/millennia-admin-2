import { useQuery } from '@tanstack/react-query';
import { callApi } from './helpers/callApi';
import { ChatMessage, Conversation } from '@/interfaces';

// ========== GET CONVERSATIONS ==========
export const useGetConversations = () => {
	return useQuery<Conversation[], Error>({
		queryKey: ['chat', 'conversations'],
		queryFn: async () => {
			const { data, error } = await callApi<{ data: Conversation[] }>('/message/all-last-messages');
			if (error) {
				throw new Error(error.message || 'Failed to fetch conversations');
			}

			if (!data?.data) {
				throw new Error('No message data');
			}

			return data.data;
		},
	});
};

// ========== GET MESSAGES BY RECIPIENT ==========
export const useGetChatMessages = (recipientId: string) => {
	return useQuery<ChatMessage[], Error>({
		queryKey: ['chat', 'messages', recipientId],
		queryFn: async () => {
			const { data, error } = await callApi<{ data: ChatMessage[] }>(`/message/admin-user?userId=${recipientId}`);
			if (error) {
				throw new Error(error.message || 'Failed to fetch messages');
			}

			if (!data?.data) {
				throw new Error('No message data');
			}

			//console.log(data?.data);
			return data.data;
		},
	});
};

export const markMessageAsRead = async (messageId: number) => {
	const { data, error } = await callApi<{ data: ChatMessage[] }>(`/message/mark-as-read?messageId=${messageId}`);

	if (error) {
		throw new Error(error.message || 'Failed to mark message as read');
	}

	if (!data?.data) {
		throw new Error('No message data');
	}

	return data.data;
};

// ========== SEND MESSAGE ==========
// export const useSendMessage = () => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: async ({ recipientId, content }: { recipientId: string; content: string }) => {
// 			const { data, error } = await callApi<{ message: ChatMessage }>(`/chat/messages/${recipientId}`, {
// 				method: 'POST',
// 				body: { content },
// 			});

// 			if (error) {
// 				throw new Error(error.message || 'Failed to send message');
// 			}

// 			if (!data) {
// 				throw new Error('No message data');
// 			}

// 			return data.message;
// 		},
// 		onMutate: async ({ recipientId, content }) => {
// 			const optimisticMessage: ChatMessage = {
// 				id,
// 				senderId,
// 				recipientId,
// 				content,
// 				created_at: new Date(),
// 				updated_at: new Date(),
// 			};

// 			await queryClient.cancelQueries({ queryKey: ['chat', 'messages', recipientId] });

// 			const previousMessages = queryClient.getQueryData<ChatMessage[]>(['chat', 'messages', recipientId]) || [];

// 			queryClient.setQueryData<ChatMessage[]>(
// 				['chat', 'messages', recipientId],
// 				[...previousMessages, optimisticMessage]
// 			);

// 			return { previousMessages };
// 		},
// 		onError: (_error, { recipientId }, context) => {
// 			if (context?.previousMessages) {
// 				queryClient.setQueryData(['chat', 'messages', recipientId], context.previousMessages);
// 			}
// 		},
// 		onSuccess: (data, { recipientId }) => {
// 			queryClient.setQueryData<ChatMessage[]>(['chat', 'messages', recipientId], (old = []) => {
// 				return old.map((msg) => (msg.id === 0 ? data : msg));
// 			});

// 			queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] });
// 		},
// 	});
// };
