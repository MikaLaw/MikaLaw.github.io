import type { Movie } from "@/types";
import React from 'react';

interface FilmOverviewProps {
    film: Movie;
}

const RATING_LEVELS = [
    { min: 10, label: 'Awesome' },
    { min: 8, label: 'Very good' },
    { min: 5, label: 'Good' },
    { min: 3, label: 'Normal' },
    { min: 0, label: 'Bad' },
];

const getRatingLevel = (rating: number): string => {
    const level = RATING_LEVELS.find((item) => rating >= item.min);
    return level ? level.label : 'Unknown';
};

export const FilmOverview: React.FC<FilmOverviewProps> = ({ film }) => {
    const { rating, scoresCount, description, director, starring = [] } = film;

    return (
        <>
            <div className="film-rating">
                <div className="film-rating__score">{rating.toFixed(1)}</div>
                <p className="film-rating__meta">
                    <span className="film-rating__level">{getRatingLevel(rating)}</span>
                    <span className="film-rating__count">
                        {scoresCount.toLocaleString()} оценок
                    </span>
                </p>
            </div>

            <div className="film-card__text">
                <p className="film-card__description">{description}</p>
                <p className="film-card__director">
                    <strong>Режиссер: {director}</strong>
                </p>
                <p className="film-card__starring">
                    <strong>В ролях: {starring.length > 0 ? starring.join(', ') : 'Нет данных'}</strong>
                </p>
            </div>
        </>
    );
};