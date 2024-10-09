import {useCallback, useState} from "react";
import {getFieldAsyncPropsCreator, responseDataToFormErrors} from "../tools/formTools";
import {Response} from "../interfaces/common";

const useFormErrors = (registeredFields: (string | RegExp)[]) => {
	const [errors, setErrors] = useState({});

	const getFieldAsyncProps = useCallback((fieldName, options?: {isHelpText?: boolean}) =>
		getFieldAsyncPropsCreator(errors)(fieldName, options), [errors]);

	const setErrorsByRestResponse = (response: Response<any>) => {
		setErrors(responseDataToFormErrors({
			...response,
			registeredFields
		}));
	}

	const setGeneralError = (error: string | null, clearAll = true) => {
		if(clearAll) setErrors({_error: error});
		else setErrors({...errors, _error: error});
	}

	const clearGeneralError = () => {
		setGeneralError(null, false);
	}

	const clearErrors = () => {
		setErrors({});
	}

	const removeErrors = (keys: string[]) => {
		if(Array.isArray(keys) && Object.keys(errors).length > 0)
		{
			let modified = false;
			let newErrors: Record<string, string> | null = {...errors};
			keys.forEach(key => {
				if(newErrors && typeof newErrors[key] !== "undefined")
				{
					delete newErrors[key];
					modified = true;
				}
			});
			if(modified)
			{
				setErrors(newErrors);
			} else newErrors = null;
		}
	}

	return {
		errors,
		errorsManage: {
			setErrorsByRestResponse,
			setGeneralError,
			clearErrors,
			removeErrors,
			clearGeneralError,
		},
		getFieldAsyncProps
	};
}

export default useFormErrors;
