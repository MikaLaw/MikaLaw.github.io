export const INITIAL_GENRE = 'Все жанры';
export const INITIAL_FILMS_COUNT = 8;
export const SIMILAR_FILMS_COUNT = 4;

export enum Namespace {
	User = 'USER',
	Films = 'FILMS',
	Review = 'REVIEW',
}

export enum AppRoute {
	Login = '/React-film/build/login',
	Logout = '/React-film/build/logout',
	Root = '/React-film/build/',
	MyList = '/React-film/build/mylist',
	Films = '/React-film/build/films',
	Review = '/React-film/build/review',
	User = '/React-film/build/user',
	NotFound = '*',
}

export enum Tab {
	Overview = 'Overview',
	Details = 'Details',
	Reviews = 'Reviews',
}

export enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

