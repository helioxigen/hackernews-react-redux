import axios from 'axios';
import { updateList, updateComments, loading, loadingComments, toggleSearch } from './Actions';

import store from '../Store/Store';

export const search = (query) => {
  // const page = store.getState().get('pageNumber');
  // const size = store.getState().get('pageLength');
  const params = `query=${query}`;
  const url = `http://hn.algolia.com/api/v1/search?${params}`;

  axios.get(url)
       .then( results => results.data.hits.map( hit => hit.objectID ))
       .then( results => upgradeDataWithPagination(results))
}

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

    for (let i = 0; i < kids.size; i++) {
      let kid = kids.get(i);
      promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`));
    }

    axios.all(promises).then( kids => {
      return kids.map( result => {
        let comment = result.data;
        return {
          by: comment.by,
          id: comment.id,
          kids: comment.kids,
          parent: comment.parent,
          text: comment.text,
          time: comment.time,
          type: comment.type
        }
      })
    }).then( commentList => updateComments(commentList))
}
