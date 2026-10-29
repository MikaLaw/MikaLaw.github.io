
import { useGetUserQuery } from "@/api/authApi";
import { useGetMoviesQuery, useGetPromoQuery } from "@/api/movieApi";
import { GenreTabs } from "@/components/GenreTabs";
import { MovieCard } from "@/components/MovieCard";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Footer } from "@/components/ui/Footer";
import { Logo } from "@/components/ui/Logo";
import { Picture } from "@/components/ui/Picture";
import { ShowMoreButton } from "@/components/ui/ShowMoreButton";
import { Spinner } from "@/components/ui/Spinner";
import { User } from "@/components/ui/User";
import { useAppSelector } from "@/store";

export const HomePage = () => {
    const { selectedGenre, visibleCount } = useAppSelector((state) => state.catalog);
    const { data: user, isLoading: isUserLoading } = useGetUserQuery();
    const { data: promoFilm, isLoading: isPromoLoading, isError: isPromoError } = useGetPromoQuery();
    const { data, isLoading: isMoviesLoading, isError: isMoviesError } = useGetMoviesQuery({
        genre: selectedGenre,
        limit: visibleCount,
    });
    if (isPromoLoading || isMoviesLoading || isUserLoading) {
        return <Spinner />;
    }

    if (isPromoError || isMoviesError) {
        return (
            <div>
                <h2>Упс! Произошла ошибка при загрузке данных</h2>
                <p >Проверьте соединение с интернетом или обновите страницу.</p>
                <button
                    onClick={() => window.location.reload()}
                >
                    Обновить страницу
                </button>
            </div>
        );
    }

    const promo = promoFilm?.movie;
    const favoriteCount = promoFilm?.favoriteCount ?? 0;
    const movies = data?.movies ?? [];
    const totalCount = data?.totalCount ?? 0;
    const isAuthenticated = !!user;

    return (
        <>
            <section className="film-card">
                <div className="film-card__bg">
                    <Picture bg={promo?.backgroundImage} name={promo?.name} />
                </div>

                <h1 className="visually-hidden">WTW</h1>
                <header className="page-header film-card__head">
                    <Logo />
                    <User />
                </header>

                <div className="film-card__wrap">
                    <div className="film-card__info">
                        <div className="film-card__poster">
                            <Picture bg={promo?.posterImage} name={promo?.name} />
                        </div>
                        <div className="film-card__desc">
                            <h2 className="film-card__title">{promo ? promo.name : 'Промо-фильм не задан'}</h2>
                            {promo && (
                                <>
                                    <p className="film-card__meta">
                                        <span className="film-card__genre">{promo.genre}</span>
                                        <span className="film-card__year">{promo.released}</span>
                                    </p>
                                    {isAuthenticated && (
                                        <div className="film-card__buttons">
                                            <FavoriteButton id={promo.id} isFavorite={promo.isFavorite} favoriteCount={favoriteCount} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="page-content">
                <section className="catalog">
                    <h2 className="visually-hidden">Catalog</h2>
                    <GenreTabs />
                    {movies.length === 0 ? (
                        <div className="catalog__empty-state">
                            <p>В жанре "{selectedGenre}" фильмы не найдены</p>
                        </div>
                    ) : (
                        <div className="catalog__films-list">
                            {movies.map((film) => (
                                <MovieCard key={film.id} film={film} />
                            ))}
                        </div>
                    )}
                    {movies.length < totalCount && <ShowMoreButton />}
                </section>
                <Footer />
            </div>
        </>
    );
};