import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchCatsRequest,
  fetchCatsSuccess,
  fetchMoreCatsSuccess,
  fetchCatsFailure,
  changeCatsFilter,
} from "../actions/cats";

const cats = handleActions(
  {
    [fetchCatsSuccess]: (state, action) => action.payload,
    [fetchMoreCatsSuccess]: (state, action) => [...state, ...action.payload],
  },
  []
);

const catsFilter = handleAction(
  changeCatsFilter,
  (state, action) => {
    return action.payload;
  },
  { page: 1, limit: 20 }
);

const isLoading = handleActions(
  {
    [fetchCatsRequest]: () => true,
    [fetchCatsSuccess]: () => false,
    [fetchMoreCatsSuccess]: () => false,
    [fetchCatsFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchCatsFailure]: (state, action) => action.payload,
  },
  null
);

export const selectCats = (state) => state.cats.cats;
export const selectCatsFilter = (state) => state.cats.catsFilter;
export const selectCatsIsLoading = (state) => state.cats.isLoading;
export const selectCatsError = (state) => state.cats.error;

export default combineReducers({
  cats,
  catsFilter,
  isLoading,
  error,
});
