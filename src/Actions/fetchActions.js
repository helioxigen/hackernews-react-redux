// @flow
import axios from 'axios';

import { updateList, openComments, loading,
         cacheIds, changePage } from './Actions';

import store from '../Store/Store';

const cache = (ids) => {
  const cachedList = store.getState().get('cache');

  if (ids !== cachedList) {
    cacheIds(ids);
  }
};

const upgradeData = (ids?: Array<number>) => {
  const pgNum = store.getState().get('pgNum');
  const pgSize = store.getState().get('pgSize');

  const data = ids || store.getState().get('cache');

  const promises = [];

  let range = {
    min: (pgNum - 1) * pgSize,
    max: pgNum * pgSize,
  };

  if (typeof ids !== 'undefined') {
    range = { min: 0, max: data.length };
  }

  for (let i = range.min; i < range.max; i += 1) {
    const id = data[i];
    if (id) {
      promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
    }
  }

  return axios.all(promises).then(results => (
    results.map(result => result.data)
  ));
};

export const getPage = (pageOp: number) => {
  const currentPage = store.getState().get('pgNum');
  const negativePage = currentPage === 1 && pageOp === -1;
  if (!negativePage) {
    loading(true);
    changePage(pageOp);
    upgradeData().then(list => updateList(list)).then(() => loading(false));
  }
};

export const fetchTab = (tabName: string) => {
  const url = `https://hacker-news.firebaseio.com/v0/${tabName}stories.json`;

  loading(true);
  axios.get(url)
       .then(res => cache(res.data))
       .then(upgradeData)
       .then(list => updateList(list))
       .then(() => loading(false));
};

export const fetchComments = (kids: Array<number>) => {
  upgradeData(kids).then(list => openComments(list));
};

export const search = (query: string) => {
  const params = `query=${query}&hitsPerPage=100`;
  const url = `http://hn.algolia.com/api/v1/search?${params}`;

  loading(true);
  axios.get(url)
       .then(results => results.data.hits.map(hit => parseInt(hit.objectID, 10)))
       .then(results => cache(results))
       .then(upgradeData)
       .then(list => updateList(list))
       .then(() => loading(false));
};
