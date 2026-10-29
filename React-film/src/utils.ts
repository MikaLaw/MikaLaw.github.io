import moviesData from './data/movies.json';
import commentsData from './data/reviews.json';
import type { Comments, Movie } from './types';

export const getLocalMovies = (): Movie[] => {
    const saved = localStorage.getItem('movies');
    if (saved) {
        return JSON.parse(saved) as Movie[];
    }
    localStorage.setItem('movies', JSON.stringify(moviesData));
    return moviesData as Movie[];
};

export const getLocalComments = (): Comments[] => {
    const saved = localStorage.getItem('comments');
    if (saved) {
        return JSON.parse(saved) as Comments[];
    }
    localStorage.setItem('comments', JSON.stringify(commentsData));
    return commentsData as Comments[];
};

export const getImageUrl = (name: string, ext: string) => {
    return new URL(`/src/assets/${name}.${ext}`, import.meta.url).href;
};
