import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useGetUserQuery } from '../api/authApi';

export const ProtectedRoute: React.FC = () => {
    // Вызываем хук проверки сессии (он смотрит токен в localStorage)
    const { data: user, isLoading } = useGetUserQuery();

    // Пока RTK Query считывает данные из localStorage, показываем заглушку
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center space-y-2">
                    <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-gray-400">Проверка прав доступа...</p>
                </div>
            </div>
        );
    }

    // Если пользователя нет в системе — перенаправляем на /login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Если авторизован — Outlet отрендерит тот компонент, на который перешел пользователь
    return <Outlet />;
};