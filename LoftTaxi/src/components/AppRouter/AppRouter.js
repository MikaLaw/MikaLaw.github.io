import React, { Component, Fragment } from "react";

import "./AppRouter.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../Header";
import LoginForm from "../LoginForm";
import ProfileForm from "../ProfileForm";
import MapContainer from "../MapContainer";
import PrivateRoute from "../PrivateRoute";

class AppRouter extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <PrivateRoute path="/map" component={MapContainer} />
          <PrivateRoute path="/profile" component={ProfileForm} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }
}

export default AppRouter;
