/**
 *  hackerNewsApp reducer
 */
import { Map, List } from 'immutable';

import { createReducer } from 'redux-act';

import * as actions from './Actions/Actions';


const initialState = Map({
  storyList: [],
  commentsList: List([]),
  currentTab: 'new',
  pageLength: '6',
  pageNumber: '1',
  toggleSearch: false,
  loadingStories: true,
  loadingComments: true,
  storyKids: 0,
  showComments: false,
  searchMode: false
})

const hackApp = createReducer({
  [actions.updateList]:     (state, payload) => state.merge({
    storyList: payload.list,
    loading: false
  }),
  [actions.openComments]:   (state, payload) => state.merge({
    showComments: true,
    storyKids: payload.kids
  }),
  [actions.updateComments]: (state, payload) => state.merge({
    loadingComments: false,
    commentsList: payload.list
  }),
  [actions.closeComments]:  (state) => state.merge({
    showComments: false,
    commentsList: []
  }),
  [actions.searchMode]:     (state, payload) => state.merge({
      searchMode: payload.bool,
      currentTab: -1
  }),
  [actions.loadingComments]: (state)  => state.update('loadingComments', bool => true),
  [actions.changePage]:   (state, payload) => state.update('pageNumber', page => parseInt(page)+payload.page), 
  [actions.changeTab]:    (state, payload) => state.update('currentTab', val => payload.tab),
  [actions.changeSize]:   (state, payload) => state.update('pageLength', size => payload.size),
  [actions.loading]:      (state)       => state.update('loading', bool => true),
  [actions.toggleSearch]: (state)       => state.update('toggleSearch', bool => !bool),
}, initialState);

export default hackApp;
