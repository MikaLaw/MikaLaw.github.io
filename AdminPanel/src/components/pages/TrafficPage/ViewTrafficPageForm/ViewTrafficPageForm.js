import React, { useEffect } from "react";
import "./ViewTrafficPageForm.css";
import { message, Spin } from "antd";
import { ReactComponent as ArrowBackIcon } from "../../../../assets/images/arrowBackIcon.svg";
import mapLocation from "../../../../assets/images/mapLocation.png";
import { connect } from "react-redux";
import withApiService from "../../../HOC";
import { compose } from "../../../helpers";
import {
  selectTraffic,
  selectTrafficsIsLoading,
  selectTrafficsError,
} from "../../../../redux/reducers/traffics";
import { fetchTrafficRequest } from "../../../../redux/actions/traffics";

const ViewTrafficPageForm = ({
  history,
  apiService,
  match,
  traffic,
  isLoading,
  error,
  fetchTrafficRequest,
}) => {
  const { id } = match.params;
  const { distance } = traffic;

  useEffect(() => {
    if (error) {
      message.error(error);
    }

    fetchTrafficRequest({ apiService, id });
  }, [apiService, fetchTrafficRequest, error, id]);

  return (
    <div className="ViewTrafficPageForm">
      <div className="ViewTrafficPageForm__bredcrumb">
        <ArrowBackIcon
          style={{ marginRight: 10, cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        />
        <span>Маршруты</span>
      </div>

      <div className="ViewTrafficPageForm__wrapper">
        {isLoading ? (
          <Spin />
        ) : (
          <div className="ViewTrafficPageForm__container">
            <div>{distance} м</div>
            <div>
              <img src={mapLocation} alt="pic" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  traffic: selectTraffic(state),
  isLoading: selectTrafficsIsLoading(state),
  error: selectTrafficsError(state),
});
const mapDispatchToProps = { fetchTrafficRequest };

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ViewTrafficPageForm);
