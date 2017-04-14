import { Map, List } from 'immutable';

import { createReducer } from 'redux-act';

import * as actions from './Actions/Actions';


const initialState = Map({
  currentTab: 'new',
  pgSize: 6,
  pgNum: 1,
  loading: true,
  toggleSearch: false,
  showComments: false,
  searchMode: false,
  stories: [],
  comments: List([]),
});

const hackApp = createReducer({
  [actions.updateList]: (state, payload) => state.set('stories', payload.list),
  [actions.openComments]: (state, payload) => state.update('comments', list => (
    list.push(payload.list)
  )),
  [actions.searchMode]: (state, payload) => state.merge({
    searchMode: payload.bool,
    currentTab: -1,
  }),
  [actions.changeTab]: (state, payload) => state.merge({
    currentTab: payload.tab,
    pageNumber: 1,
  }),
  [actions.changePage]: (state, payload) => state.update('pgNum', page => parseInt(page, 10) + payload.page),
  [actions.changeSize]: (state, payload) => state.update('pgSize', () => payload.size),
  [actions.loading]: (state, payload) => state.update('loading', () => payload.bool),
  [actions.toggleSearch]: state => state.update('toggleSearch', bool => !bool),
  [actions.closeComments]: state => state.update('comments', list => list.slice(0, -1)),
}, initialState);

export default hackApp;
