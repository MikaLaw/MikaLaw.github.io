import React from 'react';
import GoodCardTransition from "./GoodCardTransition";
import useRouterActions from "../../../hooks/useRouterActions";
import routes from "../../../routes";
import OffersCounter from "./OffersCounter";

const Banners = () => {
	const routerActions = useRouterActions();

	return (
		<>
			<div
				className="main-banner main-banner_incoming"
				onClick={() => {
					routerActions.push(routes.offersAll.path);
				}}
			>
				<OffersCounter
					loading={false}
					count={2}
					type="menu-item-tag_white"
					skeletonClassName="main-banner__badge"
					countClassName="main-banner__badge"
				/>
				<div className="main-banner__inner">
					<div>
						<p className="main-banner__title main-banner__title_color-white">
							Будьте в курсе поставок товаров <br />
							с разделом «Ожидается поступление»
						</p>
						<p className="main-banner__text main-banner__text_color-white">
							Добавляйте товары в «Избранное» и получайте <br />
							уведомления о поступлении на склад!
						</p>
					</div>

					<GoodCardTransition
						name="Перейти"
						nameClassName='good-card__name_color-white'
						iconClassName='good-card__go-forward_icon-white'
					/>
				</div>
			</div>
				<div
					className="main-banner main-banner_expires"
					onClick={() => {
						routerActions.push(routes.offersAll.path);
					}}
				>
					<OffersCounter
						loading={false}
						count={2}
						type="menu-item-tag_green"
						skeletonClassName="main-banner__badge"
						countClassName="main-banner__badge"
					/>
					<div className="main-banner__inner">
						<div>
							<p className="main-banner__title">
								Успейте купить по скидке
							</p>
							<p className="main-banner__text">
								Хорошие скидки на товары с учетом срока годности
							</p>
						</div>

						<GoodCardTransition
							name="Перейти"
						/>
					</div>
				</div>
				<div
					className="main-banner main-banner_discount"
					onClick={() => {
						routerActions.push(routes.offersAll.path);
					}}
				>
					<OffersCounter
						loading={false}
						count={2}
						type="menu-item-tag_green"
						skeletonClassName="main-banner__badge"
						countClassName="main-banner__badge"
					/>
					<div className="main-banner__inner">
						<div>
							<p className="main-banner__title">
								Выгода здесь и сейчас
							</p>
							<p className="main-banner__text">
								Специальные цены в каталоге для клиентов компании
							</p>
						</div>

						<GoodCardTransition
							name="Перейти"
						/>
					</div>
				</div>
		</>
	);
};

export default Banners;
