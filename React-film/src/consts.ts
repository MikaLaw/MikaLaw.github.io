export const INITIAL_GENRE = 'All genres'; // Приведено в соответствие с JSON (или 'Все жанры', если JSON на русском)
export const INITIAL_FILMS_COUNT = 8;
export const SIMILAR_FILMS_COUNT = 4;

export const AppRoute = {
    Root: '/',
    Login: '/login',
    Logout: '/logout',
    MyList: '/mylist',
    Films: '/films',
    Review: '/review',
    User: '/user',
    NotFound: '*',
} as const;

export const Tab = {
    Overview: 'Overview',
    Details: 'Details',
    Reviews: 'Reviews',
} as const;

// Генерируем чистые типы на основе констант
export type AppRoute = typeof AppRoute[keyof typeof AppRoute];
export type Tab = typeof Tab[keyof typeof Tab];