import React, { useEffect } from "react";
import "./CatsPage.css";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import withApiService from "../HOC";
import compose from "../helpers";
import {
  fetchCatsRequest,
  changeCatsFilter,
  saveFavouriteRequest,
} from "../../redux/actions/cats";
import {
  selectCats,
  selectCatsIsLoading,
  selectCatsError,
  selectCatsFilter,
} from "../../redux/reducers/cats";
import CatsCard from "../CatsCard";

const CatsPage = ({
  fetchCatsRequest,
  changeCatsFilter,
  saveFavouriteRequest,
  cats,
  catsFilter,
  isLoading,
}) => {
  useEffect(() => {
    fetchCatsRequest({ filters: { page: 1, limit: 20 }, force: false });
  }, []);

  const loadData = () => {
    changeCatsFilter({ ...catsFilter, page: catsFilter.page + 1 });
    fetchCatsRequest({
      filters: { ...catsFilter, page: catsFilter.page + 1 },
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
          {cats.map((item) => (
            <CatsCard
              cat={item}
              key={item.id}
              changeFavourite={saveFavouriteRequest}
            />
          ))}
        </InfiniteScroll>
        {isLoading ? <div>... загружаем котиков ...</div> : ""}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cats: selectCats(state),
  catsFilter: selectCatsFilter(state),
  isLoading: selectCatsIsLoading(state),
  error: selectCatsError(state),
});
const mapDispatchToProps = {
  fetchCatsRequest,
  changeCatsFilter,
  saveFavouriteRequest,
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CatsPage);
