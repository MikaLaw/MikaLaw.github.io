import React, {
	FC,
	JSXElementConstructor,
	MutableRefObject,
	ReactElement,
	useContext,
	useRef,
} from 'react';
import {RouteContext} from "@ant-design/pro-layout";
import {Breadcrumb} from "antd";
import {Link, useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {ValuesType} from "utility-types";
import Scrollbars from "react-custom-scrollbars-2";
import classNames from "classnames";
import routes from "../routes";
import {BreadcrumbArrowIcon} from '../components/Icons';
import {getBreadcrumbDetails} from "../redux/ducks/common";
import {pathToRegexp} from "path-to-regexp";

const priceListDetailPaths = [
	routes.juridicalsDetail.path,
]

interface Props {
	scrollRef?: MutableRefObject<Scrollbars | null>;
	collapsed: boolean;
}

const MainContent: FC<Props> = ({children, scrollRef, collapsed}) => {
	const route = useContext(RouteContext);
	const location = useLocation();
	const breadcrumbDetails = useSelector(getBreadcrumbDetails);
	const mainRef = useRef<HTMLDivElement | null>(null);
	const {id} = useParams<Record<string, string>>();	

	const breadcrumbDetail = breadcrumbDetails.find(detail => detail.id === id);

	const renderBreadcrumbDetail = () => {
		for(const path of priceListDetailPaths)
		{
			if((location.pathname === path || pathToRegexp(path).test(location.pathname)) && breadcrumbDetail)
			{
				return (
					<Breadcrumb.Item>
						{breadcrumbDetail.name}
					</Breadcrumb.Item>
				)
			}
		}
	};

	const isGoodsDetailPage = priceListDetailPaths.some((path) => {
		return pathToRegexp(path).test(location.pathname)
	});	

	return (
		<div className="main-content" ref={mainRef}>
			<Breadcrumb
				className={classNames("mb-20", {
					"breadcrumb-v2": true,
					"price-list-detail-breadcrumb": isGoodsDetailPage,
				})}
				separator={<BreadcrumbArrowIcon/>}
			>
				<Breadcrumb.Item>
					<Link to={routes.main.path}>Главная</Link>
				</Breadcrumb.Item>

				{route.breadcrumb?.routes && route.breadcrumb.routes.map((route, index) => (
					<Breadcrumb.Item key={route.path}>
						{index === 0 && route.breadcrumbName}

						{index !== 0 && (
							<Link to={route.path}>{route.breadcrumbName}</Link>
						)}
					</Breadcrumb.Item>
				))}

				{!route.breadcrumb?.routes && route.currentMenu?.path && route.currentMenu?.path !== routes.main.path && (
					<Breadcrumb.Item key={route.currentMenu.path}>
						{route.currentMenu.path && (
							<Link
								to={route.currentMenu.path}
								className={classNames({"is-active": location.pathname === route.currentMenu.path})}
							>
								{route.currentMenu.name}
							</Link>
						)}
					</Breadcrumb.Item>
				)}

				{renderBreadcrumbDetail()}
			</Breadcrumb>

			{React.cloneElement(children as ReactElement<any, string | JSXElementConstructor<any>>, {
				scrollRef,
				mainRef,
				collapsed,
			})}
		</div>
	);
};

export default MainContent;
