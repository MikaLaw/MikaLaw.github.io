import React, { Component } from "react";
import CardContent from "@mui/material/CardContent";
import Button from "../../FormComponents/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export class OrderAlert extends Component {
  render() {
    const { getNewOrder } = this.props;
    return (
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Заказ размещён
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                getNewOrder();
              }}
            >
              сделать новый заказ
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}

export default OrderAlert;
