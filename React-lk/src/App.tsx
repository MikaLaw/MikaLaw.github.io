import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {ConfigProvider,  Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {ConnectedRouter} from "connected-react-router";
import 'antd/dist/antd.css';
import store from './redux/store';
import Routes from './components/Routes';
import history from './tools/history';
import ru_RU from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import './styles/index.scss'

const antIcon = <LoadingOutlined spin/>;

Spin.setDefaultIndicator(antIcon);

function App(){
	const customLocale = {
		...ru_RU,
		Pagination: {
			...ru_RU.Pagination,
			page: ''
		},
	}

	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if((e.oldValue === 'true' && e.newValue === 'false') || (e.oldValue === 'false' && e.newValue === 'true')) return window.location.reload();
		}

		window.addEventListener("storage", handleStorage);

		return () => {
			window.removeEventListener("storage", handleStorage);
		}
	}, []);

	return (
		<Provider store={store}>
				<ConnectedRouter history={history} noInitialPop>
					<ConfigProvider locale={customLocale}>
						<Routes/>
					</ConfigProvider>
				</ConnectedRouter>
		</Provider>
	);
}

export default App;
