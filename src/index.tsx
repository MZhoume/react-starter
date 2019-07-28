import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { StoreProvider } from 'easy-peasy';
import { Router } from 'react-router';
import * as serviceWorker from './serviceWorker';
import store from './store';

import './style.css';
import App from './App';

const history = createBrowserHistory();

ReactDOM.render(
  <StoreProvider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
