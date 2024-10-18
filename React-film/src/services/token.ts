import { UserData } from '../types/user-data';

const AUTH_TOKEN_KEY_NAME = 'what-to-watch-token';
const USER_KEY_NAME = 'user';

export type Token = string;

export const getToken = (): Token | null => {
	const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
	return token ?? null;
};

export const saveToken = (token: Token): void => {
	localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const saveUser = (user: UserData): void => {
	localStorage.setItem(USER_KEY_NAME, JSON.stringify(user));
};

export const getUser = (): UserData | null => {
	const dataUser = localStorage.getItem(USER_KEY_NAME);
	const user = dataUser ? JSON.parse(dataUser) as UserData : null;
	return user;
};

export const dropToken = (): void => {
	localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const dropUser = (): void => {
	localStorage.removeItem(USER_KEY_NAME);
};
