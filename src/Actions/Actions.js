import {
        UPDATE_LIST, CHANGE_TAB, CHANGE_SIZE,
        CHANGE_PAGE, LOADING, OPEN_COMMENTS,
        CLOSE_COMMENTS
      } from './constansts';

import axios from 'axios';

export const updateList = data => ({type: UPDATE_LIST, data});

export const changeTab = tab => ({type: CHANGE_TAB, tab});

export const changeSize = size => ({type: CHANGE_SIZE, size});

export const changePage = page => ({type: CHANGE_PAGE, page});

export const loading = bool => ({type: LOADING, bool});

export const openComments = id => ({type: OPEN_COMMENTS, id});

export const closeComments = () => ({type: CLOSE_COMMENTS});

export const upgradeDataWithPagination = (data) => {
  return (dispatch, getState) => {
    let pageNumber = getState().get('pageNumber');
    let pageLength = getState().get('pageLength');
    let range = {
      min: (pageNumber-1)*pageLength,
      max: pageNumber*pageLength
    };
    for (let i = range.min; i < range.max; i++) {
      let currentItem = data[i];
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${currentItem}.json`)
           .then(response => response.data)
           .then(result => dispatch(updateList(result)))
           .then(result => dispatch(loading(false)))
    }
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
