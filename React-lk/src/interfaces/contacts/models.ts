export interface FullManagerContactModel {
	fullName: string | null;
	emails: string[] | null;
	filial: string;
	juridicals: {
		name: string | null;
	}[];
	isShowTelegram: boolean | null;
	isShowWhatsapp: boolean | null;
	phone: string | null;
	photo: {
		id: number;
		name: string | null;
		url: string | null;
	} | null;
	telegramLink: string | null;
	telegramLogin: string | null;
	whatsappLink: string | null;
}