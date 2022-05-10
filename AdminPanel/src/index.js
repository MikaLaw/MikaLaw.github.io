import React from "react";
import ReactDOM from "react-dom/client";
import createAppStore from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import ApiService from "./service";
import { ApiServiceProvider } from "./components/ApiServiceContext";
const apiService = new ApiService();

const store = createAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ApiServiceProvider value={apiService}>
      <Router>
        <App />
      </Router>
    </ApiServiceProvider>
  </Provider>
);
