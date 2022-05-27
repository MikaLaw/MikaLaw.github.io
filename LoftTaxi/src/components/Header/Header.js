import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, withRouter } from "react-router-dom";
import Button from "@mui/material/Button";
import { getIsAuthorized } from "../../redux/reducers/auth";
import { logout } from "../../redux/actions/auth";

const styles = () => ({
  background: {
    color: "#212121",
  },
  title: {
    flexGrow: 1,
  },
  Link: {
    textDecoration: "none",
    color: "#212121",
  },
  NavLink_selected: {
    "& .MuiButton-text": {
      background: "none",
      color: "#ffd128",
      cursor: "default",
    },
  },
});

class Header extends PureComponent {
  handleClick = (e) => {
    const { logout } = this.props;

    e.preventDefault();
    logout();
  };

  render() {
    const { classes, isAuthorized } = this.props;

    return (
      <div className={"Header " + classes.background}>
        <AppBar position="absolute" color="inherit">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Loft Taxi
            </Typography>

            <NavLink
              to="/map"
              className={classes.Link}
              activeClassName={classes.NavLink_selected}
            >
              <Button color="inherit">Карта</Button>
            </NavLink>

            <NavLink
              to="/profile"
              className={classes.Link}
              activeClassName={classes.NavLink_selected}
            >
              <Button color="inherit">Профиль</Button>
            </NavLink>

            {isAuthorized ? (
              <NavLink
                to="/login"
                className={classes.Link}
                activeClassName={classes.NavLink_selected}
                onClick={this.handleClick}
              >
                <Button color="inherit">Выйти</Button>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={classes.Link}
                activeClassName={classes.NavLink_selected}
              >
                <Button color="inherit">Войти</Button>
              </NavLink>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export const HeaderStyled = withStyles(styles)(Header);

const mapStateToProps = (state) => ({
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderStyled));
