import {Response} from "../interfaces/common";
import {isApiValidateError} from "../interfaces/utils";
import {FormItemProps} from "antd";
import {UploadFile} from "antd/lib/upload/interface";
import moment from 'moment';

export function responseDataToFormErrors(params: Response<any> & {
	registeredFields: (string | RegExp)[];
	commonErrorMsg?: string;
	unknownErrorMsg?: string;
}){
	const {
		status,
		data,
		registeredFields,
		commonErrorMsg = 'The form contains errors',
		unknownErrorMsg = 'Request error.'
	} = params;
	const errors: Record<string, string> = {};

	function insertError(field: string, message: string){
		if(!errors[field]) errors[field] = message;
		else errors[field] += ' ' + message;
	}

	if(isApiValidateError(data, status))
	{
		const commonErrors = [];

		if(commonErrorMsg) commonErrors.push(commonErrorMsg);

		data.forEach(item => {
			if(registeredFields && Array.isArray(registeredFields) && registeredFields.length > 0)
			{
				if(registeredFields.indexOf(item.field) !== -1) insertError(item.field, item.message);
				else
				{
					const matchRegistered = (registeredFields as RegExp[]).find(field => {
						return field.test && field.test(item.field);
					});
					if(matchRegistered) insertError(item.field, item.message);
					else commonErrors.push(item.message)
				}
			} else insertError(item.field, item.message);
		})

		if(commonErrors.length) errors._error = commonErrors.join('<br/>');
	} else if(data && data.message) errors._error = data.message;

	if(!Object.keys(errors).length) errors._error = unknownErrorMsg;

	return errors;
}

export function getFieldAsyncPropsCreator(errors: Record<string, string>){
	return (fieldName: string, options ?: {isHelpText?: boolean}) => {
		const props: {
			validateStatus?: FormItemProps['validateStatus'],
			help?: FormItemProps['help'],
		} = {};
		if(errors && typeof errors === "object" && typeof errors[fieldName] !== "undefined")
		{
			props.validateStatus = 'error';

			if(options?.isHelpText)
			{
				props.help = errors[fieldName];
			}
		}
		return props;
	}
}

export function normalizeFileForRest(fileList: UploadFile[]){
	return fileList?.[0]?.originFileObj || null
}

export function normalizeFilesForRest(files: UploadFile[]){
	if(!files || !files.length) return null;

	return files.map((f) => f.originFileObj).filter(f => f)
}

export function normalizeDateForRest(date: moment.Moment | null | undefined, fmt?: string){
	if(!date) return null;

	return moment(date).format(fmt ?? 'YYYY-MM-DD')
}

export const normalizeFile = (e: any) => {
	if(Array.isArray(e))
	{
		return e;
	}
	return e && e.fileList;
}

export function normalizeArrayForRest(array: any[], cbItem?: (item: any, index: number) => void){
	if(!Array.isArray(array)) return null;

	return array.reduce((result, item, index) => {
		result[index] = cbItem ? cbItem(item, index):item;
		return result;
	}, {});
}
