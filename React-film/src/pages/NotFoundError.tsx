import { Picture } from "@/components/ui/Picture";
import { AppRoute } from "@/consts";
import React from 'react';
import { Link } from 'react-router';

export const NotFoundError: React.FC = () => {
    return (
        <section className="film-card">
            <div className="film-card__bg">
                <Picture bg="bg-header" name="Not Found" />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header film-card__head">
                <Link
                    to={AppRoute.Root}
                    className="btn film-card__button"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                    Вернуться на главную страницу
                </Link>
            </header>

            <div className="film-card__wrap">
                <div className="film-card__info">
                    <div className="film-card__poster">
                        <Picture bg="bg-header" name="Not Found" />
                    </div>
                    <div className="film-card__desc">
                        <h2 className="film-card__title">404. Страница не найдена</h2>
                        <p className="film-card__meta" style={{ marginTop: '10px', color: '#c9b53f' }}>
                            К сожалению, запрашиваемый адрес недоступен или такой страницы не существует.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};