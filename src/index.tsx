import * as React from "react";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import {newsReducer} from './store/reducer';
import App from './App';

const store = createStore(newsReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);