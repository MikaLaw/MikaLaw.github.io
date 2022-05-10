import React from "react";
import "./AppHeader.css";
import { fetchLogout } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { Button, Layout } from "antd";
const { Header } = Layout;

const AppHeader = ({ username, fetchLogout }) => {
  return (
    <Header className="site-layout-background" style={{ padding: "10px 16px" }}>
      <div className="AppHeader">
        <div className="AppHeader__left"></div>
        <div className="AppHeader__right">
          <span style={{ marginRight: "10px" }}>{username}</span>
          <Button onClick={fetchLogout}>Выйти</Button>
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = ({ auth }) => ({ username: auth.username });

const mapDispatchToProps = {
  fetchLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
