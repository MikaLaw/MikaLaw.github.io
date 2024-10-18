import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import FilmPage from './pages/film-page/film-page';
import SignInPage from './pages/sign-in-page/sign-in-page';
import NotFoundError from './components/errors/not-found-error';
import PrivateRoute from './components/private-route/private-route';
import MyListScreen from './pages/my-list-screen/my-list-screen';
import AddReviewScreen from './pages/add-review-screen/add-review-screen';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import {AppRoute} from './consts';

export const App = () => (
	<HistoryRouter history={browserHistory}>
		<Routes>
			<Route path={AppRoute.Root}>
				<Route index element={<MainPage/>}/>
				<Route path={AppRoute.Login} element={<SignInPage/>}/>
				<Route path={`${AppRoute.Films}/:id`} element={<FilmPage/>}/>
			</Route>
			<Route path={AppRoute.MyList} element={<PrivateRoute><MyListScreen/></PrivateRoute>} />
			<Route path={`${AppRoute.Films}/:id${AppRoute.Review}`} element={<PrivateRoute><AddReviewScreen/></PrivateRoute>}/>
			<Route path="*" element={<NotFoundError/>}/>
		</Routes>
	</HistoryRouter>
);
