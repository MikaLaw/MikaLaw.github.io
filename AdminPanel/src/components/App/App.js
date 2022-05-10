import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import "antd/dist/antd.min.css";
import SidebarMenu from "../SidebarMenu";
import AppHeader from "../AppHeader";
import { Layout } from "antd";
import {
  UserPage,
  AuthPage,
  TrafficPage,
  ViewTrafficPageForm,
  DocsPage,
} from "../pages";
const { Content } = Layout;

const App = ({ token }) => {
  if (!token) {
    return <AuthPage />;
  }

  return (
    <Layout>
      <SidebarMenu />
      <Layout className="site-layout">
        <AppHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route exact path="/" component={UserPage} />
            <Route exact path="/traffic" component={TrafficPage} />
            <Route path="/traffic/:id" component={ViewTrafficPageForm} />
            <Route path="/doc" component={DocsPage} />
            <Redirect to="/" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(mapStateToProps)(App);
