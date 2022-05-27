import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import Modal from "../../FormComponents/Modal";
import OrderAlert from "./OrderAlert";
import OrderForms from "./OrderForm";

export const styles = () => ({
  Card: {
    position: "absolute",
    top: "100px",
    left: "33px",
    boxSizing: "border-box",
    minWidth: "50%",
    maxWidth: "700px",
    padding: 10,
  },
});

export class OrderCard extends Component {
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
      <Card className={classes.Card}>
        {addressListError && (
          <Modal text="Не удалось загрузить адреса" type="error" />
        )}
        {coordsError && (
          <Modal text="Не удалось загрузить маршрут" type="error" />
        )}
        {coordsIsLoaded ? (
          <OrderAlert getNewOrder={fetchNewRoudRequest} />
        ) : (
          <OrderForms
            addressList={addressList}
            isAddressListLoading={isAddressListLoading}
            addressListError={addressListError}
            isCoordsLoading={isCoordsLoading}
            onSubmit={fetchCoordsRequest}
          />
        )}
      </Card>
    );
  }
}
const OrderCardStyled = withStyles(styles)(OrderCard);
export default OrderCardStyled;
