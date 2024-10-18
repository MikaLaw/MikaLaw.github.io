import {store} from '../store';
import {Film, FilmPromo, Films} from './film';
import {ReviewShort} from './review';
import {AuthorizationStatus} from '../consts';
import {UserData} from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type FilmsProcess = {
	selectedGenre: string;
	films: Films;
	filmsCount: number;
	filmsByGenre: Films;
	selectedFilm: Film | null;
	similarFilms: Films;
	favoriteFilms: Films;
	favoriteFilmsCount: number;
	promoFilm: FilmPromo | null;
	isLoading: boolean;
	availableGenres: string[];
}

export type ReviewProcess = {
	reviews: ReviewShort;
}

export type UserProcess = {
	authorizationStatus: AuthorizationStatus;
	authorizationStatusLoading: boolean;
	user: UserData | null;
}
