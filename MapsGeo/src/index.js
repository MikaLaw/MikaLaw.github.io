import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import createAppStore from "./redux/store";
import { Provider } from "react-redux";
import { ApiServiceProvider } from "./components/ApiServiceContext";
import ApiService from "./service";

const apiService = new ApiService();
const store = createAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ApiServiceProvider value={apiService}>
      <App />
    </ApiServiceProvider>
  </Provider>
);
