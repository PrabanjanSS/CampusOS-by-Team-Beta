import { api } from './api';

export interface Blog {
	id?: string;
	title: string;
	description: string;
	content: string;
	tags?: string[];
	image?: string;
	clubName: string;
	likes?: number;
	views?: number;
	status?: 'Pending' | 'Approved' | 'Rejected';
	facultyRemarks?: string;
	createdBy?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface BlogsResponse {
	success?: boolean;
	message?: string;
	blogs?: Blog[];
	blog?: Blog;
}

export interface BlogPayload {
	title: string;
	description: string;
	content: string;
	tags?: string[];
	image?: string;
	clubName: string;
}

export const blogsService = {
	getAll: async () => {
		const response = await api.get<BlogsResponse>('/blogs');
		return response.data;
	},

	create: async (payload: BlogPayload) => {
		const response = await api.post<BlogsResponse>('/blogs', payload);
		return response.data;
	},
};
