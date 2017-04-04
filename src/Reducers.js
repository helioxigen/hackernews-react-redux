/**
 *  hackerNewsApp reducer
 */
import { Map, List } from 'immutable';


import {
         CHANGE_TAB, UPDATE_LIST, CHANGE_SIZE,
         LOADING, CLOSE_COMMENTS, OPEN_COMMENTS,
         UPDATE_COMMENTS, LOAD_COMM
       } from './Actions/constansts';


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

function hackerNewsApp(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LIST:
      return state.merge({
        list: action.list,
        loading: false
      })

    case CHANGE_TAB:
      return state.merge({
        list: List([]),
        currentTab: action.tab
      })

    case CHANGE_SIZE:
      return state.merge({
        list: List([]),
        pageLength: action.size
      })

    case LOADING:
      return state.update('loading', bool => action.bool)

    case CLOSE_COMMENTS:
      return state.merge({
        showComments: false,
        commentsList: List([])
      })

    case OPEN_COMMENTS:
      return state.merge({
        showComments: true,
        storyKids: action.kids
      })

    case UPDATE_COMMENTS:
      return state.merge({
        commentsList: action.list,
        loadingComments: false
      })
    default:
      return state;
  }
}

export default hackerNewsApp;
