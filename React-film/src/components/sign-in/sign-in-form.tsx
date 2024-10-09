import {FormEvent, useRef, FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-action';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const SignInForm: FC = () => {
	const navigate = useNavigate();
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const authStatus = useAppSelector(getAuthorizationStatus);


	useEffect(() => {
		if (authStatus === AuthorizationStatus.Auth) {
			navigate(AppRoute.Root);
		}
	}, [navigate, authStatus]);

	const dispatch = useAppDispatch();

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (emailRef.current !== null && passwordRef.current !== null) {
			if (/[0-9]/.test(passwordRef.current.value) &&
				/[a-zA-Z]/.test(passwordRef.current.value) &&
				passwordRef.current.value.length > 0) {
				dispatch(loginAction({
					login: emailRef.current.value,
					password: passwordRef.current.value
				}));
			} else {
				toast.warn('Пароль должен содержать цифру и букву');
			}
		}
	};

	return (
		<div className="sign-in user-page__content">
			<form action="" className="sign-in__form" onSubmit={handleSubmit}>
				<div className="sign-in__fields">
					<div className="sign-in__field">
						<input
							className="sign-in__input"
							type="email"
							placeholder="Почта"
							name="user-email"
							id="user-email"
							ref={emailRef}
						/>
						<label className="sign-in__label visually-hidden" htmlFor="user-email">Почта</label>
					</div>
					<div className="sign-in__field">
						<input
							className="sign-in__input"
							type="password"
							placeholder="Пароль"
							name="user-password"
							id="user-password"
							ref={passwordRef}
						/>
						<label className="sign-in__label visually-hidden" htmlFor="user-password">Пароль</label>
					</div>
				</div>
				<div className="sign-in__submit">
					<button className="sign-in__btn" type="submit">Войти</button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
