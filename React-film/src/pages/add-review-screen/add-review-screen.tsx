import User from '../../components/user/user';
import Logo from '../../components/logo/logo';
import AddReview from '../../components/add-review/add-review';
import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm, getLoadingStatus} from '../../store/films/selectors';
import NotFoundError from '../../components/errors/not-found-error';
import {FC, useEffect} from 'react';
import {fetchFilmAction} from '../../store/api-action';
import Spinner from '../../components/spinner/spinner';

const AddReviewScreen: FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const film = useAppSelector(getFilm);
	const isLoading = useAppSelector(getLoadingStatus);

	useEffect(() => {
		dispatch(fetchFilmAction(params.id));
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}, [dispatch, params]);

	if (isLoading) {
		return (<Spinner/>);
	}

	if (film === null) {
		return (<NotFoundError/>);
	}

	return (
		<section className="film-card film-card--full">
			<div className="film-card__header">
				<div className="film-card__bg">
					<picture>
						<source srcSet={`${film.backgroundImage}.webp`} type="image/webp"/>
						<img src={`${film.backgroundImage}.jpg`} alt={film.name} />
					</picture>
				</div>
				<h1 className="visually-hidden">WTW</h1>
				<header className="page-header">
					<Logo/>
					<nav className="breadcrumbs">
						<ul className="breadcrumbs__list">
							<li className="breadcrumbs__item">
								<Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
							</li>
							<li className="breadcrumbs__item">
								<a className="breadcrumbs__link">Добавление отзыва</a>
							</li>
						</ul>
					</nav>
					<User/>
				</header>
				<div className="film-card__poster film-card__poster--small">
					<picture>
						<source srcSet={`${film.posterImage}.webp`} type="image/webp"/>
						<img src={`${film.posterImage}.jpg`} alt={film.name} width="218" height="327"/>
					</picture>
				</div>
			</div>
			<AddReview/>
		</section>
	);
};

export default AddReviewScreen;
