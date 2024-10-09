import {all, call, put, select, takeEvery} from 'typed-redux-saga';
import {createSelector} from "reselect";
import {getSignedIn, authTypes} from "./auth";
import {AnyAction} from "redux";
import restApi from "../../restApi";
import {responseDataToErrorMsg} from "../../tools/utils";
import {Profile} from "../../interfaces/profile/models";
import {isApiError} from "../../interfaces/utils";
import {toModuleAsyncTypes} from "../utils";
import {createActionsHook} from "react-redux-actions-hook";

export const moduleName = 'profile';

export const profileTypes = {
	...toModuleAsyncTypes(moduleName, 'LOAD'),

	// ADD TYPES
};

interface ProfileState {
	profile: Profile | null;
	loading: boolean,
	error: string | null,
}

const initialState = {
	profile: null,
	loading: false,
	error: null,
};

function reducer(state = {...initialState}, action: AnyAction){
	const {payload} = action;
	switch(action.type)
	{
		case profileTypes.LOAD_REQUEST:
			return {
				...state,
				loading: payload?.loading !== undefined ? payload.loading:true,
				error: null
			};

		case profileTypes.LOAD_SUCCESS:
			return {...state, loading: false, profile: payload};

		case profileTypes.LOAD_ERROR:
			return {...state, loading: false, error: payload};

		default:
			return state
	}
}

/* ------ Selectors ------- */

export const stateSelector = (state: {[moduleName]: ProfileState}) => state[moduleName];
export const getProfile = createSelector(stateSelector, state => state.profile);
export const getProfileLoading = createSelector(stateSelector, state => state.loading);
export const getProfileEmail = createSelector(getProfile, profile => profile?.email);

/* ------ Action Creators ------- */

export function load(payload?: {loading: boolean}){
	return {
		type: profileTypes.LOAD_REQUEST,
		payload
	}
}

export const useProfileActions = createActionsHook({load});

/* ------ Sagas -----------------*/

const workerLoadSaga = function* (){
	try
	{
		const response = yield* call([restApi, restApi.profileDetail]);

		if(response.status === 200)
		{
			yield* put({
				type: profileTypes.LOAD_SUCCESS,
				payload: response.data,
			});

		} else
		{
			if(isApiError(response.data, response.status))
			{
				yield* put({
					type: profileTypes.LOAD_ERROR,
					payload: responseDataToErrorMsg({
						status: response.status,
						data: response.data,
					})
				})
			}
		}
	} catch(e: any)
	{
		yield* put({
			type: profileTypes.LOAD_ERROR,
			payload: e.message
		})
	}
};

const watchLoadSaga = function* (){
	const signedIn = yield* select(getSignedIn);
	const loading = yield* select(getProfileLoading);

	if(signedIn && !loading)
	{
		yield* put(load());
	}
}

export const saga = function* (){
	yield* all([
		takeEvery(profileTypes.LOAD_REQUEST, workerLoadSaga),
		watchLoadSaga(),
		takeEvery(authTypes.SIGN_IN_SUCCESS, watchLoadSaga),
	])
};

export const getProfileModule = () => {
	return {
		id: moduleName,
		reducerMap: {
			[moduleName]: reducer,
		},
		sagas: [saga],
	};
}
