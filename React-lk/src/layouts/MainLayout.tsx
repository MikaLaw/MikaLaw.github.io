import React, {useEffect, useRef, useState} from 'react';
import ProLayout, {PageLoading} from '@ant-design/pro-layout';
import Header from '../components/header/Header';
import {Link} from "react-router-dom";
import {
	HomeIcon,
	MenuIcon, CustomCloseIcon
} from '../components/Icons';
import {Alert, Button} from 'antd';
import {useSelector} from "react-redux";
import {getLocation, push} from "connected-react-router";
import routes from "../routes";
import classNames from "classnames";
import CustomScroll from '../components/сommon/CustomScroll';
import {useActions} from "react-redux-actions-hook";
import MainContent from "./MainContent";
import cookieStore from '../tools/cookieStore';
import {
	getCommonInitialLoading,  getHeightTechnicalNotificationsList,
	getTechnicalNotificationsList, useCommonActions
} from "../redux/ducks/common";

import {useStateWithCallbackLazy} from "use-state-with-callback";
import Scrollbars from "react-custom-scrollbars-2";
import ErrorBoundaryRoot from "../components/сommon/ErrorBoundaryRoot";
import useResizeObserver from "@react-hook/resize-observer";
import {collapsedBtnHeight, nlToBr} from '../tools/utils';

import useCustomMenu from "./menus/hooks/useCustomMenu";
import {usePageVisibility} from 'react-page-visibility';

const MainLayout: React.FC = ({children}) => {
	const [collapsed, setCollapsed] = useStateWithCallbackLazy(false);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const scrollRef = useRef<Scrollbars | null>(null);
	const {setCollapsedMenu, setIsPageVisible} = useCommonActions();
	const isPageVisible = usePageVisibility();
	const {menu} = useCustomMenu();
	const actions = useActions({push});

	const location = useSelector(getLocation);
	const commonInitialLoading = useSelector(getCommonInitialLoading);
	const notificationsRef = useRef<HTMLDivElement | null>(null);
	const commonActions = useCommonActions();
	useResizeObserver(notificationsRef, (entry) => {
		commonActions.setHeightTechnicalNotificationsList((entry.target as HTMLDivElement)?.offsetHeight ?? 0);
	});
	const technicalNotificationsList = useSelector(getTechnicalNotificationsList);
	const heightTechnicalNotificationsList = useSelector(getHeightTechnicalNotificationsList);

	const goToMain = () => {
		actions.push(routes.main.path);
	}
	useEffect(() => {
		getOpenKeysFromStore();
	}, []);

	useEffect(() => {
		setCollapsedMenu(collapsed);
	}, [])

	useEffect(() => {
			setIsPageVisible(isPageVisible);
	}, [isPageVisible]);

	const getOpenKeysFromStore = () => {
		const openKeysFromCookie = cookieStore.get('openKeys');
		const parsedOpenKeys = openKeysFromCookie ? JSON.parse(openKeysFromCookie) || []:null;
		
		if(selectedKeys.length > 1)
		{
			setOpenKeys([selectedKeys[1]]);
			cookieStore.set('openKeys', '');
			return
		}

		if(parsedOpenKeys)
		{
			setOpenKeys(parsedOpenKeys);
		} else
		{
			setOpenKeys([
				routes.offers.path
			]);
		}

		return parsedOpenKeys;
	}

	const setOpenKeysInStore = (openKeys: string[]) => {
		setOpenKeys(openKeys);
		
		if(!collapsed)
		{
			cookieStore.set('openKeys', JSON.stringify(openKeys));
		} 
	}

	const collapseHandler = (collapse: boolean) => {
		setCollapsed(collapse, (collapse) => {
			if(!collapse)
			{
				getOpenKeysFromStore();
			}
		});
		setCollapsedMenu(collapse);
	}
	return (
		<>
			<div ref={notificationsRef}>
				{technicalNotificationsList.map((notification, index) => (
					<Alert
						key={notification.id}
						className="technical-notification-alert"
						type='info'
						message={<p dangerouslySetInnerHTML={{__html: nlToBr(notification.text)}}/>}
						afterClose={() => commonActions.removeTechnicalNotification(notification.id)}
						closable
						closeIcon={<CustomCloseIcon/>}
					/>
				))}
			</div>

			<Header
				isLoggedIn={true}
				collapsed={collapsed}
			/>
			<ProLayout
				collapsed={collapsed}
				siderWidth={collapsed ? 100:246}
				className={'custom-layout'}
				onCollapse={collapseHandler}
				fixSiderbar
				route={{
					path: '/welcome',
					routes: menu,
				}}
				menuProps={{
					openKeys: openKeys,
					onOpenChange: setOpenKeysInStore,
					forceSubMenuRender: true,
					onSelect: ({keyPath,}) => {
						setSelectedKeys(keyPath);
					}
				}}

				menuHeaderRender={() => (
					<>
						<div className="menu-main">
							<Button
								onClick={goToMain}
								type="link"
								className={classNames(`menu-main__link`, {'is-active': location.pathname === routes.main.path})}
								icon={<HomeIcon/>}
							>
								{!collapsed && <>Главная страница</>}
							</Button>
						</div>
					</>
				)}
				menuItemRender={(item, dom) => {
					return (
						<>
							{item.path && (
								<Link
									to={item.path || '/'}
									className={classNames({
										"onboarding-price-offers": item.path === routes.offers.path
									})}
								>
									{dom}
								</Link>
							)}
						</>
					)
				}}
				logo={false}
				title={false}
				headerRender={false}
				navTheme='light'
				style={{
					height: '100%',
				}}
				collapsedButtonRender={(state) => (
					<Button
						style={{height: collapsedBtnHeight()}}
						onClick={() => {
							collapseHandler(!collapsed);
						}}
						icon={<MenuIcon className={classNames('menu-collapse-icon', {collapsed: collapsed})}/>}
					>
						{!collapsed && 'Свернуть меню'}
					</Button>
				)}
				ErrorBoundary={ErrorBoundaryRoot}
			>
				<CustomScroll
					ref={scrollRef}
					renderView={(props) => {
						return (
							<div
								className="scrollbar-container__body"
								style={{
									...props.style,
									overflow: "auto scroll",
									padding: '25px 30px',
									minHeight: 'auto',
									flex: 'auto',
									display: 'flex',
									flexDirection: "column",
								}}
							/>
						)
					}}
					renderTrackVertical={({style, ...rest}) => {
						return (
							<div
								className="scrollbar-track-vertical"
								style={{
									...style,
									right: '2px',
									bottom: '2px',
									top: '2px',
									borderRadius: '3px',
									zIndex: 9,
								}}
								{...rest}
							/>
						)
					}}
					autoHeightMax={`calc(100vh - 47px - ${heightTechnicalNotificationsList}px)`}
					style={{
						display: 'flex',
						flexDirection: "column",
						flex: "auto"
					}}
				>
					{!commonInitialLoading && (
						<MainContent scrollRef={scrollRef} collapsed={collapsed}>
							{children}
						</MainContent>
					)}
					

					{commonInitialLoading && <PageLoading/>}
				</CustomScroll>
			</ProLayout>

		</>
	);
};

export default MainLayout;
