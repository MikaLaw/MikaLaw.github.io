import { FC } from 'react';
import {FilmShortInfo} from '../../types/film.ts';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../consts';

type FilmCardProps = {
	film: FilmShortInfo;
}

const FilmCardSmall: FC<FilmCardProps> = ({film}) => {
	const {name, posterImage} = film;
	const navigate = useNavigate();

	const handleOpenFilmClick = () => {
		navigate(`${AppRoute.Films}/${film.id}`);
	};

	return (
		<article className="small-film-card catalog__films-card" onClick={handleOpenFilmClick}>
			<div className="small-film-card__image">
				<picture>
					<source srcSet={`${posterImage}.webp`} type="image/webp"/>
					<img src={`${posterImage}.jpg`} alt={name} width='250px' height='250px'/>
				</picture>
			</div>
			<h3 className="small-film-card__title">
				<label className="small-film-card__link">{name}</label>
			</h3>
		</article>
	);
};

export default FilmCardSmall;
