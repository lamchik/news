import * as React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { rootReducer } from "./store";
import App from "./App";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
