// @flow
import axios from 'axios';

import { updateList } from './Actions';

import store from '../Store/Store';

const getItem = id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

const resolve = (promises: Array<Promise<*>>): Promise<*> => (
  axios.all(promises).then(results => (
    results.map(result => result.data)
  ))
);

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
    const currentItemId = data[i];
    promises.push(getItem(currentItemId));
  }

  return resolve(promises);
};

export const fetchTab = (tabName: string) => {
  const url = `https://hacker-news.firebaseio.com/v0/${tabName}stories.json`;
  axios.get(url)
       .then(res => upgradeData(res.data))
       .then(list => updateList('stories', list));
};

export const fetchComments = (kids: Array<number>, type?: string) => {
  upgradeData(kids).then(list => updateList(type || 'comment', list));
};

export const search = (query: string) => {
  const params = `query=${query}`;
  const url = `http://hn.algolia.com/api/v1/search?${params}`;

  axios.get(url)
       .then(results => results.data.hits.map(hit => hit.objectID))
       .then(results => upgradeData(results))
       .then(list => updateList('search', list));
};
