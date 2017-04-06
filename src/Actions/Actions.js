import { createAction } from 'redux-act';
import axios from 'axios';
import { Map, List } from 'immutable';
import { store } from '../index';

export const updateList = createAction('Update list', list => ({list}));
export const changeTab  = createAction('Change Tab', tab => ({tab}));
export const changeSize = createAction('Change List Size', size => ({size}));
export const changePage = createAction('Change page', page => ({page}));
export const loading    = createAction('loading');
export const loadingComments = createAction('loading comments');
export const openComments    = createAction('Open comments', kids => ({kids}));
export const updateComments  = createAction('Update comments', list => ({list}));
export const closeComments   = createAction('Close comments');


const upgradeDataWithPagination = (data, dipatch) => {
  return (dispatch, getState) => {
    const pageNumber = getState().get('pageNumber');
    const pageLength = getState().get('pageLength');
    let promises = [];

    const range = {
      min: (pageNumber-1)*pageLength,
      max: pageNumber*pageLength
    };

    console.log();

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
  }
};

const fetchList = (dispatch, tabName) => {
    return (dispatch) => {
      return axios.get(`https://hacker-news.firebaseio.com/v0/${tabName}stories.json`)
                  .then(response => response.data)
                  .then(result => upgradeDataWithPagination(result))
    }
};

const fetchComments = () => {
  return (getState) => {
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
    })).then( commentList => updateComments(commentList))
       .then( res => loadingComments(false))
  }
}
