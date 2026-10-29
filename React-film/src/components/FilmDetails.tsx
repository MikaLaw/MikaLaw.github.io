import type { Movie } from "@/types";
import React from 'react';

interface FilmDetailsProps {
    film: Movie;
}

export const FilmDetails: React.FC<FilmDetailsProps> = ({ film }) => {
    const { director, starring = [], runTime, genre, released } = film;
    const leftColumnItems = [
        { label: 'Режиссер', value: director },
        { label: 'В ролях', value: starring.length > 0 ? starring.join(', ') : 'Нет данных' },
    ];
    const rightColumnItems = [
        { label: 'Продолжительность', value: runTime },
        { label: 'Жанр', value: genre },
        { label: 'Дата релиза', value: released },
    ];

    return (
        <div className="film-card__text film-card__row">
            <div className="film-card__text-col">
                {leftColumnItems.map(({ label, value }) => (
                    <p key={label} className="film-card__details-item">
                        <strong className="film-card__details-name">{label}</strong>
                        <span className="film-card__details-value">{value}</span>
                    </p>
                ))}
            </div>
            <div className="film-card__text-col">
                {rightColumnItems.map(({ label, value }) => (
                    <p key={label} className="film-card__details-item">
                        <strong className="film-card__details-name">{label}</strong>
                        <span className="film-card__details-value">{value}</span>
                    </p>
                ))}
            </div>
        </div>
    );
};