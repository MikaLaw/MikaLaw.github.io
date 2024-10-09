import { FC } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import SignInForm from '../../components/sign-in/sign-in-form';

const SignInPage: FC = () => (
	<div className="user-page">
		<header className="page-header user-page__head">
			<Logo/>
			<h1 className="page-title user-page__title">Вход</h1>
		</header>
		<SignInForm/>
		<Footer />
	</div>
);

export default SignInPage;
