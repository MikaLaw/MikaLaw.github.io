import { useGetCommentsByFilmIdQuery } from "@/api/commentsApi";
import type { Movie } from "@/types";
import React from 'react';

interface FilmReviewsProps {
    film: Movie;
}

export const FilmReviews: React.FC<FilmReviewsProps> = ({ film }) => {
    const { data: comments = [], isLoading } = useGetCommentsByFilmIdQuery(film.id);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    if (isLoading) {
        return <div className="text-gray-500 text-sm p-4">Загрузка отзывов...</div>;
    }

    return (
        <div className="film-card__reviews film-card__row">
            <div className="film-card__reviews-col">
                {comments.length === 0 ? (
                    <p>Отзывов к этому фильму пока нет.</p>
                ) : (
                    comments.map((review) => (
                        <div className="review" key={review.id}>
                            <blockquote className="review__quote">
                                <p className="review__text">{review.comment}</p>
                                <footer className="review__details">
                                    <cite className="review__author">{review.user}</cite>
                                    <time className="review__date" dateTime={review.date}>
                                        {formatDate(review.date)}
                                    </time>
                                </footer>
                            </blockquote>
                            <div className="review__rating">{review.rating.toFixed(1)}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};