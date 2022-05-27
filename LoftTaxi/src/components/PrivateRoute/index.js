import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export class PrivateRoute extends PureComponent {
  render() {
    const { isAuthorized, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthorized || window.localStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
});

export default connect(mapStateToProps)(PrivateRoute);
