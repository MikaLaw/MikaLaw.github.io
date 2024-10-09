import Logo from "./components/Logo";
import {ExitIcon, UserIcon} from '../Icons';
import {Button, Menu, Dropdown} from "antd";
import {useActions} from "react-redux-actions-hook";
import {push} from "connected-react-router";
import routes from "../../routes";
import {getSignedIn, useAuthActions} from "../../redux/ducks/auth";
import {useSelector} from "react-redux";
import classNames from "classnames";
import HeaderMenu from "./components/HeaderMenu";

type HeadersType = {
	collapsed?: boolean;
	isLoggedIn?: boolean;
}

const Header = (props: HeadersType) => {
	const {isLoggedIn = true} = props;
	const actions = useActions({push});
	const {signOut} = useAuthActions();

	const signedIn = useSelector(getSignedIn);

	return (
		<header className="header">
			<div className="header__logo" onClick={() => actions.push(routes.main.path)}>
				<Logo text='личный кабинет клиента'/>
			</div>

			{!isLoggedIn && signedIn && (
				<div className="header__icons">
					<Dropdown
						overlay={(
							<Menu>
								<Menu.Item icon={<ExitIcon/>} key={'Выход'}>
									<a onClick={signOut}>Выход</a>
								</Menu.Item>
							</Menu>
						)}
						overlayClassName="profile-dropdown"
					>
						<Button
							icon={<UserIcon/>}
							className={classNames('header__icon-btn header__icon-user')}
						/>
					</Dropdown>
				</div>
			)}

			{isLoggedIn && (
				<div className="header__icons">
					<HeaderMenu/>
				</div>
			)}
		</header>
	);
};

export default Header;
