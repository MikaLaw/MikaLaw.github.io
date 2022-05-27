import { createActions } from "redux-actions";

export const {
  fetchAddressListRequest,
  fetchAddressListSuccess,
  fetchAddressListFailure,
} = createActions(
  "FETCH_ADDRESS_LIST_REQUEST",
  "FETCH_ADDRESS_LIST_SUCCESS",
  "FETCH_ADDRESS_LIST_FAILURE"
);
