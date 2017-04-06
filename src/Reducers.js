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
  loadingStories: true,
  loadingComments: true,
  storyKids: 0,
  showComments: false
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
  [actions.loadingComments]: (state)  => state.update('loadingComments', bool => true),
  [actions.closeComments]:   (state) => state.update('showComments', bool => !bool),
  [actions.changeTab]:  (state, payload)  => state.update('currentTab', val => payload.tab),
  [actions.changeSize]: (state, size) => state.update('pageLength', size => size),
  [actions.loading]:    (state)       => state.update('loading', bool => true)
}, initialState);

export default hackApp;
