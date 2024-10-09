import Cookie, {CookieAttributes} from 'js-cookie';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

interface UpdateListener {
	name: string;
	callback: (name?: string | object) => void;
}

export class CookieStore {
	private onUpdateListeners: UpdateListener[];

	constructor(){
		this.onUpdateListeners = [];
	}

	setAccessToken(value: string){
		this.set(ACCESS_TOKEN, value);
	}

	getAccessToken(){
		return this.get(ACCESS_TOKEN);
	}

	setRefreshToken(value: string){
		this.set(REFRESH_TOKEN, value);
	}

	getRefreshToken(){
		return this.get(REFRESH_TOKEN);
	}

	onUpdate(name: UpdateListener['name'], callback: UpdateListener['callback']){
		this.onUpdateListeners.push({name, callback});
	}

	set(name: string, value: any, expires?: number | Date | undefined){
		expires = expires || (() => {
			const date = new Date();
			date.setDate(date.getDate() + 14);
			return date;
		})();

		Cookie.set(name, value, {path: '/', expires: expires, sameSite: 'Lax'});

		this.onUpdateListeners.forEach((item) => {
			if(item.name === name)
			{
				item.callback(value);
			}
		})
	}

	get(name: string){
		return Cookie.get(name);
	}

	remove(name: string, options?: CookieAttributes){
		return Cookie.remove(name, options);
	}
}

const store = new CookieStore();
export default store;
