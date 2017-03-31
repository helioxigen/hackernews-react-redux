/**
 *  hackerNewsApp reducer
 */
import { Map, List } from 'immutable';


// Import Action Types
import {
         CHANGE_TAB, UPDATE_LIST, CHANGE_SIZE,
         LOADING, CLOSE_COMMENTS, SHOW_COMMENTS
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
      return state.update('list', list => {
        let d = action.data;
        return list.push(Map({
          by: d.by,
          descendants: d.descendants,
          id: d.id,
          kids: List([d.kids]),
          score: d.score,
          time: d.time,
          title: d.title,
          type: d.story,
          url: d.url
        }))
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
      return state.update('loading',
        boolean => action.boolean
      )
    case CLOSE_COMMENTS:
      return state.merge({
        showComments: false,
        commentsList: List([])
      })
    default:
      return state;
  }
}

export default hackerNewsApp;
