import { Picture } from "@/components/ui/Picture";
import { AppRoute } from "@/consts";
import type { Movie } from "@/types";
import React from 'react';
import { Link } from 'react-router';

// Описываем интерфейс пропсов
interface MovieCardProps {
    film: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ film }) => {
    const { id, name, posterImage } = film;

    return (
        <Link
            to={`${AppRoute.Films}/${id}`}
            className="small-film-card catalog__films-card"
        >
            <article>
                <div className="small-film-card__image">
                    <Picture bg={posterImage} name={name} />
                </div>
                <h3 className="small-film-card__title">
                    <span className="small-film-card__link">{name}</span>
                </h3>
            </article>
        </Link>
    );
};