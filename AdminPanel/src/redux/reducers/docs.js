import { handleAction, handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchDocsRequest,
  fetchDocsSuccess,
  fetchDocsFailure,
  updateDocsRequest,
  updateDocsSuccess,
  updateDocsFailure,
} from "../actions/docs";

const docs = handleAction(
  fetchDocsSuccess,
  (state, action) => action.payload.docs.text,
  ""
);

const isLoading = handleActions(
  {
    [fetchDocsRequest]: () => true,
    [fetchDocsSuccess]: () => false,
    [fetchDocsFailure]: () => false,
    [updateDocsRequest]: () => true,
    [updateDocsSuccess]: () => false,
    [updateDocsFailure]: () => false,
  },
  false
);

const error = handleActions(
  {
    [fetchDocsFailure]: (state, action) => action.payload,
    [updateDocsFailure]: (state, action) => action.payload,
  },
  null
);

export const selectDocs = (state) => state.docs.docs;
export const selectDocsIsLoading = (state) => state.docs.isLoading;
export const selectDocsError = (state) => state.docs.error;

export default combineReducers({
  docs,
  isLoading,
  error,
});
