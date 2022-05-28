import React, { useEffect } from "react";
import "./FavoritesPage.css";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import withApiService from "../HOC";
import compose from "../helpers";
import {
  fetchFavoriteCatsRequest,
  changeFavoriteCatsFilter,
  deleteFavouriteRequest,
} from "../../redux/actions/favorite";
import {
  selectFavoriteCats,
  selectFavoriteCatsIsLoading,
  selectFavoriteCatsError,
  selectFavoriteCatsFilter,
} from "../../redux/reducers/favorite";
import CatsCard from "../CatsCard";

const FavoritesPage = ({
  fetchFavoriteCatsRequest,
  changeFavoriteCatsFilter,
  deleteFavouriteRequest,
  favorite,
  catsFavoriteFilter,
  isLoading,
}) => {
  useEffect(() => {
    fetchFavoriteCatsRequest({
      filters: { page: 1, limit: 50 },
      force: false,
    });
  }, []);

  const loadData = () => {
    changeFavoriteCatsFilter({
      ...catsFavoriteFilter,
      page: catsFavoriteFilter.page + 1,
    });
    fetchFavoriteCatsRequest({
      filters: { ...catsFavoriteFilter, page: catsFavoriteFilter.page + 1 },
      force: true,
    });
  };

  return (
    <div className="CatsPage">
      <div className="container">
        <InfiniteScroll
          loadMore={loadData}
          initialLoad={false}
          hasMore={!isLoading}
          className="CatsPage__list"
          loader={
            <div className="loader" key={0}>
              <div>... загружаем еще котиков ...</div>
            </div>
          }
        >
          {favorite.map((item) => (
            <CatsCard
              cat={item}
              key={item.id}
              changeFavourite={deleteFavouriteRequest}
            />
          ))}
        </InfiniteScroll>
        {isLoading ? <div>... загружаем котиков ...</div> : ""}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  favorite: selectFavoriteCats(state),
  catsFavoriteFilter: selectFavoriteCatsFilter(state),
  isLoading: selectFavoriteCatsIsLoading(state),
  error: selectFavoriteCatsError(state),
});
const mapDispatchToProps = {
  fetchFavoriteCatsRequest,
  changeFavoriteCatsFilter,
  deleteFavouriteRequest,
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FavoritesPage);
