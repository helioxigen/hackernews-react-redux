import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './app.css';

import { Provider } from 'react-redux';
import { bindAll } from 'redux-act';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';

import hackApp from './Reducers';

export const store = createStore(hackApp, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
bindAll(actions, store);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
