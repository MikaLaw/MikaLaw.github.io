import { Picture } from "@/components/ui/Picture";
import { Link, useParams } from "react-router";
import { useGetMovieByIdQuery } from "../api/movieApi";
import { AddReview } from "../components/AddReview";
import { Logo } from "../components/ui/Logo";
import { User } from "../components/ui/User";
import { AppRoute } from "../consts";

export const ReviewPage = () => {
    // 1. Достаем ID фильма из параметров URL
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);
    const { data: film } = useGetMovieByIdQuery(movieId);
    const movie = film?.movie;
    if (movie) {
        return (
            <section className="film-card film-card--full">
                <div className="film-card__header">
                    <div className="film-card__bg">
                        <Picture bg={movie.backgroundImage} name={movie.name} />
                    </div>
                    <h1 className="visually-hidden">WTW</h1>
                    <header className="page-header">
                        <Logo />
                        <nav className="breadcrumbs">
                            <ul className="breadcrumbs__list">
                                <li className="breadcrumbs__item">
                                    <Link to={`${AppRoute.Films}/${movie.id}`} className="breadcrumbs__link">{movie.name}</Link>
                                </li>
                                <li className="breadcrumbs__item">
                                    <a className="breadcrumbs__link">Добавление отзыва</a>
                                </li>
                            </ul>
                        </nav>
                        <User />
                    </header>
                    <div className="film-card__poster film-card__poster--small">
                        <Picture bg={movie.posterImage} name={movie.name} />
                    </div>
                </div>
                <AddReview />
            </section>
        );
    }

};


