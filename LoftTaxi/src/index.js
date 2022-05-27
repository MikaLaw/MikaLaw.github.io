import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./components/AppRouter";
import createStore from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
