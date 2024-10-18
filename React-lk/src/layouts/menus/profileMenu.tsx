import {
	BriefcaseIcon, MessageIcon
} from '../../components/Icons';
import routes from "../../routes";

export default [
	{
		path: routes.profile.setQueryTab("data"),
		name: 'Персональные данные',
		icon: <BriefcaseIcon/>,
	},
    {
        path: routes.profile.setQueryTab("contacts"),
        name: 'Контакты менеджеров',
        icon: <MessageIcon/>,
    },
];