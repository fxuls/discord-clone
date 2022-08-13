import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Root from "./Root";
import configureStore from "./store";
// eslint-disable-next-line
import * as styles from "./styles/index";
import { SocketContext, socket } from "./components/sockets";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <Root />
      </SocketContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
