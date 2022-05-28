import React from "react";
import "./AppHeader.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <div className={"Header "}>
      <AppBar position="static" color="primary">
        <Toolbar style={{ alignItems: "unset" }}>
          <NavLink
            to="/"
            exact
            className="Header__link"
            activeClassName="Header__link--active"
          >
            Все котики
          </NavLink>

          <NavLink
            to="/favorites"
            className="Header__link"
            activeClassName="Header__link--active"
          >
            Любимые котики
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppHeader;
