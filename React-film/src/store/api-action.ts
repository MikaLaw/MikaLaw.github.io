import {AxiosInstance} from 'axios';
import { nanoid } from 'nanoid';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthData} from '../types/auth';
import {UserData, UserAuthData} from '../types/user-data';
import {Films, Film, FilmsToSingle} from '../types/film';
import {AppDispatch, State} from '../types/state';
import {Reviews, ReviewShort} from '../types/review';
import {AppRoute} from '../consts';
import {dropToken, saveToken, getUser, saveUser, dropUser} from '../services/token';
import {redirectToRoute} from './action.ts';

export const checkAuthAction = createAsyncThunk<
	UserData | null,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>
(
	'user/checkAuth',
	() => {
		const loginUser = getUser();
		return loginUser;
	},
);

export const loginAction = createAsyncThunk<
	UserData,
	AuthData,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'user/login',
	async ({login: email, password}, {dispatch, extra: api}) => {
		const {data} = await api.get<UserAuthData>('/login.json',{params: {email, password}});
		const {token, user} = data;
		saveToken(token);
		saveUser(user);
		dispatch(redirectToRoute(AppRoute.Root));
		return user;
	},
);

export const logoutAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'user/logout',
	async (_arg, {extra: api}) => {
		await api.get('/login.json');
		dropToken();
		dropUser();
	},
);

export const fetchAllFilmsAction = createAsyncThunk<
	Films,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchFilms',
	async (_arg, {extra: api}) => {
		const dataFromStorage = localStorage.getItem('films');
		if (dataFromStorage) {
			const data = JSON.parse(dataFromStorage) as Films;
			return data;
		} else {
			const {data} = await api.get<Films>('/films.json');
			localStorage.setItem('films', JSON.stringify(data));
			return data;
		}
	},
);

export const fetchFilmAction = createAsyncThunk<
	Film | null,
	string | undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchFilm',
	async (filmId, {extra: api}) => {
		if (filmId === undefined) {
			return null;
		}
		const dataFromStorage = localStorage.getItem('films');
		if (dataFromStorage) {
			const data = JSON.parse(dataFromStorage) as FilmsToSingle;
			const dataFilm: Film[] = data.filter((film) => +film.id === +filmId);
			const singleFilm = dataFilm[0];
			return singleFilm;
		} else {
			const {data} = await api.get<FilmsToSingle>('/films.json');
			localStorage.setItem('films', JSON.stringify(data));
			const dataFilm: Film[] = data.filter((film) => +film.id === +filmId);
			const singleFilm = dataFilm[0];
			return singleFilm;
		}
	},
);

export const fetchFavoriteFilmsAction = createAsyncThunk<
	Films,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchFavoriteFilm',
	async (_arg, {extra: api}) => {
		const dataFromStorage = localStorage.getItem('films') ;
		if (dataFromStorage) {
			const data = JSON.parse(dataFromStorage) as Films;
			const dataFilms = data.filter((film) => film.isFavorite);
			return dataFilms;
		} else {
			const {data} = await api.get<Films>('/films.json');
			localStorage.setItem('films', JSON.stringify(data));
			const dataFilms = data.filter((film) => film.isFavorite);
			return dataFilms;
		}
	},
);

export const fetchChangeFavoriteFilmsAction = createAsyncThunk<
	Film,
	{ id: string; isFavorite : boolean},
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchChangeFavoriteFilm',
	async ({id, isFavorite}, {extra: api}) => {
		const dataFromStorage = localStorage.getItem('films');
		if (dataFromStorage) {
			const dataFilms = JSON.parse(dataFromStorage) as FilmsToSingle;
			const modifyFilm: Film = {...dataFilms.filter((film) => +film.id === +id)[0], isFavorite: isFavorite};
			const newFilms = dataFilms.map((film) => (film.id === id ? modifyFilm : film));
			localStorage.setItem('films', JSON.stringify(newFilms));
			return modifyFilm;
		} else {
			const {data} = await api.get<FilmsToSingle>('/films.json');
			const modifyFilm = {...data.filter((film) => +film.id === +id)[0], isFavorite: isFavorite};
			const newFilms = data.map((film) => (film.id === id ? modifyFilm : film));
			localStorage.setItem('films', JSON.stringify(newFilms));
			return modifyFilm;
		}
	},
);

export const fetchSimilarFilmsAction = createAsyncThunk<
	Films,
	string | undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchSimilarFilms',
	async (filmId, {extra: api}) => {
		if (filmId === undefined) {
			return [];
		}
		const dataFromStorage = localStorage.getItem('films');
		if (dataFromStorage) {
			const data = JSON.parse(dataFromStorage) as Films;
			const filmData = data.filter((film) => +film.id === +filmId)[0];
			const dataFilms = data.filter((film) => film.genre === filmData.genre);
			return dataFilms;
		} else {
			const {data} = await api.get<Films>('/films.json');
			localStorage.setItem('films', JSON.stringify(data));
			const filmData = data.filter((film) => +film.id === +filmId)[0];
			const dataFilms = data.filter((film) => film.genre === filmData.genre);
			return dataFilms;
		}
	},
);

export const fetchPromoFilmAction = createAsyncThunk<
	Film,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchPromo',
	async (_arg, {extra: api}) => {
		const dataFromStorage = localStorage.getItem('films');
		if (dataFromStorage) {
			const data = JSON.parse(dataFromStorage) as FilmsToSingle;
			const dataFilm = data[0];
			return dataFilm;
		} else {
			const {data} = await api.get<FilmsToSingle>('/films.json');
			localStorage.setItem('films', JSON.stringify(data));
			const dataFilm = data[0];
			return dataFilm;
		}
	},
);

export const fetchReviewsAction = createAsyncThunk<
	Reviews,
	string | undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchReviews',
	async (filmId, {extra: api}) => {
		if (filmId === undefined) {
			return [];
		} else {
			const dataFromStorage = localStorage.getItem('reviews');
			if (dataFromStorage) {
				const dataReviews = JSON.parse(dataFromStorage) as Reviews;
				const dataReview = dataReviews.filter((review) => +review.filmId === +filmId);
				return dataReview;
			} else {
				const {data} = await api.get<Reviews>('/reviews.json');
				localStorage.setItem('reviews', JSON.stringify(data));
				const dataReview = data.filter((review) => +review.filmId === +filmId);
				return dataReview;
			}
		}
	},
);

export const fetchAddReviewAction = createAsyncThunk<
	void,
	{
		filmId: string | undefined;
		comment : string;
		rating : number;
		user: string;
		date: Date;
	},
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>(
	'data/fetchAddReview',
	async ({ filmId, comment, rating, user, date }, { dispatch, extra: api }) => {
		if (filmId === undefined) {
			return;
		}
		const dataFromStorage = localStorage.getItem('reviews');
		if (dataFromStorage) {
			const dataReviews = JSON.parse(dataFromStorage) as Reviews;
			const modifyFilmReviews = dataReviews.filter((filmReviews) => +filmReviews.filmId === +filmId)[0];
			const newreviewId = nanoid();
			const newReview = {...modifyFilmReviews, comments: [...modifyFilmReviews.comments, {id: newreviewId, user, date, rating, comment}]} as ReviewShort;
			const newReviews = dataReviews.map((film) => +film.filmId === +filmId ? newReview : film);
			localStorage.setItem('reviews', JSON.stringify(newReviews));
		} else {
			const {data} = await api.get<Reviews>('/reviews.json');
			localStorage.setItem('reviews', JSON.stringify(data));
		}
		dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
	},
);
