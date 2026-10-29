import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_FILMS_COUNT } from '../consts';
import type { CatalogState } from '../types';

const initialState: CatalogState = {
    selectedGenre: 'All genres',
    visibleCount: INITIAL_FILMS_COUNT,
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setGenre: (state, action: PayloadAction<string>) => {
            state.selectedGenre = action.payload;
            state.visibleCount = INITIAL_FILMS_COUNT;
        },
        showMore: (state) => {
            state.visibleCount += INITIAL_FILMS_COUNT;
        },
    },
});

export const { setGenre, showMore } = catalogSlice.actions;