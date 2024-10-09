import {Namespace} from '../../consts.ts';
import {State} from '../../types/state';
import {Films, Film, FilmPromo} from '../../types/film.ts';

export const getLoadingStatus = (state: State): boolean => state[Namespace.Films].isLoading;
export const getGenre = (state: State): string => state[Namespace.Films].selectedGenre;
export const getAvailableGenres = (state: State): string[] => state[Namespace.Films].availableGenres;
export const getFilmsByGenre = (state: State): Films => state[Namespace.Films].filmsByGenre;
export const getFilmsCount = (state: State): number => state[Namespace.Films].filmsCount;
export const getFilm = (state: State): Film | null => state[Namespace.Films].selectedFilm;
export const getSimilarFilms = (state: State): Films => state[Namespace.Films].similarFilms;
export const getPromoFilm = (state: State): FilmPromo | null => state[Namespace.Films].promoFilm;
export const getFavoriteFilmsCount = (state: State): number => state[Namespace.Films].favoriteFilmsCount;
export const getFavoriteFilms = (state: State): Films => state[Namespace.Films].favoriteFilms;
