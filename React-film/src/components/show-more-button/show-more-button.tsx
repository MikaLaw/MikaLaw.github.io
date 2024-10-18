import { FC } from 'react';
import {useAppDispatch} from '../../hooks';
import {showMoreFilms} from '../../store/films/films';


const ShowMoreButton: FC = () => {
	const dispatch = useAppDispatch();

	return (
		<div className="catalog__more">
			<button className="catalog__button" type="button" onClick={() => dispatch(showMoreFilms())}>Show more</button>
		</div>
	);
};

export default ShowMoreButton;
