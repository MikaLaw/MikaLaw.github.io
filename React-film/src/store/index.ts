import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseApi } from '../api/baseApi';
import { catalogSlice } from './catalogSlice';

export const store = configureStore({
    reducer: {
        catalog: catalogSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    // Обязательно добавляем middleware для кэширования, таймаутов и т.д.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();