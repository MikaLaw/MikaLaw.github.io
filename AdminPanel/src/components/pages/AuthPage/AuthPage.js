import React, { useEffect } from "react";
import "./AuthPage.css";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../../assets/images/logo.png";
import { fetchLoginRequest } from "../../../redux/actions/auth";
import { selectAuthError } from "../../../redux/reducers/auth";
import { connect } from "react-redux";
import withApiService from "../../HOC";
import { compose } from "../../helpers";

const AuthPage = ({ apiService, error, fetchLoginRequest }) => {
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <div className="AuthPage">
      <Form
        name="normal_login"
        className="login-form"
        onFinish={(values) => {
          fetchLoginRequest({ apiService, ...values });
        }}
      >
        <Form.Item>
          <img
            src={logo}
            alt="logo"
            style={{ margin: "0 auto", display: "block" }}
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Заполните необходимые данные!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Введите логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Заполните необходимые данные!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Введите пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: selectAuthError(state),
});
const mapDispatchToProps = { fetchLoginRequest };

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthPage);
