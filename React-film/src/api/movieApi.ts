import type { FavoriteMoviesResponse, Movie, MovieDetailsResponse, MoviesResponse, PromoResponse } from "../types";
import { getLocalMovies } from "../utils";
import { baseApi } from "./baseApi";

export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPromo: builder.query<PromoResponse, void>({
            queryFn: async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                const currentMovies = getLocalMovies();
                const promoMovie = currentMovies[0];
                const favoriteCount = currentMovies.filter(m => m.isFavorite).length;

                return { data: { movie: promoMovie, favoriteCount } };
            },
            providesTags: ['Movies'],
        }),

        // ИСПРАВЛЕНО: Типизация дженерика теперь соответствует возвращаемому объекту
        getFavoriteMovies: builder.query<FavoriteMoviesResponse, void>({
            queryFn: async () => {
                await new Promise((resolve) => setTimeout(resolve, 150));
                const currentMovies = getLocalMovies();
                const favorites = currentMovies.filter(m => m.isFavorite);
                const favoriteCount = favorites.length;

                return { data: { favorites, favoriteCount } };
            },
            providesTags: ['Movies'],
        }),

        getMovies: builder.query<MoviesResponse, { genre: string; limit: number }>({
            queryFn: async ({ genre, limit }) => {
                await new Promise((resolve) => setTimeout(resolve, 250));
                const currentMovies = getLocalMovies();

                const filteredByGenre = genre === 'All genres'
                    ? currentMovies
                    : currentMovies.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
                const totalCount = filteredByGenre.length;
                const sliced = filteredByGenre.slice(0, limit);

                return {
                    data: {
                        movies: sliced,
                        totalCount: totalCount
                    }
                };
            },
            providesTags: ['Movies'],
        }),

        getSimilar: builder.query<Movie[], number>({
            queryFn: async (id) => {
                await new Promise((resolve) => setTimeout(resolve, 250));
                const currentMovies = getLocalMovies();
                const film = currentMovies.find(movie => id == movie.id);
                // Безопасная проверка: если фильм не найден, возвращаем пустой массив
                if (!film) return { data: [] };

                const movies = currentMovies.filter(movie => id !== movie.id && movie.genre === film.genre).slice(0, 4);
                return { data: movies };
            },
            providesTags: ['Movies'],
        }),

        // ИСПРАВЛЕНО: movie теперь может быть Movie | null на случай неверного id в URL
        getMovieById: builder.query<MovieDetailsResponse, number>({
            queryFn: async (id) => {
                await new Promise((resolve) => setTimeout(resolve, 150));
                const currentMovies = getLocalMovies();
                const movie = currentMovies.find((m) => m.id === id);
                const favoriteCount = currentMovies.filter(m => m.isFavorite).length;

                return { data: { movie: movie ?? null, favoriteCount } };
            },
            providesTags: ['Movies'],
        }),

        getGenres: builder.query<string[], void>({
            queryFn: async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                const currentMovies = getLocalMovies();
                const uniqueGenres = ['All genres', ...new Set(currentMovies.map(m => m.genre))];

                return { data: uniqueGenres };
            }
        }),

        toggleFavorite: builder.mutation<void, number>({
            queryFn: async (movieId) => {
                const currentMovies = getLocalMovies();

                const updatedMovies = currentMovies.map(movie =>
                    movie.id === movieId
                        ? { ...movie, isFavorite: !movie.isFavorite }
                        : movie
                );

                localStorage.setItem('movies', JSON.stringify(updatedMovies));

                return { data: undefined };
            },
            invalidatesTags: ['Movies'],
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetPromoQuery,
    useGetGenresQuery,
    useGetMovieByIdQuery,
    useGetSimilarQuery,
    useToggleFavoriteMutation,
    useGetFavoriteMoviesQuery
} = movieApi;