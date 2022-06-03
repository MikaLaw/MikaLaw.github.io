import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  fetchAddressRequest,
  fetchAddressSuccess,
  fetchAddressFailure,
} from "./actions";

const address = handleActions(
  {
    [fetchAddressSuccess]: (state, action) => action.payload.towns,
  },
  []
);

const coords = handleActions(
  {
    [fetchAddressSuccess]: (state, action) => action.payload.coords,
  },
  []
);

const isLoading = handleActions(
  {
    [fetchAddressRequest]: () => true,
    [fetchAddressSuccess]: () => false,
    [fetchAddressFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchAddressFailure]: (state, action) => action.payload,
  },
  null
);

export const selectAddress = (state) => state.address;
export const selectAddressCoords = (state) => state.coords;
export const selectAddressIsLoading = (state) => state.isLoading;
export const selectAddressError = (state) => state.error;

export default combineReducers({
  address,
  coords,
  isLoading,
  error,
});
