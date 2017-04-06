import React from 'react';
import ReactDOM from 'react-dom';
import App from './Containers/App';
import './app.css';

import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './Store/Store';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
