import {useMemo} from "react";
import {Button, Dropdown, Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import classNames from "classnames";
import profileMenu from "../../../layouts/menus/profileMenu";
import routes from "../../../routes";
import {ExitIcon,  UserIcon} from "../../Icons";
import {useAuthActions} from "../../../redux/ducks/auth";
import {useSelector} from "react-redux";
import {getProfileEmail} from "../../../redux/ducks/profile";
import {getOpenHeaderMenu, useCommonActions} from "../../../redux/ducks/common";


const HeaderMenu = () => {
	const {signOut} = useAuthActions();
	const location = useLocation();
	const profileEmail = useSelector(getProfileEmail);
	const openHeaderMenu = useSelector(getOpenHeaderMenu);
	const {setOpenHeaderMenu} = useCommonActions();
	const isBtnActive = location.pathname === routes.profile.path;

	const menu = useMemo(() => {
		return (
			<Menu>
				{profileMenu.map(item => (
					<Menu.Item
						className={classNames("profile-dropdown-menu-item__data", {
							'active': (location.pathname + location.search) === item.path
						})}
						icon={item.icon}
						key={item.name}
					>
						<Link to={item.path}>{item.name}</Link>
					</Menu.Item>
				))}
				<Menu.Item
					key="exit"
					className='profile-dropdown-menu-item__data'
					icon={<ExitIcon/>}
				>
					<a href="" onClick={signOut}>Выход</a>
				</Menu.Item>

			</Menu>
		)
	}, [
		location.pathname,
		location.search,
		signOut,
	]);

	return (
		<div className="header-menu">
			<div
				className={classNames('header-menu__dropdown-container', {
					'hover': openHeaderMenu
				})}
				onMouseOver={() => setOpenHeaderMenu(true)}
				onMouseLeave={() => setOpenHeaderMenu(false)}
			>
				{profileEmail && (<span className="header-menu__email text-3">{profileEmail}</span>)}
				<Dropdown
					overlay={menu}
					overlayClassName="profile-dropdown"
					visible={openHeaderMenu}
				>
					<>
						<Button
							icon={<UserIcon/>}
							className={classNames('header__icon-btn header__icon-user', {
								'active': isBtnActive,
							})}
						/>
					</>
				</Dropdown>
			</div>
		</div>
	);
};
export default HeaderMenu;
