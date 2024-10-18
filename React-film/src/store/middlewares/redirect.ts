import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../root-reducer.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action) => {

	const { type, payload } = action as PayloadAction<string>;
	if (type === 'app/redirectToRoute') {
		browserHistory.push(payload);
	}
	return next(action);
};
