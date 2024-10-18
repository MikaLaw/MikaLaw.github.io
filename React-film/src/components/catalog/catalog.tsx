import { FC } from 'react';
import FilmCardSmall from '../film-card-small/film-card-small';
import {Films} from '../../types/film';

type FilmsCatalogProps = {
	films: Films;
	filmsCount: number;
}

const Catalog: FC<FilmsCatalogProps> = ({films, filmsCount}) => {
	const count = filmsCount;

	return (
		<div className="catalog__films-list">
			{films.slice(0, count).map((film) => (
				<FilmCardSmall key={film.id} film={film}/>
			))}
		</div>
	);
};

export default Catalog;
