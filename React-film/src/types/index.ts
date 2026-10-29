export interface Movie {
    id: number;
    backgroundImage: string;
    posterImage: string;
    name: string;
    genre: string;
    subgenere: string;
    released: number | string;
    rating: number;
    scoresCount: number;
    description: string;
    director: string;
    starring: string[];
    runTime: string;
    isFavorite: boolean;
}

export interface MoviesResponse {
    movies: Movie[];
    totalCount: number; // Общее количество фильмов в выбранном жанре
}

export interface User {
    id: number;
    email: string;
    name: string;
    avatarUrl: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface Comment {
    id: string | number;
    user: string;
    date: string;
    rating: number;
    comment: string;
}

export interface Comments {
    filmId: number;
    comments: Comment[];
}

export interface PromoResponse {
    movie: Movie;
    favoriteCount: number;
}

export interface FavoriteMoviesResponse {
    favorites: Movie[];
    favoriteCount: number;
}

export interface MovieDetailsResponse {
    movie: Movie | null;
    favoriteCount: number;
}

export interface CatalogState {
    selectedGenre: string;
    visibleCount: number;
}