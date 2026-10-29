import { Tab } from "@/consts";
import type { Movie } from "@/types";
import clsx from "clsx";
import React, { useState } from "react";
import { FilmDetails } from "./FilmDetails";
import { FilmOverview } from "./FilmOverview";
import { FilmReviews } from "./FilmReviews";

interface TabsProps {
    film: Movie;
}

export const Tabs: React.FC<TabsProps> = ({ film }) => {
    const [currentTab, setCurrentTab] = useState<Tab>(Tab.Overview);
    const tabComponentsMap: Record<Tab, React.JSX.Element> = {
        [Tab.Overview]: <FilmOverview film={film} />,
        [Tab.Details]: <FilmDetails film={film} />,
        [Tab.Reviews]: <FilmReviews film={film} />,
    };

    return (
        <div className="film-card__desc">
            <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                    <li className={clsx('film-nav__item', { 'film-nav__item--active': currentTab === Tab.Overview })}>
                        <button className="film-nav__link" onClick={() => setCurrentTab(Tab.Overview)}>
                            Обзор
                        </button>
                    </li>
                    <li className={clsx('film-nav__item', { 'film-nav__item--active': currentTab === Tab.Details })}>
                        <button className="film-nav__link" onClick={() => setCurrentTab(Tab.Details)}>
                            Детали
                        </button>
                    </li>
                    <li className={clsx('film-nav__item', { 'film-nav__item--active': currentTab === Tab.Reviews })}>
                        <button className="film-nav__link" onClick={() => setCurrentTab(Tab.Reviews)}>
                            Отзывы
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="film-card__tab-content">
                {tabComponentsMap[currentTab]}
            </div>
        </div>
    );
};