import {FC} from 'react';
import OffersCounter from "../main/components/OffersCounter";

const Offers: FC = () => {
    return (
        <>
				<div
					className="main-banner main-banner_discount"
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
					</div>
				</div>
        </>
    )
}

export default Offers;