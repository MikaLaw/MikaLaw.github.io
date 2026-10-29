import loginData from '../data/user.json';
import type { AuthResponse, User } from "../types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Проверка сессии при старте приложения
        getUser: builder.query<User | null, void>({
            queryFn: async () => {
                const token = localStorage.getItem('token');
                const savedUser = localStorage.getItem('user');

                if (!token || !savedUser) {
                    return { data: null };
                }

                await new Promise((resolve) => setTimeout(resolve, 150));

                return { data: JSON.parse(savedUser) as User };
            },
            providesTags: ['User'],
        }),

        // 2. Логин: Теперь принимает объект, подготавливая архитектуру к реальному серверу
        login: builder.mutation<AuthResponse, { email: string; password: Required<string> }>({
            queryFn: async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                const data = loginData as AuthResponse;

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                return { data };
            },
            invalidatesTags: ['User'],
        }),

        // 3. Выход из системы с очисткой данных
        logoutAction: builder.mutation<void, void>({
            queryFn: async () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                return { data: undefined };
            },
            invalidatesTags: ['User'],
        }),
    }),
});

// ИСПРАВЛЕНО: Чистый и аккуратный экспорт хуков без синтаксических ошибок
export const { useLoginMutation, useLogoutActionMutation, useGetUserQuery } = authApi;