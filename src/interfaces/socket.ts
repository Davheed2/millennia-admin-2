export enum SocketEvents {
	CONNECT = 'connect',
	DISCONNECT = 'disconnect',

	AUTH_ERROR = 'auth_error',

	USER_ONLINE = 'user_online',
	USER_OFFLINE = 'user_offline',
	USER_TYPING = 'user_typing',
	USER_STOP_TYPING = 'user_stop_typing',

	SEND_MESSAGE = 'send_message',
	MESSAGE_RECEIVED = 'message_received',
	MESSAGE_READ = 'message_read',
}

export interface Message {
	id: number;
	senderId: string;
	recipientId: string | null;
	content: string;
	created_at: Date;
	updated_at: Date;
	senderFirstName: string;
	senderLastName: string;
	senderProfileImage: string | null;
}

export interface FormattedMessage {
	id: number;
	senderId: number;
	recipientId: number | null;
	content: string;
	created_at: Date;
	updated_at: Date;
}

export interface ChatMessage {
	id: number;
	senderId: string;
	recipientId: string | null;
	content: string;
	created_at: Date;
	updated_at: Date;
}

export interface Conversation {
	id: string;
	senderFirstName: string;
	phone: string;
	senderLastName: string;
	lastMessage?: string;
	unreadCount?: number;
	senderProfileImage?: string;
	senderId: string;
	created_at: string;
	content?: string;
}
