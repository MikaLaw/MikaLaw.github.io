import {Tab} from '../../consts.ts';
import {FC, useState} from 'react';
import cn from 'classnames';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import {Film} from '../../types/film.ts';

type TabsProps = {
	film: Film;
}

const Tabs:FC <TabsProps> = ({film}) => {
	const [currentTab, setCurrentTab] = useState(Tab.Overview);

	const setTab = () => {
		switch (currentTab) {
		case Tab.Details:
			return <FilmDetails film={film}/>;
		case Tab.Overview:
			return <FilmOverview film={film}/>;
		case Tab.Reviews:
			return <FilmReviews/>;
		}
	};


	return (
		<div className="film-card__desc">
			<nav className="film-nav film-card__nav">
				<ul className="film-nav__list">
					<li className={cn('film-nav__item', {'film-nav__item--active': currentTab === Tab.Overview})}>
						<button className="film-nav__link" onClick={() => setCurrentTab(Tab.Overview)}>Обзор</button>
					</li>
					<li className={cn('film-nav__item', {'film-nav__item--active': currentTab === Tab.Details})}>
						<button className="film-nav__link" onClick={() => setCurrentTab(Tab.Details)}>Детали</button>
					</li>
					<li className={cn('film-nav__item', {'film-nav__item--active': currentTab === Tab.Reviews})}>
						<button className="film-nav__link" onClick={() => setCurrentTab(Tab.Reviews)}>Отзывы</button>
					</li>
				</ul>
			</nav>
			{setTab()}
		</div>
	);
};

export default Tabs;
