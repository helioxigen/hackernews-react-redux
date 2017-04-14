// @flow
import axios from 'axios';

import { updateList, openComments, loading } from './Actions';

import store from '../Store/Store';

const upgradeData = (data: Array<number>) => {
  const pgNum = store.getState().get('pgNum');
  const pgSize = store.getState().get('pgSize');
  const promises = [];

  let range = {
    min: (pgNum - 1) * pgSize,
    max: pgNum * pgSize,
  };

  if (data.length !== 500) { // length of stories
    range = { min: 0, max: data.length };
  }

  for (let i = range.min; i < range.max; i += 1) {
    const id = data[i];
    promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
  }

  return axios.all(promises).then(results => (
    results.map(result => result.data)
  ));
};

export const fetchTab = (tabName: string) => {
  const url = `https://hacker-news.firebaseio.com/v0/${tabName}stories.json`;

  loading(true);
  axios.get(url)
       .then(res => upgradeData(res.data))
       .then(list => updateList(list))
       .then(() => loading(false));
};

export const fetchComments = (kids: Array<number>) => {
  upgradeData(kids).then(list => openComments(list));
};

export const search = (query: string) => {
  const params = `query=${query}`;
  const url = `http://hn.algolia.com/api/v1/search?${params}`;

  loading(true);
  axios.get(url)
       .then(results => results.data.hits.map(hit => parseInt(hit.objectID, 10)))
       .then(results => upgradeData(results))
       .then(list => updateList(list))
       .then(() => loading(false));
};
