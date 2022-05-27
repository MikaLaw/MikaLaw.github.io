import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import CardContent from "@mui/material/CardContent";
import Button from "../../FormComponents/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form, Field } from "react-final-form";

export const styles = () => ({
  Form: {
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Width: {
    width: "100%",
  },
});

const SelectField = ({
  label,
  input,
  isAddressListLoading,
  addressList = [],
  addressListError,
}) => {
  return (
    <FormControl variant="standard" fullWidth required margin="normal">
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select {...input} labelId="demo-simple-select-standard-label">
        {isAddressListLoading ? (
          <CircularProgress
            size={20}
            sx={{
              position: "relative",
              left: "47%",
              transform: "translateX(-50%)",
            }}
          />
        ) : addressListError ? (
          <div style={{ paddingLeft: 5, fontFamily: "sans-serif" }}>
            Нет данных
          </div>
        ) : (
          addressList.map((address) => (
            <MenuItem value={address} key={address}>
              {address}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export class OrderForm extends Component {
  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    onSubmit(values);
  };
  render() {
    const {
      classes,
      addressList,
      isAddressListLoading,
      addressListError,
      isCoordsLoading,
    } = this.props;
    return (
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2" align="center">
          Вызов такси
        </Typography>
        <div className={classes.Form}>
          {isCoordsLoading ? (
            <CircularProgress />
          ) : (
            <Form
              initialValues={{}}
              onSubmit={this.handleSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.Width}>
                  <Field
                    name="address1"
                    render={({ input }) => (
                      <SelectField
                        label="Пункт отправления"
                        input={input}
                        isAddressListLoading={isAddressListLoading}
                        addressList={addressList}
                        addressListError={addressListError}
                      />
                    )}
                  />
                  <Field
                    name="address2"
                    render={({ input }) => (
                      <SelectField
                        label="Пункт назначения"
                        input={input}
                        isAddressListLoading={isAddressListLoading}
                        addressList={addressList}
                        addressListError={addressListError}
                      />
                    )}
                  />
                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Вызвать такси
                  </Button>
                </form>
              )}
            />
          )}
        </div>
      </CardContent>
    );
  }
}
const OrderFormStyled = withStyles(styles)(OrderForm);

export default OrderFormStyled;
