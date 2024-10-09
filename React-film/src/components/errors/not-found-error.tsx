import { FC } from 'react';
import {AppRoute} from '../../consts';
import {useNavigate} from 'react-router-dom';

const NotFoundError: FC = () => {
	const navigate = useNavigate();

	return (
		<section className="film-card">
			<div className="film-card__bg">
				<img src="https://mikalaw.github.io/React-film/build/static/img/bg-header.jpg" alt="Not Found" />
			</div>
			<h1 className="visually-hidden">WTW</h1>
			<header className="page-header film-card__head">
				<button className="film-card__btn-not-found" onClick={() => navigate(AppRoute.Root)}>Вернуться на главную страницу</button>
			</header>
			<div className="film-card__wrap">
				<div className="film-card__info">
					<div className="film-card__poster">
						<img src="https://mikalaw.github.io/React-film/build/static/img/bg-header.jpg" alt="Not Found" width="218" height="327" />
					</div>
					<div className="film-card__desc">
						<h2 className="film-card__title">Страница не найдена</h2>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFoundError;
