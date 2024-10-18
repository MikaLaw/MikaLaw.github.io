import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../consts.ts';
import {ReviewProcess} from '../../types/state';
import {fetchReviewsAction} from '../api-action';

const initialState : ReviewProcess = {
	reviews: {
		filmId: '',
		comments: []
	},
};

export const reviewProcess = createSlice({
	name: Namespace.Review,
	initialState,
	reducers: {},
	extraReducers: function (builder) {
		builder
			.addCase(fetchReviewsAction.fulfilled, (state, action) => {
				state.reviews = action.payload[0];
			});
	}
});

