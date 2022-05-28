import { createAction } from "redux-actions";

export const fetchCatsRequest = createAction("FETCH_CATS_REQUEST");
export const fetchCatsSuccess = createAction("FETCH_CATS_SUCCES");
export const fetchMoreCatsSuccess = createAction("FETCH_MORE_CATS_SUCCES");
export const fetchCatsFailure = createAction("FETCH_CATS_FAILURE");

export const saveFavouriteRequest = createAction("SAVE_FAVORITE_REQUEST");
export const saveFavouriteSuccess = createAction("SAVE_FAVORITE_SUCCES");
export const saveFavouriteFailure = createAction("SAVE_FAVORITE_FAILURE");

export const changeCatsFilter = createAction("CHANGE_CATS_FILTER");
