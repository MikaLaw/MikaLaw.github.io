import React, { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import withApiService from "../HOC";
import compose from "../helpers";
import { fetchAddressRequest } from "../../redux/actions";
import {
  selectAddress,
  selectAddressIsLoading,
  selectAddressError,
  selectAddressCoords,
} from "../../redux/reducer";

const App = ({
  apiService,
  fetchAddressRequest,
  address,
  coords,
  isLoading,
  error,
}) => {
  const [mapElement, setmapElement] = useState(null);

  const selectHendler = (e) => {
    let center = e.target.value.split(",");
    mapElement.setCenter(center, 9);
  };

  useEffect(() => {
    fetchAddressRequest({ apiService });
  }, [fetchAddressRequest, apiService]);

  useEffect(() => {
    if (coords.length !== 0) {
      window.ymaps.ready(() => {
        var myMap = new window.ymaps.Map("map", {
          center: [55.75, 37.57],
          zoom: 5,
          controls: ["zoomControl"],
        });
        var myGeoObjects = [];
        for (var i = 0; i < coords.length; i++) {
          myGeoObjects[i] = new window.ymaps.GeoObject({
            geometry: {
              type: "Point",
              coordinates: coords[i],
            },
          });
        }
        var myClusterer = new window.ymaps.Clusterer();
        myClusterer.add(myGeoObjects);
        myMap.geoObjects.add(myClusterer);
        setmapElement(myMap);
      });
    }
  }, [coords]);

  return (
    <div className="App">
      <select
        onChange={(value, myMap) => selectHendler(value, myMap)}
        className="SearchInput"
        defaultValue="default"
      >
        <option value="default" disabled>
          Выберете город:
        </option>
        {isLoading ? (
          <option>Идет загрузка...</option>
        ) : error ? (
          <option>Произошла ошибка</option>
        ) : (
          address.map((town, i) => (
            <option value={town.coords} key={i}>
              {town.value}
            </option>
          ))
        )}
      </select>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  address: selectAddress(state),
  coords: selectAddressCoords(state),
  isLoading: selectAddressIsLoading(state),
  error: selectAddressError(state),
});

const mapDispatchToProps = {
  fetchAddressRequest,
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
