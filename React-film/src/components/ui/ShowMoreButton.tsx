import { useAppDispatch } from "@/store";
import { showMore } from "@/store/catalogSlice";

export const ShowMoreButton = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="catalog__more">
            <button
                className="catalog__button"
                type="button"
                onClick={() => dispatch(showMore())}
            >
                Show more
            </button>
        </div>
    );
};