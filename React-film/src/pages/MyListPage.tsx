import { useGetFavoriteMoviesQuery } from "@/api/movieApi";
import { MovieCard } from "@/components/MovieCard";
import { Footer } from "@/components/ui/Footer";
import { Logo } from "@/components/ui/Logo";
import { Spinner } from "@/components/ui/Spinner";
import { User } from "@/components/ui/User";
import { AppRoute } from "@/consts";
import { Link } from 'react-router';

export const MyListPage = () => {
    const { data: films, isLoading } = useGetFavoriteMoviesQuery();
    const myMovies = films?.favorites ?? [];
    const favoriteCount = films?.favoriteCount ?? 0;

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="user-page">
            <header className="page-header user-page__head">
                <Logo />
                <h1 className="page-title user-page__title">
                    Избранное
                    <span className="user-page__film-count">{favoriteCount}</span>
                </h1>
                <User />
            </header>

            <section className="catalog">
                <h2 className="catalog__title visually-hidden">Каталог</h2>
                {myMovies.length === 0 ? (
                    <div className="catalog__empty-state">
                        <p>Ваш список избранного пока пуст</p>
                        <Link to={AppRoute.Root}>
                            Перейти в каталог фильмов →
                        </Link>
                    </div>
                ) : (
                    <div className="catalog__films-list">
                        {myMovies.map((film) => (
                            <MovieCard key={film.id} film={film} />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};