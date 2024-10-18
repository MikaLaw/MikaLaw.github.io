import React, {useMemo, useState} from 'react';
import {Redirect, Switch} from 'react-router-dom';
import Loadable from "react-loadable";
import {PageLoading} from "@ant-design/pro-layout";
import {useSelector} from "react-redux";

import MainLayout from "../layouts/MainLayout";
import routes from "../routes";
import EntryRoutes from "../pages/entry/EntryRoutes";
import {getSignedIn} from "../redux/ducks/auth";
import ProtectedRoute from "./ProtectedRoute";
import {MainLayoutContextProps} from "../interfaces/common/models";

export const MainLayoutContext = React.createContext<MainLayoutContextProps>({} as MainLayoutContextProps);

const Routes = () => {
	const signedIn = useSelector(getSignedIn);
	const [visibleChoosePharmacy, setVisibleChoosePharmacy] = useState(false);

	const value = useMemo(() => ({
		visibleChoosePharmacy,
		setVisibleChoosePharmacy,
	}), [visibleChoosePharmacy]);

	if(!signedIn) return <EntryRoutes/>

	return (
		<MainLayoutContext.Provider value={value}>
			<Switch>
				<ProtectedRoute layoutComponent={MainLayout} path={routes.profile.path} component={LoadableProfile} customClass="page-height-auto" />
				<ProtectedRoute layoutComponent={MainLayout} path={routes.main.path} component={LoadableMain} customClass="page-height-auto page-grey" />
				<ProtectedRoute layoutComponent={MainLayout} path={routes.juridicalsDetail.path} component={LoadableJuridicalsDetail} customClass="page-green" />
				<ProtectedRoute layoutComponent={MainLayout} exact path={routes.offersAll.path} component={LoadableOffers} customClass="page-green" />
				<ProtectedRoute exact path="/React-lk/build/" render={() => <Redirect to={routes.main.path} />} />
				<ProtectedRoute exact path={routes.login.path} render={() => <Redirect to={routes.main.path} />} />
				<ProtectedRoute layoutComponent={MainLayout} exact path="*" component={LoadableNotFound} />
			</Switch>
		</MainLayoutContext.Provider>
	);
};

const LoadableNotFound = Loadable({
	loader: () => import('../pages/NotFound').catch(e => e),
	loading(){
		return <PageLoading/>
	}
});

const LoadableProfile = Loadable({
	loader: () => import('../pages/profile/Profile').catch(e => e),
	loading(){
		return <PageLoading/>
	}
});


const LoadableMain = Loadable({
	loader: () => import('../pages/main/Main').catch(e => e),
	loading(){
		return <PageLoading/>
	}
});

const LoadableJuridicalsDetail = Loadable({
	loader: () => import('../pages/juridicals/JuridicalsDetail').catch(e => e),
	loading(){
		return <PageLoading/>
	}
});


const LoadableOffers = Loadable({
	loader: () => import('../pages/offers/Offers').catch(e => e),
	loading(){
		return <PageLoading/>
	}
});



export default Routes;
