import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, Namespace} from '../../consts';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-action';

const initialState : UserProcess = {
	authorizationStatus: AuthorizationStatus.Unknown,
	authorizationStatusLoading: false,
	user: null,
};

export const userProcess = createSlice({
	name: Namespace.User,
	initialState,
	reducers: {},
	extraReducers: function (builder) {
		builder
			.addCase(checkAuthAction.pending, (state) => {
				state.authorizationStatusLoading = true;
			})
			.addCase(checkAuthAction.fulfilled, (state, action) => {
				state.authorizationStatus = action.payload ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;
				state.user = action.payload;
				state.authorizationStatusLoading = false;
			})
			.addCase(checkAuthAction.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
				state.authorizationStatusLoading = false;
			})
			.addCase(loginAction.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authorizationStatus = AuthorizationStatus.Auth;
			})
			.addCase(loginAction.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			})
			.addCase(logoutAction.fulfilled, (state) => {
				state.authorizationStatus = AuthorizationStatus.NoAuth;
			});
	}
});
