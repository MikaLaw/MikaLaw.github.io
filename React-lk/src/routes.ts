import {compile} from 'path-to-regexp';

const routes = {
	layouts: {
		path: '*',
	},
	profile: {
		path: '/React-lk/build/profile',
		setQueryTab: (tab: string) => `/React-lk/build/profile?tab=${tab}`
	},
	main: {
		path: '/React-lk/build/main'
	},
	login: {
		path: '/React-lk/build/login'
	},
	registration: {
		path: '/React-lk/build/sign-up'
	},
	passwordRecovery: {
		path: '/React-lk/build/password-recovery'
	},
	offers: {
		path: '/React-lk/build/offers'
	},
	offersAll: {
		path: '/React-lk/build/offers/all'
	},
	juridicalsDetail: (() => {
		const pathRule = '/React-lk/build/juridicals/:id';
		const urlCreator = compile(pathRule, {encode: encodeURIComponent});

		return {
			path: pathRule,
			createUrl: (id: string) => urlCreator({id}),
		}
	})(),
} as const;


export default routes;
