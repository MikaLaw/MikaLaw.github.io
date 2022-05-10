import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  CompassOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import logoBlack from "../../assets/images/logo__black.png";
import "./SidebarMenu.css";

const { Sider } = Layout;

const getDefaultSelectedKeysByURL = () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname.indexOf("users") > -1
  ) {
    return ["1"];
  } else if (window.location.pathname.indexOf("traffic") > -1) {
    return ["2"];
  } else if (window.location.pathname.indexOf("calendar") > -1) {
    return ["3"];
  }
  return ["1"];
};
const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleMenuHandler = () => setCollapsed(!collapsed);

  return (
    <div className="SidebarMenu">
      <Sider collapsible collapsed={collapsed} onCollapse={toggleMenuHandler}>
        <div className="ant-layout-header">
          <img src={logoBlack} alt="logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={getDefaultSelectedKeysByURL()}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: (
                <Link to="/">
                  <span className="nav-text">Пользователи</span>
                </Link>
              ),
            },
            {
              key: "2",
              icon: <CompassOutlined />,
              label: (
                <Link to="/traffic">
                  <span className="nav-text">Маршруты</span>
                </Link>
              ),
            },
            {
              key: "3",
              icon: <ProfileOutlined />,
              label: (
                <Link to="/doc">
                  <span className="nav-text">Документы</span>
                </Link>
              ),
            },
          ]}
        />
      </Sider>
    </div>
  );
};

export default SidebarMenu;
