export enum AuthorizationStatus {
	Auth = 'auth',
	NoAuth = 'noAuth',
	Unknown = 'unknown',
}

export type AuthData = {
	login: string;
	password: string;
};
