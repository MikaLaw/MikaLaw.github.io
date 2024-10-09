import { FC } from 'react';
import {Film} from '../../types/film.ts';

type FilmDetailsProps = {
	film: Film;
}

const FilmDetails:FC<FilmDetailsProps> = ({film}) => {
	const {director, starring, runTime, genre, released} = film;

	return (
		<div className="film-card__text film-card__row">
			<div className="film-card__text-col">
				<p className="film-card__details-item">
					<strong className="film-card__details-name">Автор</strong>
					<span className="film-card__details-value">{director}</span>
				</p>
				<p className="film-card__details-item">
					<strong className="film-card__details-name">В ролях</strong>
					<span className="film-card__details-value">{starring.join(', ')}</span>
				</p>
			</div>
			<div className="film-card__text-col">
				<p className="film-card__details-item">
					<strong className="film-card__details-name">Продолжительность</strong>
					<span className="film-card__details-value">{runTime}</span>
				</p>
				<p className="film-card__details-item">
					<strong className="film-card__details-name">Жанр</strong>
					<span className="film-card__details-value">{genre}</span>
				</p>
				<p className="film-card__details-item">
					<strong className="film-card__details-name">Дата релиза</strong>
					<span className="film-card__details-value">{released}</span>
				</p>
			</div>
		</div>
	);
};

export default FilmDetails;
