import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import OrderCard from "./OrderCard/OrderCard";

import { fetchAddressListRequest } from "../../redux/actions/address";
import {
  fetchCoordsRequest,
  fetchNewRoudRequest,
} from "../../redux/actions/coords";
import {
  getAddressList,
  getAddressListIsLoading,
  getAddressListError,
} from "../../redux/reducers/address";
import {
  getCoords,
  getCoordsError,
  getCoordsIsLoading,
  getCoordsIsLoaded,
} from "../../redux/reducers/coords";

export const styles = () => ({
  MapContainer: {
    minHeight: "100vh",
    position: "relative",
  },
  Card: {
    position: "absolute",
    top: "100px",
    left: "33px",
    boxSizing: "border-box",
    minWidth: "28%",
    maxWidth: "28%",
    padding: 10,
  },
});

export class Map extends Component {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWlrYWxhdyIsImEiOiJja3czcHljdDkxdjAyMnBubzBxajQ1cGx6In0.f3T_UmyZiQZvsh1vTFDTlw";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [30.2656504, 59.8029126],
      zoom: 15,
    });

    this.props.fetchAddressListRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { coordsIsLoaded, coords } = this.props;

      if (!coordsIsLoaded && this.map.getLayer("route")) {
        this.map.removeLayer("route");
        this.map.removeSource("route");
      }

      if (coordsIsLoaded && coords && coords.length > 0) {
        if (prevProps.coords !== coords) {
          this.map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {
                  color: "#F7455D",
                },
                geometry: {
                  type: "LineString",
                  coordinates: coords,
                },
              },
            },
            paint: {
              "line-width": 8,
              "line-color": ["get", "color"],
            },
          });

          this.map.flyTo({
            center: coords[0],
          });
        }
      }
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const {
      classes,
      addressList,
      isAddressListLoading,
      addressListError,
      fetchCoordsRequest,
      isCoordsLoading,
      coordsError,
      coordsIsLoaded,
      fetchNewRoudRequest,
    } = this.props;
    return (
      <div className={classes.MapContainer}>
        <div ref={this.mapContainer} />
        <OrderCard
          addressList={addressList}
          isAddressListLoading={isAddressListLoading}
          addressListError={addressListError}
          isCoordsLoading={isCoordsLoading}
          fetchCoordsRequest={fetchCoordsRequest}
          coordsError={coordsError}
          coordsIsLoaded={coordsIsLoaded}
          fetchNewRoudRequest={fetchNewRoudRequest}
        />
      </div>
    );
  }
}

export const MapStyled = withStyles(styles)(Map);

const mapStateToProps = (state) => ({
  addressList: getAddressList(state),
  isAddressListLoading: getAddressListIsLoading(state),
  addressListError: getAddressListError(state),
  isCoordsLoading: getCoordsIsLoading(state),
  coordsError: getCoordsError(state),
  coordsIsLoaded: getCoordsIsLoaded(state),
  coords: getCoords(state),
});

const mapDispatchToProps = {
  fetchAddressListRequest,
  fetchCoordsRequest,
  fetchNewRoudRequest,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MapStyled));
