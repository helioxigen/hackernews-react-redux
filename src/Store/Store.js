import thunk from 'redux-thunk';
import { assignAll } from 'redux-act';
import { createStore, applyMiddleware, compose } from 'redux';

import * as actions from '../Actions/Actions';

import hackApp from '../Reducers';

// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(hackApp, compose(applyMiddleware(thunk)));
assignAll(actions, store);

export default store;
