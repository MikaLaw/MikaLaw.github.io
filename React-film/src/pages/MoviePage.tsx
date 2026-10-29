import { useGetUserQuery } from "@/api/authApi";
import { useGetMovieByIdQuery, useGetSimilarQuery } from "@/api/movieApi";
import { MovieCard } from "@/components/MovieCard";
import { Tabs } from "@/components/Tabs";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Footer } from "@/components/ui/Footer";
import { Logo } from "@/components/ui/Logo";
import { Picture } from "@/components/ui/Picture";
import { Spinner } from "@/components/ui/Spinner";
import { User } from "@/components/ui/User";
import { AppRoute } from "@/consts";
import { Link, useParams } from "react-router";
import { NotFoundError } from "./NotFoundError";

export const MoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);
    const { data: film, isLoading: isMovieLoading } = useGetMovieByIdQuery(movieId);
    const { data: similar, isLoading: isSimilarLoading } = useGetSimilarQuery(movieId, {
        skip: !film?.movie,
    });

    const { data: user } = useGetUserQuery();
    const isAuthorized = !!user;

    if (isMovieLoading || isSimilarLoading) {
        return <Spinner />;
    }

    const movie = film?.movie;
    const favoriteCount = film?.favoriteCount ?? 0;

    if (!movie) {
        return <NotFoundError />;
    }

    const { name, posterImage, backgroundImage, genre, released, isFavorite } = movie;

    return (
        <>
            <section className="film-card film-card--full">
                <div className="film-card__hero">
                    <div className="film-card__bg">
                        <Picture bg={backgroundImage} name={name} />
                    </div>
                    <h1 className="visually-hidden">WTW</h1>
                    <header className="page-header film-card__head">
                        <Logo />
                        <User />
                    </header>
                    <div className="film-card__wrap">
                        <div className="film-card__desc">
                            <h2 className="film-card__title">{name}</h2>
                            <p className="film-card__meta">
                                <span className="film-card__genre">{genre}</span>
                                <span className="film-card__year">{released}</span>
                            </p>

                            {isAuthorized && (
                                <div className="film-card__buttons">
                                    <FavoriteButton isFavorite={isFavorite} id={movie.id} favoriteCount={favoriteCount} />
                                    <Link to={`${AppRoute.Films}/${movie.id}/${AppRoute.Review}`} className="btn film-card__button">
                                        Добавить отзыв
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="film-card__wrap film-card__translate-top">
                    <div className="film-card__info">
                        <div className="film-card__poster film-card__poster--big">
                            <Picture bg={posterImage} name={name} />
                        </div>
                        <Tabs film={movie} />
                    </div>
                </div>
            </section>

            <div className="page-content">
                <section className="catalog catalog--like-this">
                    <h2 className="catalog__title">Похожее</h2>

                    {similar && similar.length === 0 ? (
                        <p className="text-gray-500 text-sm py-4">Нет похожих фильмов в этом жанре</p>
                    ) : (
                        <div className="catalog__films-list">
                            {similar?.map((similarFilm) => (
                                <MovieCard key={similarFilm.id} film={similarFilm} />
                            ))}
                        </div>
                    )}
                </section>
                <Footer />
            </div>
        </>
    );
};