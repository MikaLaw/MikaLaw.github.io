import { FC, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import Spinner from '../../components/spinner/spinner';
import NotFoundError from '../../components/errors/not-found-error';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-action';
import {
	getFilm,
	getSimilarFilms,
	getLoadingStatus
} from '../../store/films/selectors';
import Tabs from '../../components/tabs/tabs';
import {AppRoute, AuthorizationStatus, SIMILAR_FILMS_COUNT} from '../../consts';
import {getAuthorizationStatus} from '../../store/user/selectors';

const FilmPage:FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const film = useAppSelector(getFilm);
	const similarFilms = useAppSelector(getSimilarFilms);
	const isLoading = useAppSelector(getLoadingStatus);
	const status = useAppSelector(getAuthorizationStatus);

	useEffect(() => {
		dispatch(fetchFilmAction(params.id));
		dispatch(fetchSimilarFilmsAction(params.id));
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}, [dispatch, params.id]);

	if (isLoading) {
		return (<Spinner/>);
	}

	if (film) {
		const {	name, posterImage, backgroundImage, genre, released } = film;

		return (
			<>
				<section className="film-card film-card--full">
					<div className="film-card__hero">
						<div className="film-card__bg">
							<picture>
								<source srcSet={`${backgroundImage}.webp`} type="image/webp"/>
								<img src={`${backgroundImage}.jpg`} alt={name}/>
							</picture>
						</div>
						<h1 className="visually-hidden">WTW</h1>
						<header className="page-header film-card__head">
							<Logo />
							<User />
						</header>
						<div className="film-card__wrap">
							<div className="film-card__desc">
								<h2 className="film-card__title">{name}</h2>
								<p className="film-card__meta">
									<span className="film-card__genre">{genre}</span>
									<span className="film-card__year">{released}</span>
								</p>
								{
									status === AuthorizationStatus.Auth ? (
										<div className="film-card__buttons">
											<FavoriteButton film={film}/>
											<Link to={`${AppRoute.Films}/${film.id}${AppRoute.Review}`} className="btn film-card__button">
												Добавить отзыв
											</Link>
										</div>
									) : null
								}
							</div>
						</div>
					</div>
					<div className="film-card__wrap film-card__translate-top">
						<div className="film-card__info">
							<div className="film-card__poster film-card__poster--big">
								<picture>
									<source srcSet={`${posterImage}.webp`} type="image/webp"/>
									<img src={`${posterImage}.jpg`} alt={name} width="218" height="327" />
								</picture>
							</div>
							<Tabs film={film}/>
						</div>
					</div>
				</section>
				<div className="page-content">
					<section className="catalog catalog--like-this">
						<h2 className="catalog__title">Похожее</h2>
						<Catalog films={similarFilms} filmsCount={SIMILAR_FILMS_COUNT} />
					</section>
					<Footer />
				</div>
			</>
		);
	} else {
		return (<NotFoundError/>);
	}
};

export default FilmPage;
