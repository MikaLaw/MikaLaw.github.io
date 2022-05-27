import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchAddressListRequest,
  fetchAddressListSuccess,
  fetchAddressListFailure,
} from "../actions/address";

const addressList = handleActions(
  {
    [fetchAddressListRequest]: () => [],
    [fetchAddressListSuccess]: (state, action) => action.payload.addresses,
    [fetchAddressListFailure]: () => [],
  },
  []
);

const isLoading = handleActions(
  {
    [fetchAddressListRequest]: () => true,
    [fetchAddressListSuccess]: () => false,
    [fetchAddressListFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchAddressListRequest]: () => null,
    [fetchAddressListSuccess]: () => null,
    [fetchAddressListFailure]: (state, action) =>
      action.payload.error ? action.payload.error : null,
  },
  null
);

export default combineReducers({
  addressList,
  isLoading,
  error,
});

export const getAddressList = (state) => state.address.addressList;
export const getAddressListIsLoading = (state) => state.address.isLoading;
export const getAddressListError = (state) => state.address.error;
