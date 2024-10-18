export interface Profile {
	id: number;
	phone: string | null;
	email: string | null;
	name: string | null;
	lastName: string | null;
	secondName: string | null;
	status: {
		code: 10 | number;
		name: "Activated" | string;
	};
}
