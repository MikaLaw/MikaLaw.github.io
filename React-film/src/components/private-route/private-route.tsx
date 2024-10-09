import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus, getAuthorizationStatusLoading} from '../../store/user/selectors';
import Spinner from '../spinner/spinner.tsx';
import { FC } from 'react';

type PrivateRouteProps = {
	children: JSX.Element;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const authorizationStatusLoading = useAppSelector(getAuthorizationStatusLoading);

	if (authorizationStatusLoading) {
		return <Spinner/>;
	}

	return (
		authorizationStatus === AuthorizationStatus.Auth
			? children
			: <Navigate to={AppRoute.Login}/>
	);
};

export default PrivateRoute;

