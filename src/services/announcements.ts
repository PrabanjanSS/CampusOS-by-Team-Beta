import { api } from './api';

export interface Announcement {
	id?: string;
	title: string;
	description: string;
	priority: 'high' | 'normal' | 'low';
	clubName: string;
	expiresAt?: string;
	postedBy?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface AnnouncementsResponse {
	success?: boolean;
	message?: string;
	announcements?: Announcement[];
	announcement?: Announcement;
}

export interface AnnouncementPayload {
	title: string;
	description: string;
	priority: 'High' | 'Medium' | 'Low';
	clubName: string;
	expiresAt?: string;
}

export const announcementsService = {
	getAll: async () => {
		const response = await api.get<AnnouncementsResponse>('/announcements');
		return response.data;
	},

	create: async (payload: AnnouncementPayload) => {
		const response = await api.post<AnnouncementsResponse>('/announcements', payload);
		return response.data;
	},
};
