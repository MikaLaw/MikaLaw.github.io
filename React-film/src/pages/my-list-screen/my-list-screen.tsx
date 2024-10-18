import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import Catalog from '../../components/catalog/catalog';
import {useAppSelector} from '../../hooks';
import {getFavoriteFilms, getFavoriteFilmsCount} from '../../store/films/selectors';
import { FC } from 'react';

const MyListScreen:FC = () => {
	const films = useAppSelector(getFavoriteFilms);
	const filmsCount = useAppSelector(getFavoriteFilmsCount);

	return (
		<div className="user-page">
			<header className="page-header user-page__head">
				<Logo/>
				<h1 className="page-title user-page__title">Избранное<span className="user-page__film-count">{filmsCount}</span></h1>
				<User/>
			</header>

			<section className="catalog">
				<h2 className="catalog__title visually-hidden">Каталог</h2>
				<Catalog films={films} filmsCount={filmsCount}/>
			</section>

			<Footer/>
		</div>
	);
};

export default MyListScreen;
