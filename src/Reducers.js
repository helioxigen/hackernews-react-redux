/**
 *  hackerNewsApp reducer
 */
import { Map, List } from 'immutable';


import {
         CHANGE_TAB, UPDATE_LIST, CHANGE_SIZE,
         LOADING, CLOSE_COMMENTS, OPEN_COMMENTS
       } from './Actions/constansts';


const initialState = Map({
  list: List([]),
  commentsList: List([]),
  currentTab: 'new',
  pageLength: '6',
  pageNumber: '1',
  loading: true,
  showComments: false
})

function hackerNewsApp(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LIST:
      return state.update('list', list =>  action.list)

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
        commentsList: List([])
      })

    default:
      return state;
  }
}

export default hackerNewsApp;
