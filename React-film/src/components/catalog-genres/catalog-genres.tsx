import { FC, useState } from 'react';
import cn from 'classnames';
import {useAppDispatch} from '../../hooks';
import {changeGenre} from '../../store/films/films';
import {useWindowSize} from '../../hooks';

type CatalogGenresProps = {
	genres: string[];
	selectedGenre: string;
}

const CatalogGenres: FC<CatalogGenresProps> = ({genres, selectedGenre}) => {
	const dispatch = useAppDispatch();
	const [selectedOpt, setSelectedOpt] = useState('');
	const {width} = useWindowSize();

	return (
		<>
			<h2 className="catalog__title visually-hidden">Catalog</h2>
			{
				width > 768 ? (
					<ul className="catalog__genres-list">
						{genres.slice(0, 10).map((genre) => (
							<li key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': genre === selectedGenre})}>
								<button className="catalog__genres-link" onClick={() => dispatch(changeGenre(genre))}>{genre}</button>
							</li>
						))}
					</ul>
				) : (
					<select
						className="catalog__genres-list catalog__genres-list_select"
						value={selectedOpt}
						onChange={(e) => {
							dispatch(changeGenre(e.target.value));
							setSelectedOpt(e.target.value);
						}}
					>
						{genres.slice(0, 10).map((genre) => (
							<option key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': genre === selectedGenre})} value={genre}>
								<span className="catalog__genres-link">{genre}</span>
							</option>
						))}
					</select>
				)
			}
		</>
	);
};

export default CatalogGenres;
