import React, {ComponentProps, FC} from 'react';
import {Route} from 'react-router-dom';
import EntryRoutes from "../pages/entry/EntryRoutes";
import {useSelector} from "react-redux";
import {getSignedIn} from "../redux/ducks/auth";

interface Props {
	showAuth?: boolean;
	layoutComponent?: React.ElementType;
	customClass?: string;
}

const ProtectedRoute: FC<Props & ComponentProps<typeof Route>> = (
	{
		path,
		showAuth = true,
		component,
		exact,
		layoutComponent: LayoutComponent,
		customClass,
		...rest
	}) => {
	const signedIn = useSelector(getSignedIn);
	const ProtectedComponent = component as React.ElementType;

	const getCheckOutComponent = () => {
		return <ProtectedComponent/>
	}

	const render = () => {
		if(signedIn)
		{
			if(LayoutComponent)
			{
				if(customClass)
				{
					return (
						<div className={customClass}>
							<LayoutComponent>
								{getCheckOutComponent()}
							</LayoutComponent>
						</div>
					)
				} else
				{
					return (
						<div>
							<LayoutComponent>
								{getCheckOutComponent()}
							</LayoutComponent>
						</div>
					)
				}
			}

			return getCheckOutComponent();
		} else
		{
			if(showAuth)
			{
				return <EntryRoutes/>
			}
		}
		return null
	};

	return (
		<Route path={path} render={render} exact={exact} {...rest}/>
	);
};

export default ProtectedRoute;
