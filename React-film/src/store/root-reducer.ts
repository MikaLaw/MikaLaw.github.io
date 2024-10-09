import {combineReducers} from '@reduxjs/toolkit';
import {Namespace} from '../consts';
import {userProcess} from './user/user';
import {filmsProcess} from './films/films';
import {reviewProcess} from './review/review';

export const rootReducer = combineReducers({
	[Namespace.User]: userProcess.reducer,
	[Namespace.Films]: filmsProcess.reducer,
	[Namespace.Review]: reviewProcess.reducer,
});
