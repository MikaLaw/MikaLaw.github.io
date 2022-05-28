import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchFavoriteCatsRequest,
  fetchFavoriteCatsSuccess,
  fetchFavoriteCatsFailure,
  fetchMoreFavoriteCatsSuccess,
  changeFavoriteCatsFilter,
  deleteFavouriteRequest,
} from "../actions/favorite";

const favorite = handleActions(
  {
    [fetchFavoriteCatsSuccess]: (state, action) => action.payload,
    [fetchMoreFavoriteCatsSuccess]: (state, action) => [
      ...state,
      ...action.payload,
    ],
    [deleteFavouriteRequest]: () => [],
  },
  []
);

const catsFavoriteFilter = handleAction(
  changeFavoriteCatsFilter,
  (state, action) => {
    return action.payload;
  },
  { page: 1, limit: 10 }
);

const isLoading = handleActions(
  {
    [fetchFavoriteCatsRequest]: () => true,
    [fetchFavoriteCatsSuccess]: () => false,
    [fetchMoreFavoriteCatsSuccess]: () => false,
    [fetchFavoriteCatsFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchFavoriteCatsFailure]: (state, action) => action.payload,
  },
  null
);

export const selectFavoriteCats = (state) => state.favorite.favorite;
export const selectFavoriteCatsFilter = (state) =>
  state.favorite.catsFavoriteFilter;
export const selectFavoriteCatsIsLoading = (state) => state.favorite.isLoading;
export const selectFavoriteCatsError = (state) => state.favorite.error;

export default combineReducers({
  favorite,
  catsFavoriteFilter,
  isLoading,
  error,
});
