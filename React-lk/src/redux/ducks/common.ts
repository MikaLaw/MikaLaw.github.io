import {all, call, delay, put,takeEvery} from 'typed-redux-saga';
import {createSelector} from "reselect";
import {AnyAction} from "redux";
import restApi from "../../restApi";
import {createActionsHook} from "react-redux-actions-hook";
import {profileTypes} from "./profile";
import {ResponseStatus} from "../../interfaces/common";
import {CommonSettingsModel} from "../../interfaces/common/models";
import {appName} from "../../config";
import {TechnicalNotification} from "../../interfaces/technical/notifications";
import cookieStore from '../../tools/cookieStore';

export const moduleName = 'common';

export const commonTypes = {
	INITIAL_LOADING: `${appName}/${moduleName}/INITIAL_LOADING`,
	SET_OPEN_HEADER_MENU: `${appName}/${moduleName}/SET_OPEN_HEADER_MENU`,
	SET_TECHNICAL_NOTIFICATIONS_LIST: `${appName}/${moduleName}/SET_TECHNICAL_NOTIFICATIONS_LIST`,
	REMOVE_TECHNICAL_NOTIFICATION: `${appName}/${moduleName}/REMOVE_TECHNICAL_NOTIFICATION`,
	SET_HEIGHT_TECHNICAL_NOTIFICATIONS: `${appName}/${moduleName}/SET_HEIGHT_TECHNICAL_NOTIFICATIONS`,
	SET_COLLAPSED_MENU: `${appName}/${moduleName}/SET_COLLAPSED_MENU`,
	SET_PAGE_VISIBLE: `${appName}/${moduleName}/SET_PAGE_VISIBLE`,
	SET_BREADCRUMB_DETAILS: `${appName}/${moduleName}/SET_BREADCRUMB_DETAILS`,
};

interface CommonState {
	settings: CommonSettingsModel | null;
	initialLoading: boolean;
	openHeaderMenu: boolean;
	technicalNotificationsList: TechnicalNotification[];
	heightTechnicalNotifications: number;
	breadcrumbDetails: {
		id: string;
		name: string;
	}[];
	collapsedMenu: boolean;
	isPageVisible: boolean;
	heightTablePagination: number;
}

const initialState = {
	settings: null,
	initialLoading: false,
	openHeaderMenu: false,
	technicalNotificationsList: [],
	heightTechnicalNotifications: 0,
	breadcrumbDetails: [],
	collapsedMenu: false,
	isPageVisible: true,
	heightTablePagination: 0,
} as CommonState;

function reducer(state = {...initialState}, action: AnyAction){
	const {payload} = action;
	switch(action.type)
	{
		case commonTypes.INITIAL_LOADING:
			return {...state, initialLoading: payload};
		case commonTypes.SET_OPEN_HEADER_MENU:
			return {...state, openHeaderMenu: payload};
		case commonTypes.SET_TECHNICAL_NOTIFICATIONS_LIST:
			return {...state, technicalNotificationsList: payload};
		case commonTypes.SET_BREADCRUMB_DETAILS:
				return {...state, breadcrumbDetails: payload};
		case commonTypes.REMOVE_TECHNICAL_NOTIFICATION:
			return {
				...state,
				technicalNotificationsList: state.technicalNotificationsList.filter((notification) => notification.id !== payload)
			};
		case commonTypes.SET_HEIGHT_TECHNICAL_NOTIFICATIONS:
			return {...state, heightTechnicalNotifications: payload};
		case commonTypes.SET_COLLAPSED_MENU:
			return {...state, collapsedMenu: payload};
		case commonTypes.SET_PAGE_VISIBLE:
			return {...state, isPageVisible: payload};
		default:
			return state
	}
}

/* ------ Selectors ------- */

export const stateSelector = (state: {[moduleName]: CommonState}) => state[moduleName];
export const getCommonInitialLoading = createSelector(stateSelector, state => state.initialLoading);
export const getOpenHeaderMenu = createSelector(stateSelector, state => state.openHeaderMenu);
export const getTechnicalNotificationsList = createSelector(stateSelector, state => state.technicalNotificationsList);
export const getHeightTechnicalNotificationsList = createSelector(stateSelector, state => state.heightTechnicalNotifications);
export const getBreadcrumbDetails = createSelector(stateSelector, state => state.breadcrumbDetails);

/* ------ Action Creators ------- */


export function initialLoading(loading: boolean){
	return {
		type: commonTypes.INITIAL_LOADING,
		payload: loading
	}
}

export function setOpenHeaderMenu(openHeaderMenu: boolean){
	return {
		type: commonTypes.SET_OPEN_HEADER_MENU,
		payload: openHeaderMenu,
	}
}

export function setTechnicalNotificationsList(list: CommonState['technicalNotificationsList']){
	return {
		type: commonTypes.SET_TECHNICAL_NOTIFICATIONS_LIST,
		payload: list,
	};
}

export function removeTechnicalNotification(id: TechnicalNotification['id']){
	return {
		type: commonTypes.REMOVE_TECHNICAL_NOTIFICATION,
		payload: id,
	};
}

export function setHeightTechnicalNotificationsList(payload: CommonState['heightTechnicalNotifications']){
	return {
		type: commonTypes.SET_HEIGHT_TECHNICAL_NOTIFICATIONS,
		payload,
	};
}

export function setCollapsedMenu(payload: CommonState['collapsedMenu']){
	return {
		type: commonTypes.SET_COLLAPSED_MENU,
		payload,
	}
}

export function setIsPageVisible(payload: CommonState['isPageVisible']){
	return {
		type: commonTypes.SET_PAGE_VISIBLE,
		payload,
	}
}

export function setBreadcrumbDetails(payload: CommonState['breadcrumbDetails']){
	return {
		type: commonTypes.SET_BREADCRUMB_DETAILS,
		payload,
	}
}

/* ------ Hook actions ------- */

export const useCommonActions = createActionsHook({
	initialLoading,
	setOpenHeaderMenu,
	removeTechnicalNotification,
	setHeightTechnicalNotificationsList,
	setCollapsedMenu,
	setIsPageVisible,
	setBreadcrumbDetails,
});

/* ------ Sagas -----------------*/

const notificationCookieName = 'technical-notification';

function* workerTechnicalNotificationsList(){
	try
	{
		const response = yield* call([restApi, restApi.technicalNotificationsList]);

		if(response.status === ResponseStatus.OK)
		{
			yield put(setTechnicalNotificationsList(response.data.filter((item) => {
				const notificationId = cookieStore.get(`${notificationCookieName}-${item.id}`);

				return notificationId ? item.id !== +notificationId:true;
			})));
		}
	} catch(e: any)
	{
		console.error(e?.message);
	}
}

function* workerRemoveTechnicalNotification({payload}: ReturnType<typeof removeTechnicalNotification>){
	yield cookieStore.set(`${notificationCookieName}-${payload}`, String(payload), new Date(new Date().getTime() + 60 * 60 * 1000));
}

const time1 = 7200000; // 2 часа в миллисекундах

function* watchCallSelfOnTimer1(): Generator{
	yield* delay(time1);
	yield* call(watchCallSelfOnTimer1);
}

const time2 = 1200000; // 20 минут в миллисекундах

function* watchCallSelfOnTimer2(): Generator{
	yield* delay(time2);
	yield* workerTechnicalNotificationsList();
	yield* call(watchCallSelfOnTimer2);
}

export const saga = function* (){
	yield* all([
		takeEvery(profileTypes.LOAD_SUCCESS, workerTechnicalNotificationsList),
		takeEvery(commonTypes.REMOVE_TECHNICAL_NOTIFICATION, workerRemoveTechnicalNotification),
		watchCallSelfOnTimer1(),
		watchCallSelfOnTimer2(),
	]);
};

export const getCommonModule = () => {
	return {
		id: moduleName,
		reducerMap: {
			[moduleName]: reducer,
		},
		sagas: [saga],
	};
}
