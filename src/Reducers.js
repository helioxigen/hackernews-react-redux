import { Map } from 'immutable';

import { createReducer } from 'redux-act';

import * as actions from './Actions/Actions';


const initialState = Map({
  currentTab: 'new',
  pageLength: 6,
  pageNumber: 1,
  toggleSearch: false,
  showComments: false,
  searchMode: false,
});

const hackApp = createReducer({
  [actions.updateList]: (state, payload) => state.set(payload.type, payload.list),
  [actions.searchMode]: (state, payload) => state.merge({
    searchMode: payload.bool,
    currentTab: -1,
  }),
  [actions.changeTab]: (state, payload) => state.merge({
    currentTab: payload.tab,
    pageNumber: 1,
  }),
  [actions.changePage]: (state, payload) => state.update('pageNumber', page => parseInt(page, 10) + payload.page),
  [actions.changeSize]: (state, payload) => state.update('pageLength', () => payload.size),
  [actions.toggleSearch]: state => state.update('toggleSearch', bool => !bool),
  [actions.toggleComments]: state => state.update('showComments', bool => !bool),
}, initialState);

export default hackApp;
