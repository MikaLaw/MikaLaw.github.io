import {all, call, put, select, take, takeEvery} from 'typed-redux-saga';
import {eventChannel} from 'redux-saga';
import {createSelector} from "reselect";
import history from '../../tools/history';
import {AnyAction} from "redux";
import restApi from '../../restApi';
import {getUriParam, responseDataToErrorMsg} from "../../tools/utils";
import cookieStore, {ACCESS_TOKEN} from '../../tools/cookieStore';
import {ApiError, Response} from "../../interfaces/common";
import {TokenGenerateData} from "../../interfaces/auth/dto";
import {isApiError} from "../../interfaces/utils";
import {createActionsHook} from "react-redux-actions-hook/lib";
import {toModuleAsyncTypes} from "../utils";
import {message} from "antd";
import routes from '../../routes';

export const moduleName = 'auth';

export const authTypes = {
	...toModuleAsyncTypes(moduleName, 'SIGN_IN'),
	...toModuleAsyncTypes(moduleName, 'SIGN_OUT'),
};

export interface AuthState {
	signedIn: boolean;
	loading: boolean;
	error: string | null;
}

const initialState = {
	signedIn: false,
	loading: false,
	error: null,
};

function reducer(state = {...initialState}, action: AnyAction){
	const {payload} = action;

	switch(action.type)
	{
		case authTypes.SIGN_IN_REQUEST:
			return {...state, signedIn: false, loading: true, error: null};

		case authTypes.SIGN_IN_SUCCESS:
			return {...state, loading: false, signedIn: true};

		case authTypes.SIGN_IN_ERROR:
			return {...state, loading: false, error: payload};

		case authTypes.SIGN_OUT_SUCCESS:
			return {...initialState};

		default:
			return state
	}
}

/* ------ Selectors ------- */

export const stateSelector = (state: {[moduleName]: AuthState}) => state[moduleName];
export const getSignedIn = createSelector(stateSelector, state => state.signedIn);

/* ------ Action Creators ------- */

export function signIn(
	login: string,
	password: string,
	resolve?: (args?: Partial<Response<TokenGenerateData>>) => void,
	reject?: (args?: Partial<Response<TokenGenerateData>>) => void
){
	return {
		type: authTypes.SIGN_IN_REQUEST,
		payload: {
			login,
			password,
			resolve,
			reject
		}
	}
}

export function signOut(){
	return {
		type: authTypes.SIGN_OUT_REQUEST
	}
}

/* ------ Hook actions ----------- */

export const useAuthActions = createActionsHook({signIn, signOut})

/* ------ Sagas -----------------*/

const signInSaga = function* (action: ReturnType<typeof signIn>){
	const {login, password, resolve, reject} = action.payload;

	try
	{
		const response = yield* call([restApi, restApi.login], login, password);

		if(isApiError(response.data, response.status))
		{
			yield* put({
				type: authTypes.SIGN_IN_ERROR,
				payload: responseDataToErrorMsg({
					status: response.status,
					data: response.data,
				})
			})

			if(reject) yield* call(reject, response);
		} else if(resolve)
		{
			yield* call(resolve);
		}
	} catch(e: any)
	{
		yield* put({
			type: authTypes.SIGN_IN_ERROR,
			payload: e.message
		})

		if(reject) yield* call(reject, {status: 0, data: e});
	}
};

const signOutSaga = function* (){
	yield* call([restApi, restApi.logout]);
	history.push(routes.login.path)
};


const watchSignInChangeSaga = function* (){
	const signedIn = yield* call(() => {
		return !!cookieStore.getAccessToken();
	});
	const verifyToken = getUriParam('verifyToken');
	const access_token = getUriParam('access_token');
	const refresh_token = getUriParam('refresh_token');

	if(verifyToken || (access_token && refresh_token))
	{
		yield* call([restApi, restApi.logout]);

		if(verifyToken)
		{
			const response = yield* call([restApi, restApi.verifyEmail], verifyToken as string);

			if(response.status === 200)
			{
				message.success("Почта успешно подтверждена!")

				restApi.updateAccessToken(response.data);

				yield* put({
					type: authTypes.SIGN_IN_SUCCESS,
				});
			} else
			{
				message.error((response.data as ApiError)?.message);
			}
		}

		if(access_token && refresh_token)
		{
			restApi.updateAccessToken({
				refresh_token: refresh_token as string,
				access_token: access_token as string,
			});

			yield* put({
				type: authTypes.SIGN_IN_SUCCESS,
			});
		}
	} else
	{
		if(signedIn)
		{
			yield* put({
				type: authTypes.SIGN_IN_SUCCESS
			});
		}
	}

	const channel = yield* call(() => eventChannel(emit => {
		cookieStore.onUpdate(ACCESS_TOKEN, (accessToken) => {
			emit(!!accessToken);
		});
		return () => {
		};
	}));

	while(true)
	{
		const isSignedInApi = yield* take(channel);
		const state = yield* select(stateSelector);

		if(!isSignedInApi && state.signedIn)
		{
			yield* put({
				type: authTypes.SIGN_OUT_SUCCESS
			});
		} else if(isSignedInApi && !state.signedIn)
		{
			yield* put({
				type: authTypes.SIGN_IN_SUCCESS
			});
		}
	}
};

const saga = function* (){
	yield* all([
		takeEvery(authTypes.SIGN_IN_REQUEST, signInSaga),
		takeEvery(authTypes.SIGN_OUT_REQUEST, signOutSaga),
		watchSignInChangeSaga()
	])
};

export const getAuthModule = () => {
	return {
		id: moduleName,
		reducerMap: {
			[moduleName]: reducer,
		},
		sagas: [saga],
	};
}
