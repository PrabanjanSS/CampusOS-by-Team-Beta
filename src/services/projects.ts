import { api } from './api';

export interface Project {
	id?: string;
	title: string;
	description: string;
	clubName: string;
	contributors?: string[];
	tags?: string[];
	images?: string[];
	likes?: number;
	views?: number;
	status?: 'Pending' | 'Approved' | 'Rejected';
	githubLink?: string;
	projectLink?: string;
	facultyRemarks?: string;
	approvedBy?: string;
	createdBy?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ProjectsResponse {
	success?: boolean;
	message?: string;
	projects?: Project[];
	project?: Project;
}

export interface ProjectPayload {
	title: string;
	description: string;
	clubName: string;
	contributors?: string[];
	tags?: string[];
	images?: string[];
	likes?: number;
	views?: number;
	status?: 'Pending' | 'Approved' | 'Rejected';
	githubLink?: string;
	projectLink?: string;
	facultyRemarks?: string;
}

export const projectsService = {
	getAll: async () => {
		const response = await api.get<ProjectsResponse>('/projects');
		return response.data;
	},

	getById: async (id: string) => {
		const response = await api.get<ProjectsResponse>(`/projects/${id}`);
		return response.data;
	},

	create: async (payload: ProjectPayload) => {
		const response = await api.post<ProjectsResponse>('/projects', payload);
		return response.data;
	},

	update: async (id: string, payload: Partial<ProjectPayload>) => {
		const response = await api.put<ProjectsResponse>(`/projects/${id}`, payload);
		return response.data;
	},

	delete: async (id: string) => {
		const response = await api.delete<ProjectsResponse>(`/projects/${id}`);
		return response.data;
	},
};
