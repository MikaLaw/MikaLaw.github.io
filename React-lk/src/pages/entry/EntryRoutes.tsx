import {Switch, Route} from 'react-router-dom';
import routes from "../../routes";
import Loadable from "react-loadable";
import {PageLoading} from "@ant-design/pro-layout";


const EntryRoutes = () => {
	return (
		<Switch>
			<Route path={routes.passwordRecovery.path} exact component={LoadablePasswordRecovery}/>
			<Route path={routes.login.path} exact component={LoadableLogin}/>
			<Route path="*" component={LoadableLogin}/>
		</Switch>
	);
};

const LoadableLogin = Loadable({
	loader: () => {
		return import('./Entry').catch(e => e)
	},
	loading(){
		return <PageLoading/>
	}
})

const LoadablePasswordRecovery = Loadable({
	loader: () => {
		return import('./password-recovery/PasswordRecovery').catch(e => e)
	},
	loading(){
		return <PageLoading/>
	}
})


const LoadableLandingPage = Loadable({
	loader: () => {
		return import('./LandingPage').catch(e => e)
	},
	loading(){
		return <PageLoading/>
	}
})

export default EntryRoutes;
