import { FC } from 'react';
import {Film} from '../../types/film.ts';

type FilmOverviewProps = {
	film: Film;
}

const FilmOverview: FC<FilmOverviewProps> = ({film}) => {
	const {rating, scoresCount, description, director, starring} = film;

	const ratingFilm = () => {
		if (rating >= 0 && rating < 3) {
			return 'Bad';
		}
		if (rating >= 3 && rating < 5) {
			return 'Normal';
		}
		if (rating >= 5 && rating < 8) {
			return 'Good';
		}
		if (rating >= 8 && rating < 10) {
			return 'Very good';
		}
		if (rating === 10) {
			return 'Awesome';
		}
	};

	return (
		<>
			<div className="film-rating">
				<div className="film-rating__score">{rating.toFixed(1)}</div>
				<p className="film-rating__meta">
					<span className="film-rating__level">{ratingFilm()}</span>
					<span className="film-rating__count">{scoresCount}</span>
				</p>
			</div>
			<div className="film-card__text">
				{description}
				<p className="film-card__director"><strong>{`Автор: ${director}`}</strong></p>
				<p className="film-card__starring"><strong>{`В ролях: ${starring.join(' ')}`}</strong></p>
			</div>
		</>
	);
};

export default FilmOverview;
