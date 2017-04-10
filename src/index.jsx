import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './Containers/App';
import './app.css';

import store from './Store/Store';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
