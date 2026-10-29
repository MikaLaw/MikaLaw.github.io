import { useGetGenresQuery } from "@/api/movieApi";
import { useIsDesktop } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store"; // Используем типизированные хуки
import { setGenre } from "@/store/catalogSlice";
import clsx from "clsx";

export const GenreTabs = () => {
    const dispatch = useAppDispatch();
    const isDesktop = useIsDesktop();
    const { data: genres = ['All genres'] } = useGetGenresQuery();
    const selectedGenre = useAppSelector((state) => state.catalog.selectedGenre);

    return (
        <>
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            {isDesktop ? (
                <ul className="catalog__genres-list">
                    {genres.slice(0, 10).map((genre) => (
                        <li
                            key={genre}
                            className={clsx('catalog__genres-item', {
                                'catalog__genres-item--active': genre === selectedGenre
                            })}
                        >
                            <button
                                className="catalog__genres-link"
                                onClick={() => dispatch(setGenre(genre))}
                            >
                                {genre}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <select
                    className="catalog__genres-list catalog__genres-list_select"
                    value={selectedGenre}
                    onChange={(e) => {
                        dispatch(setGenre(e.target.value));
                    }}
                >
                    {genres.slice(0, 10).map((genre) => (
                        <option
                            key={genre}
                            className={clsx('catalog__genres-item', {
                                'catalog__genres-item--active': genre === selectedGenre
                            })}
                            value={genre}
                        >
                            {genre}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
};