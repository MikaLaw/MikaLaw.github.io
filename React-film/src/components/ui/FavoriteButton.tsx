import { useGetUserQuery } from '@/api/authApi';
import { useToggleFavoriteMutation } from '@/api/movieApi';
import { AppRoute } from '@/consts';
import React from 'react';
import { useNavigate } from 'react-router';

interface FavoriteButtonProps {
    id: number;
    isFavorite: boolean;
    favoriteCount: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, isFavorite, favoriteCount }) => {
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const isAuthenticated = !!user;

    const [toggleFavorite, { isLoading: isMutating }] = useToggleFavoriteMutation();

    const handleFavoriteClick = async () => {
        if (!isAuthenticated) {
            navigate(AppRoute.Login);
            return;
        }

        try {
            await toggleFavorite(id).unwrap();
        } catch (error) {
            console.error('Не удалось изменить статус избранного:', error);
        }
    };

    return (
        <button
            className="btn btn--list film-card__button"
            type="button"
            onClick={handleFavoriteClick}
            disabled={isMutating}
        >
            {isFavorite ? (
                <>
                    <svg width="18px" height="14px" viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.11 11.66L1.83 7.38L0.41 8.79L6.11 14.49L17.59 3.01L16.17 1.6L6.11 11.66Z" fill="#FFFFFF" />
                    </svg>
                    <span>В избранном</span>
                </>
            ) : (
                <>
                    <svg width="19px" height="20px" viewBox="0 0 19 20" xmlns="http://www.w3.org/2000/svg">
                        <polygon fill="#FFFFFF" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"></polygon>
                    </svg>
                    <span>Добавить в Избранное</span>
                </>
            )}

            <span className="film-card__count">{favoriteCount}</span>
        </button>
    );
};