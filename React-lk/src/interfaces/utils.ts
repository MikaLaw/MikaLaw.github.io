import {ResponseStatus, ApiValidateError, ApiError} from "./common";

export const isApiClientError = (data: any | ApiError | ApiValidateError[], status: ResponseStatus | undefined): data is ApiError => {
	return status === ResponseStatus.BAD_REQUEST
		|| status === ResponseStatus.UNAUTHORIZED
		|| status === ResponseStatus.FORBIDDEN
		|| status === ResponseStatus.NOT_FOUND
		|| status === ResponseStatus.INTERNAL_SERVER_ERROR
}

export const isApiValidateError = (data: any | ApiError | ApiValidateError[], status: ResponseStatus | undefined): data is ApiValidateError[] => {
	return status === ResponseStatus.UNPROCESSABLE_ENTITY;
}

export const isApiError = (data: any | ApiError | ApiValidateError[], status: ResponseStatus | undefined): data is (ApiError | ApiValidateError[]) => {
	return isApiClientError(data, status) || isApiValidateError(data, status)
}

