export interface TechnicalNotification {
	id: number;
	text: string;
	active: boolean;
	applications: {
		name: string;
		code: string;
	}[];
	updatedAt: string;
	createdAt: string;
}
