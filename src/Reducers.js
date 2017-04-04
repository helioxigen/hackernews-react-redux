/**
 *  hackerNewsApp reducer
 */
import { Map, List } from 'immutable';

import { createReducer } from 'redux-act';

import * as actions from './Actions/Actions';


const initialState = Map({
  list: List([]),
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
  [actions.updateList]:     (state, list) => state.merge({
    list: list,
    loading: false
  }),
  [actions.openComments]:   (state, kids) => state.merge({
    showComments: true,
    storyKids: kids
  }),
  [actions.updateComments]: (state, list) => state.merge({
    loadingComments: false,
    commentsList: list
  }),
  [actions.loadingComments]: (state)  => state.update('loadingComments', true),
  [actions.changeTab]:  (state, tab)  => state.update('currentTab', tab),
  [actions.changeSize]: (state, size) => state.update('pageLength', size),
  // [actions.loading]:    (state)       => state.update('loading', true)
}, initialState);

export default hackApp;
