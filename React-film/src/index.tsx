import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import './index.css';
import {App} from './app';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	fetchAllFilmsAction,
	checkAuthAction,
	fetchPromoFilmAction,
	fetchFavoriteFilmsAction
} from './store/api-action';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthAction());
store.dispatch(fetchAllFilmsAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(fetchFavoriteFilmsAction());

root.render(
	<React.StrictMode>
		<Provider store = {store}>
			<ToastContainer/>
			<App />
		</Provider>
	</React.StrictMode>
);
