import {
        UPDATE_LIST, CHANGE_TAB, CHANGE_SIZE,
        CHANGE_PAGE, LOADING, OPEN_COMMENTS,
        CLOSE_COMMENTS, LOAD_COMM, UPDATE_COMMENTS
      } from './constansts';

import axios from 'axios';
import { Map, List } from 'immutable';

export const updateList = list => ({type: UPDATE_LIST, list});

export const changeTab = tab => ({type: CHANGE_TAB, tab});

export const changeSize = size => ({type: CHANGE_SIZE, size});

export const changePage = page => ({type: CHANGE_PAGE, page});

export const loading = bool => ({type: LOADING, bool});

export const loadingComments = bool => ({type: LOAD_COMM, bool})

export const openComments = kids => ({type: OPEN_COMMENTS, kids});

export const updateComments = list => ({type: UPDATE_COMMENTS, list})

export const closeComments = () => ({type: CLOSE_COMMENTS});

export const upgradeDataWithPagination = (data) => {
  return (dispatch, getState) => {
    const pageNumber = getState().get('pageNumber');
    const pageLength = getState().get('pageLength');
    let promises = [];

    const range = {
      min: (pageNumber-1)*pageLength,
      max: pageNumber*pageLength
    };

    for (let i = range.min; i < range.max; i++) {
      let currentItem = data[i];
      promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${currentItem}.json`))
    }

    axios.all(promises).then(results =>
      List(results).map( result => {
        let item = result.data;
        return Map({
          by: item.by,
          descendants: item.descendants,
          id: item.id,
          kids: item.kids,
          score: item.score,
          time: item.time,
          title: item.title,
          type: item.type,
          url: item.url
        })
      })).then(list => dispatch(updateList(list)))
         .then(res => dispatch(loading(false)))
  }
};

export const fetchList = (tabName) => {
  return (dispatch) => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/${tabName}stories.json`)
                .then(response => response.data)
                .then(result => dispatch(upgradeDataWithPagination(result)))
                .then(result => dispatch(loading(true)))
  }
};

export const fetchComments = () => {
  return (dispatch, getState) => {
    let kids = getState().get('storyKids').toArray();
    let promises = [];

    for (let i = 0; i < kids.length; i++) {
      let kid = kids[i];
      promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`));
    }

    axios.all(promises).then( kids =>
    List(kids).map( result => {
      let comment = result.data;
      return Map({
        by: comment.by,
        id: comment.id,
        kids: comment.kids,
        parent: comment.parent,
        text: comment.text,
        time: comment.time,
        type: comment.type
      })
    })).then( commentList => dispatch(updateComments(commentList)))
       .then( res => dispatch(loadingComments(false)))
  }
}
