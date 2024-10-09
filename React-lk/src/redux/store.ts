import {createStore} from "redux-dynamic-modules-core";
import {getSagaExtension} from "redux-dynamic-modules-saga";

import {getRouterModule} from "./modules/routerModule";
import {getAuthModule} from "./ducks/auth";
import {getProfileModule} from "./ducks/profile";
import {getJuridicalsModule} from "./ducks/juridicals";
import {getCommonModule} from "./ducks/common";

const store = createStore({
		extensions: [getSagaExtension()],
	},
	getRouterModule(),
	getAuthModule(),
	getProfileModule(),
	getJuridicalsModule(),
	getCommonModule()
);

export default store;
