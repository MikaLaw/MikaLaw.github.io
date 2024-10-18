import { FC } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchReviewsAction} from '../../store/api-action';
import {getFilm} from '../../store/films/selectors';
import {getReviews} from '../../store/review/selectors';

const FilmReviews: FC = () => {
	const dispatch = useAppDispatch();
	const selectedFilm = useAppSelector(getFilm);
	const reviews = useAppSelector(getReviews);
	const {comments} = reviews;

	useEffect(() => {
		dispatch(fetchReviewsAction(selectedFilm?.id));
	}, [dispatch, selectedFilm]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
	};

	return (
		<div className="film-card__reviews film-card__row">
			<div className="film-card__reviews-col">
				{comments.map((review) => (
					<div className="review" key={review.id}>
						<blockquote className="review__quote">
							<p className="review__text">{review.comment}</p>
							<footer className="review__details">
								<cite className="review__author">{review.user}</cite>
								<time className="review__date" dateTime={review.date}>{formatDate(review.date)}</time>
							</footer>
						</blockquote>
						<div className="review__rating">{review.rating}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FilmReviews;
