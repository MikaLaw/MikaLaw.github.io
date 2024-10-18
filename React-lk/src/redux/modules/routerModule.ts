import {routerMiddleware} from 'connected-react-router';
import {connectRouter} from 'connected-react-router';
import history from '../../tools/history';

export const getRouterModule = () => {
	return {
		id: 'router',
		reducerMap: {
			router: connectRouter(history),
		},
		middlewares: [routerMiddleware(history)],
	};
}
