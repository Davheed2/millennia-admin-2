export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	photo: string;
	role: string;
	bio: string;
	country: string;
	isKycVerified: string;
	dailyProfit: string;
	totalProfit: number;
	isSuspended: boolean;
	isDeleted: boolean;
	created_at: string;
};

export type Kyc = {
	id: string;
	userId: string;
	name: string;
	dob: string;
	nationality: string;
	address: string;
	city: string;
	postalCode: string;
	documentType: string;
	document: string;
	selfie: string;
	proofOfAddress: string;
	status: string;
	created_at?: Date;
	updated_at?: Date;
};

export type Transaction = {
	id: string;
	firstName: string;
	lastName: string;
	description: string;
	type: string;
	amount: number;
	status: string;
	userId: string;
	paymentProof: string;
	reference: string;
	crypto: string;
	address: string;
	created_at?: Date;
	updated_at?: Date;
};

export type SessionData = User[];
export type KycData = Kyc[];
export type TransactionData = Transaction[];

export type ApiResponse<T = Record<string, unknown>> = {
	status: string;
	message: string;
	error?: Record<string, string[]> | string;
	data?: T;
};
