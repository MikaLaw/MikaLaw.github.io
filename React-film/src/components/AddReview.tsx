import { useGetUserQuery } from "@/api/authApi";
import { useAddCommentMutation } from "@/api/commentsApi";
import React, { useState } from "react";
import { useParams } from "react-router";

export const AddReview = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);

    const [text, setText] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const { data: user } = useGetUserQuery();
    const [addComment, { isLoading: isSendingReview }] = useAddCommentMutation();
    const isFormInvalid = text.length < 50 || text.length > 400 || rating === 0;

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormInvalid || !user) return;

        try {
            await addComment({
                filmId: movieId,
                text: text,
                rating: rating,
                userName: user.name
            }).unwrap();

            setText('');
            setRating(0);
        } catch (err) {
            console.error('Не удалось отправить отзыв:', err);
        }
    };

    return (
        <div className="add-review">
            <form className="add-review__form" onSubmit={handleReviewSubmit}>
                <div className="rating">
                    <div className="rating__stars">
                        {Array.from({ length: 10 }).map((_, index) => {
                            const starValue = 10 - index;

                            return (
                                <React.Fragment key={starValue}>
                                    <input
                                        className="rating__input"
                                        id={`star-${starValue}`}
                                        type="radio"
                                        name="rating"
                                        value={starValue} // ИСПРАВЛЕНО: Передаем фиксированное значение звезды
                                        checked={rating === starValue}
                                        disabled={isSendingReview} // ИСПРАВЛЕНО: Авто-блокировка от RTK Query
                                        onChange={() => setRating(starValue)}
                                    />
                                    <label className="rating__label" htmlFor={`star-${starValue}`}>
                                        Rating {starValue}
                                    </label>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                <div className="add-review__text">
                    <textarea
                        className="add-review__textarea"
                        name="review-text"
                        id="review-text"
                        placeholder="Текст отзыва (минимум 50 символов)"
                        disabled={isSendingReview}
                        value={text}
                        onChange={(evt) => setText(evt.target.value)}
                    />
                    <div className="add-review__submit">
                        <button
                            className="add-review__btn"
                            type="submit"
                            disabled={isSendingReview || isFormInvalid}
                        >
                            {isSendingReview ? 'Отправка...' : 'Запостить'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};