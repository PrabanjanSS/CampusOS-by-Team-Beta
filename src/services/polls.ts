import { api } from './api';

export interface PollOption {
	id?: string;
	text: string;
	votes: number;
}

export interface Poll {
	id?: string;
	question: string;
	options: PollOption[];
	createdBy?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface PollsResponse {
	success?: boolean;
	message?: string;
	polls?: Poll[];
	poll?: Poll;
}

export interface PollPayload {
	question: string;
	options: Array<{ text: string; votes?: number }>;
}

export interface VotePayload {
	optionIndex: number;
}

export const pollsService = {
	getAll: async () => {
		const response = await api.get<PollsResponse>('/polls');
		return response.data;
	},

	getById: async (id: string) => {
		const response = await api.get<PollsResponse>(`/polls/${id}`);
		return response.data;
	},

	create: async (payload: PollPayload) => {
		const response = await api.post<PollsResponse>('/polls', payload);
		return response.data;
	},

	vote: async (id: string, payload: VotePayload) => {
		const response = await api.put<PollsResponse>(`/polls/vote/${id}`, payload);
		return response.data;
	},

	update: async (id: string, payload: Partial<PollPayload>) => {
		const response = await api.put<PollsResponse>(`/polls/${id}`, payload);
		return response.data;
	},

	delete: async (id: string) => {
		const response = await api.delete<PollsResponse>(`/polls/${id}`);
		return response.data;
	},
};
