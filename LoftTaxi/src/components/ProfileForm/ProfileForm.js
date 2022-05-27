import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "../FormComponents/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Form, Field } from "react-final-form";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { IMaskInput } from "react-imask";
import { fetchUserProfileRequest } from "../../redux/actions/profile";
import { getUserProfile } from "../../redux/reducers/profile";
import Modal from "../FormComponents/Modal";

export const styles = () => ({
  Grid: {
    minHeight: "100vh",
    paddingTop: "80px",
  },
  error: {
    fontFamily: "sans-serif",
    color: "#d32f2f",
    fontWeight: "400",
    fontSize: "0.75rem",
    lineHeight: "1.66",
    letterSpacing: " 0.03333em",
    textAlign: "left",
    marginTop: "3px",
    marginBottom: "0px",
  },
  Form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    backgroundColor: "#ffd128",
  },
  Card: {
    boxSizing: "border-box",
    minWidth: "50%",
    maxWidth: "50%",
    padding: 10,
  },
});

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/0000"
      definitions={{ "#": /[1-9]/ }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export class ProfileForm extends Component {
  state = {
    showModal: false,
  };
  handleSubmit = (values) => {
    const { fetchUserProfileRequest } = this.props;

    fetchUserProfileRequest(values);
    this.setState({ showModal: true });
  };

  formValidation = (values) => {
    let errors = {};
    const user = {};
    const { userName, cardNumber, cardDate, cardCVV } = values;

    if (userName && !userName.match(/^[A-Za-z]+\s+[A-Za-z]+$/)) {
      user.userName = "Имя владельца должно быть полным и на латинице";
    }
    if (cardNumber && !cardNumber.match(/^[0-9]+$/)) {
      user.cardNumber = "Номер карты должен содержать только цифры";
    }
    if (
      cardDate &&
      (+cardDate.slice(0, 2) <= 0 || +cardDate.slice(0, 2) > 12)
    ) {
      user.cardDate = "Дата задана не верно";
    }
    if (cardDate && +cardDate.slice(-4) < new Date().getFullYear()) {
      user.cardDate = "Дата задана не верно";
    }
    if (cardCVV && !cardCVV.match(/^[0-9]+$/)) {
      user.cardCVV = "СVV должен содержать только цифры";
    }

    if (Object.keys(user).length > 0) {
      errors = user;
      return errors;
    }
  };

  cardNameFormatter = (value) => value && value.toUpperCase();
  cardNumberFormatter = (value) =>
    value && value.replace(/(\S{4})/g, "$1 ").trim();
  cardNumberPars = (value) => value && value.replace(/\s+/g, "").slice(0, 16);
  cardDatePars = (value) => value && value.slice(0, 7);
  cardCVVPars = (value) => value && value.slice(0, 3);

  render() {
    const { profile, classes } = this.props;
    const { showModal } = this.state;

    let initialValues = {
      userName: profile ? profile.userName : "",
      cardNumber: profile ? profile.cardNumber : "",
      cardDate: profile ? profile.cardDate : "",
      cardCVV: profile ? profile.cardCVV : "",
    };

    return (
      <div className={"ProfilePage " + classes.background}>
        {showModal ? (
          <Modal text="Данные сохранены успешно!" type="success" />
        ) : (
          ""
        )}
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          justifyContent="center"
          className={classes.Grid}
        >
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                align="center"
              >
                Профиль
              </Typography>
              <Typography gutterBottom variant="h5" component="h3">
                Способ оплаты
              </Typography>
              <div className={classes.Form}>
                <Form
                  initialValues={initialValues}
                  onSubmit={this.handleSubmit}
                  validate={this.formValidation}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Field
                            name="userName"
                            format={this.cardNameFormatter}
                            render={({ input, meta }) => (
                              <TextField
                                {...input}
                                error={!!meta.error}
                                helperText={meta.error}
                                label="Имя владельца"
                                variant="standard"
                                fullWidth
                                required
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            name="cardNumber"
                            format={this.cardNumberFormatter}
                            parse={this.cardNumberPars}
                            render={({ input, meta }) => (
                              <TextField
                                {...input}
                                error={!!meta.error}
                                helperText={meta.error}
                                label="Номер карты"
                                variant="standard"
                                fullWidth
                                required
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            name="cardDate"
                            parse={this.cardDatePars}
                            render={({ input, meta }) => (
                              <FormControl
                                variant="standard"
                                fullWidth
                                required
                                error={meta.error ? true : false}
                              >
                                <InputLabel htmlFor="formatted-text-mask-input">
                                  Дата окончания действия
                                </InputLabel>
                                <Input
                                  placeholder="__/____"
                                  value={input.value}
                                  name="textmask"
                                  id="formatted-text-mask-input"
                                  onBlur={input.onChange}
                                  inputComponent={TextMaskCustom}
                                />
                                {meta.error && (
                                  <p className={classes.error}>{meta.error}</p>
                                )}
                              </FormControl>
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            name="cardCVV"
                            parse={this.cardCVVPars}
                            render={({ input, meta }) => (
                              <TextField
                                {...input}
                                error={!!meta.error}
                                helperText={meta.error}
                                label="CVV"
                                variant="standard"
                                fullWidth
                                required
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Cохранить
                      </Button>
                    </form>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

export const ProfileFormStyled = withStyles(styles)(ProfileForm);

const mapStateToProps = (state) => ({
  profile: getUserProfile(state),
});

const mapDispatchToProps = { fetchUserProfileRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileFormStyled));
