export type UserData = {
	id: number;
	email: string;
	avatarUrl: string;
	name: string;
};

export type UserAuthData = {
	token: string;
	user: UserData
};
