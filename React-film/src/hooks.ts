import { useSyncExternalStore } from 'react';

export const useMatchMedia = (mediaQueryString: string): boolean => {
    const query = window.matchMedia(mediaQueryString);
    return useSyncExternalStore(
        (callback) => {
            query.addEventListener('change', callback);
            return () => query.removeEventListener('change', callback);
        },
        () => query.matches,
        () => false
    );
};

export const useIsDesktop = () => useMatchMedia('(min-width: 768px)');