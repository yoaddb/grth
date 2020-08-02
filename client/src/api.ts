import axios from 'axios';

export type Ticket = {
	id: string,
	title: string;
	content: string;
	creationTime: number;
	userEmail: string;
	labels?: string[];
}

export type ApiClient = {
	getTickets: (searchTerm: string) => Promise<Ticket[]>;
}

export const createApiClient = (): ApiClient => {
	return {
		getTickets: (searchTerm: string) => {
			return axios.get(`http://localhost:3232/api/tickets?term=${searchTerm}`).then((res) => res.data);
		}
	}
}



