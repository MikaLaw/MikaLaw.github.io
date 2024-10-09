import {parse} from "qs";
import {ApiError, ResponseStatus} from "../interfaces/common";
import numeral from "numeral";

export function responseDataToErrorMsg(
	{
		status,
		data,
		unknownErrorMsg = 'Request error.'
	}: {
		status: ResponseStatus,
		data: ApiError[] | ApiError,
		unknownErrorMsg?: string,
	}) {
	let errors = [];
	if (status === ResponseStatus.UNPROCESSABLE_ENTITY && Array.isArray(data)) {
		errors = data.map(item => item.message);
	} else if (data && !Array.isArray(data) && data.message) errors.push(data.message);

	if (!errors.length) errors.push(unknownErrorMsg);

	return errors.join("<br>");
}

export function getUriParam(name: string) {
	return parse(window.location.search.substr(1, window.location.search.length))[name];
}

export const getFio = (lastName: string | null, name: string | null, secondName: string | null) => {
	let result = '';

	if (lastName) {
		result += lastName + ' ';
	}

	if (name) {
		result += name + ' ';
	}

	if (secondName) {
		result += secondName + ' ';
	}

	return result;
}

export const getDateOneMinuteAdded = () => {
	return new Date(new Date().getTime() + 60 * 1000);
}

export const goToPage = (url: string) => {
	const a = document.createElement('a')
	a.href = url;
	a.target = "_blank";
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}

export const outerHeight = (el: HTMLDivElement | undefined) => {
	if (!el) return 0;

	return el.offsetHeight
		+ parseInt(window.getComputedStyle(el).marginTop)
		+ parseInt(window.getComputedStyle(el).marginBottom);
};

export function nlToBr(text: string) {
	if (text !== null && text.length > 0) {
		return text.replaceAll(/\n/g, '<br/>');
	}
	return text;
}

export const getCookieNames = (name: string) => document
	.cookie
	?.split?.('; ')
	?.filter?.((row) => row.startsWith(name))
	?.map?.((c) => c.split('=')[0]) ?? [];

export const collapsedBtnHeight = () => {
	return '53px';
};

export const formatToInputPhone = (str: string) => {
	const countryCode = str.substring(0, 2);
	const code = str.substring(2, 5);
	const middleNum = str.substring(5, 8);
	const preLastNum = str.substring(8, 10);
	const lastNum = str.substring(10, 12);

	return `${countryCode} (${code}) ${middleNum}-${preLastNum}-${lastNum}`;
};

export const getFormattedOffersCount = (count: number) => {
	return numeral(count)
		.format('0.0a')
		.replace('.', ',')
		.replace(',0', '')
		.toUpperCase();
};
