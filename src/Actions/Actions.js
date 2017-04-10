import { createAction } from 'redux-act';

export const updateList = createAction('Update list', list => ({ list }));
export const changeTab = createAction('Change Tab', tab => ({ tab }));
export const changeSize = createAction('Change List Size', size => ({ size }));
export const changePage = createAction('Change page', page => ({ page }));
export const loading = createAction('loading', bool => ({ bool }));
export const searchMode = createAction('toggle search mode', bool => ({ bool }));
export const toggleSearch = createAction('toggle search');
export const loadingComments = createAction('loading comments');
export const openComments = createAction('Open comments', kids => ({ kids }));
export const updateComments = createAction('Update comments', list => ({ list }));
export const closeComments = createAction('Close comments');
