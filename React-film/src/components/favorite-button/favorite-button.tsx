import { FC, useEffect } from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {AuthorizationStatus} from '../../consts';
import {FilmPromo} from '../../types/film';
import {fetchChangeFavoriteFilmsAction, fetchFavoriteFilmsAction} from '../../store/api-action';
import {getFavoriteFilmsCount} from '../../store/films/selectors';
type FavoriteButtonProps = {
	film: FilmPromo;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({film}) => {
	const dispatch = useAppDispatch();
	const authStatus = useAppSelector(getAuthorizationStatus);
	const {id, isFavorite} = film;
	const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);

	const handleChangeFilmStatus = () => {
		dispatch(fetchChangeFavoriteFilmsAction({id, isFavorite: !isFavorite}));
	};

	useEffect(() => {
		dispatch(fetchFavoriteFilmsAction());
	}, [dispatch, favoriteFilmsCount]);

	return (
		<button className="btn btn--list film-card__button" type="button" onClick={handleChangeFilmStatus}>
			<svg viewBox="0 0 19 20" width="19" height="20">
				<use xlinkHref="#add"></use>
			</svg>
			<span>Добавить в Избранное</span>
			<span className="film-card__count">{authStatus === AuthorizationStatus.Auth ? favoriteFilmsCount : 0}</span>
		</button>
	);
};

export default FavoriteButton;
