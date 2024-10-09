import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INITIAL_FILMS_COUNT, INITIAL_GENRE, Namespace} from '../../consts';
import {FilmsProcess} from '../../types/state';
import {
	fetchAllFilmsAction,
	fetchFilmAction,
	fetchSimilarFilmsAction,
	fetchPromoFilmAction,
	fetchFavoriteFilmsAction,
	fetchChangeFavoriteFilmsAction
} from '../api-action';

const initialState : FilmsProcess = {
	isLoading: false,
	films: [],
	filmsByGenre: [],
	promoFilm: null,
	selectedFilm: null,
	similarFilms: [],
	favoriteFilms: [],
	favoriteFilmsCount: 0,
	filmsCount: INITIAL_FILMS_COUNT,
	selectedGenre: INITIAL_GENRE,
	availableGenres: [],
};

export const filmsProcess = createSlice({
	name: Namespace.Films,
	initialState,
	reducers: {
		getFilms: (state) => {
			state.filmsByGenre = state.selectedGenre === INITIAL_GENRE ?
				state.films :
				state.films.filter((film) => film.genre === state.selectedGenre);
			state.filmsCount = INITIAL_FILMS_COUNT;
		},
		getPromoFilms: (state) => {
			state.filmsByGenre = state.selectedGenre === INITIAL_GENRE ?
				state.films :
				state.films.filter((film) => film.genre === state.selectedGenre);
			state.filmsCount = INITIAL_FILMS_COUNT;
		},
		showMoreFilms: (state) => {
			state.filmsCount += INITIAL_FILMS_COUNT;
		},
		changeGenre: (state, action: PayloadAction<string>) => {
			state.selectedGenre = action.payload;
		},
	},
	extraReducers: function (builder) {
		builder
			.addCase(fetchAllFilmsAction.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllFilmsAction.fulfilled, (state, action) => {
				state.films = action.payload;
				state.filmsByGenre = action.payload;
				state.availableGenres = [INITIAL_GENRE, ...new Set(action.payload.map((x) => x.genre))];
				state.isLoading = false;
			})
			.addCase(fetchFilmAction.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchFilmAction.fulfilled, (state, action) => {
				state.selectedFilm = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchSimilarFilmsAction.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
				state.similarFilms = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchPromoFilmAction.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
				state.promoFilm = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
				state.favoriteFilms = action.payload;
				state.favoriteFilmsCount = action.payload.length;
			})
			.addCase(fetchChangeFavoriteFilmsAction.fulfilled, (state, action) => {
				if (state.selectedFilm?.id === action.payload.id) {
					state.selectedFilm.isFavorite = action.payload.isFavorite;
					state.favoriteFilmsCount = action.payload.isFavorite ? state.favoriteFilmsCount + 1 : state.favoriteFilmsCount - 1;
				}
				if (state.promoFilm?.id === action.payload.id) {
					state.promoFilm.isFavorite = action.payload.isFavorite;
					state.favoriteFilmsCount = action.payload.isFavorite ? state.favoriteFilmsCount + 1 : state.favoriteFilmsCount - 1;
				}
			});
	}
});

export const {getFilms, showMoreFilms, changeGenre} = filmsProcess.actions;
