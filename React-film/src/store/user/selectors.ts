import {State} from '../../types/state.ts';
import {UserData} from '../../types/user-data.ts';
import {AuthorizationStatus, Namespace} from '../../consts';

export const getUser = (state: State): UserData | null => state[Namespace.User].user;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[Namespace.User].authorizationStatus;
export const getAuthorizationStatusLoading = (state: State): boolean => state[Namespace.User].authorizationStatusLoading;
