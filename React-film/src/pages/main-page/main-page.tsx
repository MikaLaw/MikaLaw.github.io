import { FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
	getGenre,
	getAvailableGenres,
	getFilmsByGenre,
	getFilmsCount,
	getPromoFilm,
	getLoadingStatus
} from '../../store/films/selectors';
import {getFilms} from '../../store/films/films';
import Catalog from '../../components/catalog/catalog';
import CatalogGenres from '../../components/catalog-genres/catalog-genres';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import Spinner from '../../components/spinner/spinner';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {AuthorizationStatus} from '../../consts';

const MainPage: FC = () => {
	const dispatch = useAppDispatch();
	const selectedGenre = useAppSelector(getGenre);
	const allGenres = useAppSelector(getAvailableGenres);
	const filmsByGenre = useAppSelector(getFilmsByGenre);
	const isLoading = useAppSelector(getLoadingStatus);
	const filmsCount = useAppSelector(getFilmsCount);
	const promoFilm = useAppSelector(getPromoFilm);
	const authorizationStatus = useAppSelector(getAuthorizationStatus);

	useEffect(() => {
		dispatch(getFilms());
	}, [selectedGenre, dispatch]);

	return (
		<>
			<section className="film-card">
				<div className="film-card__bg">
					{
						promoFilm ? (
							<picture>
								<source srcSet={`${promoFilm.backgroundImage}.webp`} type="image/webp"/>
								<img src={`${promoFilm.backgroundImage}.jpg`} alt={promoFilm.name} width='250px' height='250px'/>
							</picture>
						) : (
							<img src={'https://mikalaw.github.io/React-film/build/static/img/bg-header.jpg'} alt="" />
						)
					}
				</div>
				<h1 className="visually-hidden">WTW</h1>
				<header className="page-header film-card__head">
					<Logo />
					<User />
				</header>
				<div className="film-card__wrap">
					<div className="film-card__info">
						<div className="film-card__poster">
							{
								promoFilm ? (
									<picture>
										<source srcSet={`${promoFilm.posterImage}.webp`} type="image/webp"/>
										<img src={`${promoFilm.posterImage}.jpg`} alt={promoFilm.name} width="218" height="327" />
									</picture>
								) : (
									<img src={'https://mikalaw.github.io/React-film/build/static/img/bg-header.jpg'} alt="" width="218" height="327" />
								)
							}

						</div>
						<div className="film-card__desc">
							<h2 className="film-card__title">{promoFilm ? promoFilm.name : 'Фильм не найден'}</h2>
							{
								promoFilm ? (
									<>
										<p className="film-card__meta">
											<span className="film-card__genre">{promoFilm?.genre}</span>
											<span className="film-card__year">{promoFilm?.released}</span>
										</p>
										{
											authorizationStatus === AuthorizationStatus.Auth ? (
												<div className="film-card__buttons">
													<FavoriteButton film={promoFilm}/>
												</div>
											) : null
										}
									</>
								) : null
							}

						</div>
					</div>
				</div>
			</section>
			<div className="page-content">
				<section className="catalog">
					{
						filmsByGenre.length !== 0 ? (
							<>
								<CatalogGenres genres={allGenres} selectedGenre={selectedGenre}/>
								{isLoading ? <Spinner/> : <Catalog films={filmsByGenre} filmsCount={filmsCount}/>}
								{filmsByGenre.length > filmsCount && <ShowMoreButton/>}
							</>
						) : (<p>Фильмы не найдены</p>)
					}
				</section>
				<Footer />
			</div>
		</>
	);
};

export default MainPage;

