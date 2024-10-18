import {fetchCredentials, restApiUrl as apiUrl} from './config';
import {ValuesType} from 'utility-types';
import {stringify} from 'qs';
import cookieStore, {CookieStore} from './tools/cookieStore';
import {Response as ResponseRequest, ResponseStatus} from "./interfaces/common";
import {
	PasswordResetDto,
	PasswordResetRequestDto,
	TokenGenerateData,
	TokenGenerateDto,
	SignUpDto
} from "./interfaces/auth/dto";
import {JuridicalsData} from './interfaces/juridicals/dto'
import {Profile} from "./interfaces/profile/models";
import {FullManagerContactModel} from "./interfaces/contacts/models";
import {TechnicalNotification} from './interfaces/technical/notifications';
import {getCookieNames} from './tools/utils';
export const xPaginationKeyToVal = {
	'X-Pagination-Current-Page': 'currentPage',
	'X-Pagination-Page-Count': 'pageCount',
	'X-Pagination-Per-Page': 'perPage',
	'X-Pagination-Total-Count': 'totalCount',
} as const;

interface ModifyRequestInit extends RequestInit {
	bodyForm?: Record<string, any>;
}

export class RestApi {
	public readonly apiUrl: string;
	private cookieStore: CookieStore;
	private refreshTokenRequested: boolean;
	private isRefreshToken: boolean;
	private cacheUrls: string[];

	constructor({apiUrl, cookieStore}: {apiUrl: string, cookieStore: CookieStore}){
		this.apiUrl = apiUrl;
		this.cookieStore = cookieStore;
		this.refreshTokenRequested = false;
		this.isRefreshToken = false;
		this.cacheUrls = [];
	}

	obtainUrlCredentials(url: string){
		return url + (url.indexOf('?') !== -1 ? '&':'?') + 'access-token=' + this.cookieStore.getAccessToken();
	}

	/**
	 * @param {string} url
	 * @param {{method?: string, headers?: object, body?: string|object|FormData}} [options]
	 * @return {Promise}
	 */
	sendRequest<Data = any>(url: string, options?: ModifyRequestInit){
		options = options || {};
		let method = options.method || 'GET';
		let headers = options.headers || {
			'Accept': 'application/json',
			'Application-Type': 'Lkk'
		};
		let body = options.body || null;
		let requestUrl = url;

		if(method === 'POST' || ((body || options?.bodyForm)))
		{
			if(options?.bodyForm && !(options?.bodyForm instanceof FormData))
			{
				(headers as Record<string, string>)['Content-Type'] = 'application/x-www-form-urlencoded';
			}

			if(method === 'GET')
			{
				method = 'POST';
			}
		}

		if(options?.bodyForm && typeof options?.bodyForm === 'object' && !(options?.bodyForm instanceof FormData))
		{
			body = stringify(options?.bodyForm);
		}

		return new Promise<ResponseRequest<Data>>((resolve, reject) => {
			fetch(requestUrl, {
				method,
				headers,
				body,
				credentials: fetchCredentials,
			})
				.then((response) => {

					response.json().then((data) => {
						let resultData: {
							data: any;
							status: number;
							statusText: string;
							pagination?: Record<ValuesType<typeof xPaginationKeyToVal>, string>
						} = {
							data: data,
							status: response.status,
							statusText: response.statusText
						} as const;

						let pagination = {} as Record<ValuesType<typeof xPaginationKeyToVal>, string>;

						for(let xPaginationKeyToValKey in xPaginationKeyToVal)
						{
							const value = response.headers.get(xPaginationKeyToValKey);
							if(value !== undefined && value !== null)
							{
								pagination[xPaginationKeyToVal[xPaginationKeyToValKey as keyof typeof xPaginationKeyToVal]] = value;
							}
						}
						if(Object.keys(pagination).length)
						{
							resultData.pagination = pagination;
						}

						resolve(resultData);
					})
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	/**
	 * @param {string} url
	 * @param {{method?: string, headers?: object, body?: string|object|FormData}} [options]
	 * @return {Promise}
	 */
	async sendAuthorisedRequest<Data = any>(url: string, options?: ModifyRequestInit): Promise<ResponseRequest<Data>>{
		// let urlWithAuth = this.obtainUrlCredentials(url);
		const currentToken = this.cookieStore.getAccessToken();
		let response: ResponseRequest<Data> | null = null;

		try
		{
			
			response = await this.sendRequest<Data>(url, {
				...options,
				headers: {
					'Accept': 'application/json',
					'Application-Type': 'Lkk',
					...options?.headers,
					'Authorization': `Bearer ${this.cookieStore.getAccessToken()}`
				}
			});
		} catch(e)
		{
			if(!this.cacheUrls.includes(url))
			{
				this.cacheUrls.push(url);

				response = await this.sendRequest<Data>(url, {
					...options,
					headers: {
						'Accept': 'application/json',
						'Application-Type': 'Lkk',
						...options?.headers,
						'Authorization': `Bearer ${this.cookieStore.getAccessToken()}`
					}
				});
			}
		}

		if(response?.status === ResponseStatus.OK)
		{
			this.cacheUrls = this.cacheUrls.filter(cacheUrl => cacheUrl !== url);
		}

		if(response?.status === 401 && this.cookieStore.getRefreshToken())
		{
			const isRefetchRequest = await this.isRefetchRequestPromise(currentToken);

			if(isRefetchRequest) return this.sendAuthorisedRequest(url, options);
		}

		return response || {} as ResponseRequest<Data>;
	}

	async isRefetchRequestPromise(currentToken: string | undefined){
		return new Promise((resolve) => {
			const newToken = this.cookieStore.getAccessToken();

			if(currentToken !== newToken && newToken)
			{
				resolve(true);
			}

			if(!this.refreshTokenRequested && currentToken === newToken)
			{
				this.refreshTokenRequested = true;
				this.isRefreshToken = false;

				this.refreshToken(true).then((isRefresh) => {
					if(isRefresh)
					{
						this.isRefreshToken = true;
						this.refreshTokenRequested = false;
					} else
					{
						window.location.reload();
					}
				});
			}

			const interval = setInterval(() => {
				if(this.isRefreshToken)
				{
					clearInterval(interval);
					resolve(true);
				}
			}, 300);
		});
	}

	/**
	 * @param {boolean} [runLogout]
	 * @return boolean
	 */
	async refreshToken(runLogout: boolean){
		try
		{
			const {status, data} = await this.sendRequest(this.apiUrl + "/auth/token-refresh", {
				bodyForm: {
					refresh_token: this.cookieStore.getRefreshToken()
				},
			});

			if(status === 200 && data.access_token)
			{
				this.updateAccessToken(data);
				return true;
			}
		} catch(e)
		{
		}

		if(runLogout) this.logout();

		return false;
	};

	/**
	 * @param {string} login
	 * @param {string} password
	 * @return {{}}
	 */
	async login(login: TokenGenerateDto['login'], password: TokenGenerateDto['password']){
		this.logout();
		const response = await this.sendRequest<TokenGenerateData>(this.apiUrl + "/token-generate.json");

		const {status, data} = response;

		if(status === 200 && data.access_token)
		{
			this.updateAccessToken(data);
			localStorage.setItem('isLoggedIn', 'true');
		}

		return response;
	};

	async passwordResetRequest(data: PasswordResetRequestDto){
		return this.sendRequest(this.apiUrl + "/auth/password-reset-request", {
			bodyForm: data
		});
	}

	async sendRegistrationRequest(email: SignUpDto['email'], password: SignUpDto['password'], passwordRepeat: SignUpDto['passwordRepeat']){
		const response = await this.sendRequest<TokenGenerateData>(this.apiUrl + "/token-generate.json");

		const {status, data} = response;

		if(status === 200 && data.access_token)
		{
			this.updateAccessToken(data);
		}

		return response;
	}	

	async passwordReset(data: PasswordResetDto){
		return this.sendRequest(this.apiUrl + "/auth/password-reset", {
			bodyForm: data
		});
	}

	async verifyEmail(verifyToken: string){
		return this.sendRequest<TokenGenerateData>(this.apiUrl + "/auth/verify-email", {
			bodyForm: {
				verifyToken
			}
		});
	}

	updateAccessToken(data: TokenGenerateData){
		this.cookieStore.setAccessToken(data.access_token);
		this.cookieStore.setRefreshToken(data.refresh_token);
	}

	logout(){
		this.cookieStore.setAccessToken('');
		this.cookieStore.setRefreshToken('');
		this.cookieStore.set('openKeys', '');
		localStorage.setItem('isLoggedIn', 'false');

		getCookieNames('technical-notification-').forEach((name) => {
			this.cookieStore.remove(name, {path: '/', sameSite: 'Lax'});
		});

		return true;
	};
	// --------- Profile ---------
	async profileDetail(){
		return await this.sendAuthorisedRequest<Profile>(this.apiUrl + "/profile.json", {method: 'GET'});
	}

	// Contacts
	async contactsAllManagers(){
		return await this.sendAuthorisedRequest<FullManagerContactModel[]>(this.apiUrl + "/contacts-all-managers.json", {
			method: 'GET'
		});
	}

	// Juridicals

	async juridicalsTable(){
		return await this.sendAuthorisedRequest<JuridicalsData[]>(this.apiUrl + "/juridicals-table.json", {method: 'GET'});
	}

	async juridicalsDetail(id: string){
		return await this.sendAuthorisedRequest<JuridicalsData[]>(this.apiUrl + "/juridicals-table.json", {method: 'GET'});
	}

	// Technical notifications

	async technicalNotificationsList(){
		return await this.sendAuthorisedRequest<TechnicalNotification[]>(this.apiUrl + "/technical-notifications-list.json", {
			method: 'GET'
		});
	}
}

const restApi = new RestApi({apiUrl, cookieStore});
export default restApi;
