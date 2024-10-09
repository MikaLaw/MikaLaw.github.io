import { FC } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-action';
import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {getAuthorizationStatus, getUser} from '../../store/user/selectors';


const User: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const user = useAppSelector(getUser);

	if (authorizationStatus === AuthorizationStatus.Auth) {
		return (
			<ul className="user-block">
				<li className="user-block__item">
					<div className="user-block__avatar">
						<img src={user?.avatarUrl} alt="User avatar" width="63" height="63" onClick={() => navigate(AppRoute.MyList)}/>
					</div>
				</li>
				<li className="user-block__item">
					<button
						onClick={
							() => {
								void dispatch(logoutAction());
							}
						}
						className="user-block__link"
					>
						Выйти
					</button>
				</li>
			</ul>
		);
	} else {
		return (
			<div className="user-block">
				<button onClick={() => navigate(AppRoute.Login)} className="user-block__link">Войти</button>
			</div>
		);
	}
};

export default User;
