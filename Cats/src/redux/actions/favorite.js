import { createAction } from "redux-actions";

export const fetchFavoriteCatsRequest = createAction(
  "FETCH_FAVORITE_CATS_REQUEST"
);
export const fetchFavoriteCatsSuccess = createAction(
  "FETCH_FAVORITE_CATS_SUCCES"
);
export const fetchMoreFavoriteCatsSuccess = createAction(
  "FETCH_MORE_FAVORITE_CATS_SUCCES"
);
export const fetchFavoriteCatsFailure = createAction(
  "FETCH_FAVORITE_CATS_FAILURE"
);

export const deleteFavouriteRequest = createAction("DELETE_FAVORITE_REQUEST");
export const deleteFavouriteSuccess = createAction("DELETE_FAVORITE_SUCCES");
export const deleteFavouriteFailure = createAction("DELETE_FAVORITE_FAILURE");

export const changeFavoriteCatsFilter = createAction(
  "CHANGE_FAVORITE_CATS_FILTER"
);
