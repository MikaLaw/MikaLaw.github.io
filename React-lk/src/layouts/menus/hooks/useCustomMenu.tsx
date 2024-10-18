import routes from "../../../routes";
import {CatalogIcon} from "../../../components/Icons";

const useCustomMenu = () => {
	const menu = [
		{
			path: routes.offers.path,
			name: 'Оптовый онлайн-заказ',
			icon: (
				<span className="menu-price-list-icon">
					<CatalogIcon/>
				</span>
			),
			hideInMenu: false,
			routes: [
				{
					path: routes.offersAll.path,
					name: 'Акции',
				},
			],
		},
	]

	return {
		menu,
	}
};

export default useCustomMenu;
