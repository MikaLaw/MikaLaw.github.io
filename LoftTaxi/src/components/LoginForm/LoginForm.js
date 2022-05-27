import React, { PureComponent } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "../FormComponents/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "../FormComponents/Modal";
import { Form, Field } from "react-final-form";
import { fetchAuthRequest } from "../../redux/actions/auth";
import {
  getIsAuthorized,
  getIsLoading,
  getError,
} from "../../redux/reducers/auth";
import { getUserProfile } from "../../redux/reducers/profile";

export const styles = () => ({
  Grid: {
    minHeight: "100vh",
    paddingTop: "80px",
  },
  Form: {
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    backgroundColor: "#ffd128",
  },
  Card: {
    boxSizing: "border-box",
    minWidth: "35%",
    maxWidth: "35%",
    padding: 10,
  },
  Input: {
    width: "100%",
  },
});

export class Login extends PureComponent {
  handleSubmit = (values) => {
    const { fetchAuthRequest } = this.props;

    fetchAuthRequest(values);
  };

  formValidation = (values) => {
    const errors = {};
    if (values.password && values.password.length < 6) {
      errors.password = "В пароле должжно быть не меньше 6 символов";
    }
    return errors;
  };

  renderLogin() {
    const { classes, isLoading, error } = this.props;

    return (
      <div className={"Login " + classes.background}>
        {error ? <Modal text={error} type="error" /> : ""}
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
                Войти
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                align="center"
              >
                test@test.com, 123123
              </Typography>
              <div className={classes.Form}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Form
                    initialValues={{}}
                    onSubmit={this.handleSubmit}
                    validate={this.formValidation}
                    render={({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <Field
                          name="email"
                          render={({ input }) => (
                            <TextField
                              {...input}
                              label="Имя пользователя"
                              variant="standard"
                              fullWidth
                              required
                              type="email"
                              margin="normal"
                            />
                          )}
                        />
                        <Field
                          name="password"
                          render={({ input, meta }) => (
                            <TextField
                              {...input}
                              error={meta.error && meta.visited && !meta.active}
                              helperText={
                                meta.error &&
                                meta.visited &&
                                !meta.active &&
                                meta.error
                              }
                              label="Пароль"
                              type="password"
                              variant="standard"
                              fullWidth
                              required
                              margin="normal"
                            />
                          )}
                        />
                        <Button
                          variant="contained"
                          sx={{ mt: 2 }}
                          type="submit"
                        >
                          Войти
                        </Button>
                      </form>
                    )}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }

  render() {
    const { isAuthorized, profile } = this.props;

    return isAuthorized ? (
      profile ? (
        <Redirect to="/map" />
      ) : (
        <Redirect to="/profile" />
      )
    ) : (
      this.renderLogin()
    );
  }
}

export const LoginStyled = withStyles(styles)(Login);

const mapStateToProps = (state) => ({
  isAuthorized: getIsAuthorized(state),
  isLoading: getIsLoading(state),
  error: getError(state),
  profile: getUserProfile(state),
});

const mapDispatchToProps = { fetchAuthRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginStyled));
