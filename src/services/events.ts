 import { api } from './api';

export interface Event {
	id?: string;
	title: string;
	description: string;
	venue: string;
	date: string;
	registrationLink?: string;
	image?: string;
	createdBy?: string;
	isRegistered?: boolean;
}

export interface EventsResponse {
	success?: boolean;
	message?: string;
	events?: Event[];
	event?: Event;
}

export interface EventPayload {
	title: string;
	description: string;
	venue: string;
	date: string;
	registrationLink?: string;
	image?: string;
}

export interface EventRegistrationPayload {
	id?: string | number;
	title: string;
	date?: string;
	time: string;
	location: string;
	attendees: number;
	status?: string;
	isoDate?: string;
	isoTime?: string;
}

export const eventsService = {
	getAll: async () => {
		const response = await api.get<EventsResponse>('/events');
		return response.data;
	},

	getById: async (id: string) => {
		const response = await api.get<EventsResponse>(`/events/${id}`);
		return response.data;
	},

	create: async (payload: EventPayload) => {
		const response = await api.post<EventsResponse>('/events', payload);
		return response.data;
	},

	register: async (event: EventRegistrationPayload) => {
		const eventKey = String(event.id || event.title);
		const registrations = JSON.parse(localStorage.getItem('registeredEvents') || '[]');

		if (!registrations.includes(eventKey)) {
			registrations.push(eventKey);
			localStorage.setItem('registeredEvents', JSON.stringify(registrations));

			const campusEvents = JSON.parse(localStorage.getItem('campusEvents') || '[]');

			let startDate: Date;
			let endDate: Date;

			if (event.isoDate && event.isoTime) {
				const [year, month, day] = event.isoDate.split('-').map(Number);
				const [hours, minutes] = event.isoTime.split(':').map(Number);
				startDate = new Date(year, month - 1, day, hours, minutes, 0);
				endDate = new Date(year, month - 1, day, hours + 2, minutes, 0);
			} else if (event.date) {
				const dateParts = event.date.split(' ');
				if (dateParts.length === 2) {
					const monthMap: Record<string, number> = {
						Jan: 0,
						Feb: 1,
						Mar: 2,
						Apr: 3,
						May: 4,
						Jun: 5,
						Jul: 6,
						Aug: 7,
						Sep: 8,
						Oct: 9,
						Nov: 10,
						Dec: 11,
					};
					const month = monthMap[dateParts[0]];
					const day = Number.parseInt(dateParts[1], 10);
					const currentYear = new Date().getFullYear();
					startDate = new Date(currentYear, month, day, 10, 0, 0);
					endDate = new Date(currentYear, month, day, 12, 0, 0);
				} else {
					startDate = new Date(event.date);
					endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
				}
			} else {
				startDate = new Date();
				endDate = new Date(Date.now() + 2 * 60 * 60 * 1000);
			}

			const plannerEvent = {
				id: eventKey,
				title: event.title,
				description: `Registered for ${event.title}`,
				category: 'Workshop' as const,
				start: startDate.toISOString(),
				end: endDate.toISOString(),
				venue: event.location,
				organizer: 'CampusOS',
				participants: event.attendees + 1,
				color: '#19376D',
			};

			const exists = campusEvents.find((entry: { id?: string }) => entry.id === eventKey);
			if (!exists) {
				campusEvents.push(plannerEvent);
				localStorage.setItem('campusEvents', JSON.stringify(campusEvents));
			}

			window.dispatchEvent(new Event('campusos_event_registered'));
		}

		return { registered: true };
	},

	update: async (id: string, payload: Partial<EventPayload>) => {
		const response = await api.put<EventsResponse>(`/events/${id}`, payload);
		return response.data;
	},

	delete: async (id: string) => {
		const response = await api.delete<EventsResponse>(`/events/${id}`);
		return response.data;
	},
};
