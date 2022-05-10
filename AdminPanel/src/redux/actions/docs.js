import { createAction } from "redux-actions";

export const fetchDocsRequest = createAction("FETCH_DOCS_REQUEST");
export const fetchDocsSuccess = createAction("FETCH_DOCS_SUCCES");
export const fetchDocsFailure = createAction("FETCH_DOCS_FAILURE");

export const updateDocsRequest = createAction("UPDATE_DOCS_REQUEST");
export const updateDocsSuccess = createAction("UPDATE_DOCS_SUCCES");
export const updateDocsFailure = createAction("UPDATE_DOCS_FAILURE");
