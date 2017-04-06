import axios from 'axios';
import { Map, List } from 'immutable';
import { updateList, updateComments, loading, loadingComments} from './Actions';

import store from '../Store/Store';

export const upgradeDataWithPagination = (data) => {
    const pageNumber = store.getState().get('pageNumber');
    const pageLength = store.getState().get('pageLength');
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
      results.map( result => {
        let item = result.data;
        return {
          by: item.by,
          descendants: item.descendants,
          id: item.id,
          kids: item.kids,
          score: item.score,
          time: item.time,
          title: item.title,
          type: item.type,
          url: item.url
        }
      })).then(list => updateList(list));
};

export const fetchList = (tabName) => {
      return axios.get(`https://hacker-news.firebaseio.com/v0/${tabName}stories.json`)
                  .then(response => response.data)
                  .then(result => upgradeDataWithPagination(result))
};

export const fetchComments = () => {
    let kids = store.getState().get('storyKids');
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
