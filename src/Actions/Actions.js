import { createAction } from 'redux-act';

export const updateList = createAction('Update list', list => ({ list }));
export const error = createAction('Error', errorMsg => ({ errorMsg }));
export const cacheIds = createAction('Caching Item Ids', ids => ({ ids }));
export const openComments = createAction('Open Comments', list => ({ list }));
export const changeTab = createAction('Change Tab', tab => ({ tab }));
export const changeSize = createAction('Change List Size', size => ({ size }));
export const changePage = createAction('Change page', page => ({ page }));
export const searchMode = createAction('Toggle Search Mode', bool => ({ bool }));
export const loading = createAction('Loading', bool => ({ bool }));
export const closeComments = createAction('Close Comments');
