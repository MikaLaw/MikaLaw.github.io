import {toModuleAsyncTypes} from "../utils";
import {AnyAction} from "redux";
import {createSelector} from "reselect";
import {createActionsHook} from "react-redux-actions-hook";
import {isApiClientError, isApiError} from "../../interfaces/utils";
import {responseDataToErrorMsg} from "../../tools/utils";
import {message} from "antd";
import restApi from "../../restApi";
import {all, call, put, takeEvery} from 'typed-redux-saga';
import {JuridicalsData} from '../../interfaces/juridicals/dto'
  
export const moduleName = 'juridicals';

export const juridicalsTypes = {
	...toModuleAsyncTypes(moduleName, 'LOAD'),
};


interface JuridicalsState {
    juridicalsData: JuridicalsData[] | null,
    loading: boolean;
	error: string | null;
}

const initialState = {
    juridicalsData: null,
    loading: true,
	error: null,
} as JuridicalsState;

function reducer(state = {...initialState}, action: AnyAction){
	const {payload} = action;
	switch(action.type)
	{
		case juridicalsTypes.LOAD_REQUEST:
			return {
				...state,
				loading: payload?.loading !== undefined ? payload.loading:true,
				error: null,
			};

		case juridicalsTypes.LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				juridicalsData: payload
			};

		case juridicalsTypes.LOAD_ERROR:
			return {
				...state,
				juridicalsData: null,
				loading: false,
				error: payload,
			};

		default:
			return state
	}
}

/* ------ Selectors ------- */

export const stateSelector = (state: {[moduleName]: JuridicalsState}) => state[moduleName];
export const getJuridicalsData = createSelector(stateSelector, state => state.juridicalsData);
export const getJuridicalsLoading = createSelector(stateSelector, state => state.loading);

/* ------ Action Creators ------- */

export function load(payload?: {
	params?: Record<string, any>;
	loading?: boolean;
}){
	return {
		type: juridicalsTypes.LOAD_REQUEST,
		payload,
	}
}

export function loadSuccess(data: JuridicalsData[] | null){
	return {
		type: juridicalsTypes.LOAD_SUCCESS,
		payload: data
	}
}

export function loadError(error: string | null){
	return {
		type: juridicalsTypes.LOAD_ERROR,
		payload: error
	}
}

/* ------ Hook actions ------- */

export const usePublicationsActions = createActionsHook({
	load,
	loadSuccess,
	loadError
});

/* ------ Sagas -----------------*/

const workerLoadSaga = function* ({payload}: ReturnType<typeof load>){
    
	try
	{
		const response = yield* call([restApi, restApi.juridicalsTable]);

		if(response.status === 200)
		{
			yield* put(loadSuccess(response.data));
		} else
		{
			if(isApiError(response.data, response.status))
			{
				yield* put(loadError(
					responseDataToErrorMsg({
						status: response.status,
						data: response.data,
					})
				));
			}
			if(isApiClientError(response.data, response.status))
			{
				message.error(response.data?.message);
			}
		}
	} catch(e: any)
	{
		yield* put(loadError(e.message));
	}
};


export const saga = function* (){
	yield* all([
		takeEvery(juridicalsTypes.LOAD_REQUEST, workerLoadSaga),
	]);
};

export const getJuridicalsModule = () => {
	return {
		id: moduleName,
		reducerMap: {
			[moduleName]: reducer,
		},
		sagas: [saga],
	};
}
