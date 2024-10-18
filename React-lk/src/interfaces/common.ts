import {ValuesType} from "utility-types";
import store from "../redux/store";
import {xPaginationKeyToVal} from "../restApi";

export interface PharmacyShort {
	guid: string;
	town: string | null;
	townType: string | null;
	address: string | null;
}

export enum SortedDirectionEnum {
	DESCEND = 'descend',
	ASCEND = 'ascend'
}

export enum SearchMode {
	EQUAL = 'equal',
	LIKE = 'like'
}

export interface SortEntity {
	isSorted: boolean;
	sortedDirection: SortedDirectionEnum;
	values: {
		ascend: string;
		descend: string;
	}
}

export interface TableColumn {
	filterKey: string;
	key: string;
	sort: SortEntity | null;
	title: string;
	extraFilterKeys: any[];
	isHidden: boolean;
	fixed: 'right' | 'left' | null,
}

export interface Pagination {
	currentPage: number;
	limits: number[];
	pageCount: number;
	perPage: number;
	totalCount: number;
}

export enum FilterType {
	CHECKBOX = 'checkbox',
	SEARCH = 'search',
	NUMBER = 'number',
	DATE = 'date',
	SELECT = 'select',
	SELECT_WITH_SEARCH = 'selectWithSearch',
}

export interface FilterOption {
	label: string;
	value: string;
}

export interface FilterOptionObject {
	url?: string;
	termParam?: string;
}

export interface FilterSelect<GFSelect> {
	select: GFSelect;
	title: string;
	fromPlaceholder?: string;

	date?: string;
	from?: string;
	to?: string;
	number?: string;
}

export interface FilterTable<GFSelect = string> {
	columnKey: string;
	isMultiple: boolean;
	key: string;
	select?: FilterSelect<GFSelect>[];
	title: string;
	type: FilterType;
	values: null | any[];
	options?: FilterOption[] | FilterOptionObject;
	searchMode?: SearchMode;
	selectedOptions?: any[];
	showInTags: boolean;
}

export interface ApiValidateError {
	message: string;
	field: string;
}

export interface ApiError {
	message: string;
}

export type Response<Data> = {
	data: Data;
	status: ResponseStatus.OK | ResponseStatus.CREATED;
	statusText: string;
	pagination?: PaginationKeyToValues;
} | {
	data: ApiValidateError[] | ApiError;
	status: ResponseStatus.UNPROCESSABLE_ENTITY;
	statusText: string;
	pagination?: PaginationKeyToValues;
} | {
	data: ApiError;
	status: ResponseStatus.BAD_REQUEST | ResponseStatus.UNAUTHORIZED | ResponseStatus.FORBIDDEN | ResponseStatus.NOT_FOUND | ResponseStatus.INTERNAL_SERVER_ERROR | ResponseStatus.BAD_GATEWAY | ResponseStatus.GATEWAY_TIME_OUT;
	statusText: string;
	pagination?: PaginationKeyToValues;
}

export type PaginationKeyToValues = Record<ValuesType<typeof xPaginationKeyToVal>, string>

export enum ResponseStatus {
	"OK" = 200,
	"CREATED" = 201,
	"BAD_REQUEST" = 400,
	"UNAUTHORIZED" = 401,
	"FORBIDDEN" = 403,
	"NOT_FOUND" = 404,
	"UNPROCESSABLE_ENTITY" = 422,
	"INTERNAL_SERVER_ERROR" = 500,
	"BAD_GATEWAY" = 502,
	"GATEWAY_TIME_OUT" = 504,
	"NO_CONTENT" = 204,
}

export interface TableConfig {
	exportCodes: string[] | null;
	exportParam: string | null;
	columnIdKey: string;
	filterParam: string;
	pageParam: string;
	pageSizeParam: string;
	sortParam: string;
	tableId: string;
}

export type RootState = ReturnType<typeof store.getState>;

export enum Colors {
	BRAND_1 = '#76C0B3',
	BRAND_2 = '#008696',
	BRAND_3 = '#FD4E66',
	SUPPORT_WARNING = '#FAAD14',
	APTEKA_1 = '#1C257B',
	TELEGRAM = '#229ED9',
	WHATS_APP = '#25D366'
}

