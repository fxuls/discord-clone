import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Root from "./Root";
import configureStore from "./store";
import * as styles from "./styles/index";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
