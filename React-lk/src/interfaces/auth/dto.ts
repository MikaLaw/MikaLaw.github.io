export interface TokenGenerateData {
	access_token: string;
	refresh_token: string;
}

export interface TokenGenerateDto {
	login: string;
	password: string;
}

export interface SignUpDto {
	email: string;
	password: string;
	passwordRepeat: string;
}

export interface PasswordResetRequestDto {
	email: string;
	type: 'passwordCreate' | 'profile';
	// resetPasswordUrl: string;
}

export interface PasswordResetDto {
	resetToken: string;
	password: string;
}

export interface TmpPasswordResetDto {
	password: string;
}
