import { createAction } from 'redux-act';

export const updateList = createAction('Update list', (type, list) => ({ type, list }));
export const changeTab = createAction('Change Tab', tab => ({ tab }));
export const changeSize = createAction('Change List Size', size => ({ size }));
export const changePage = createAction('Change page', page => ({ page }));
export const searchMode = createAction('Toggle Search Mode', bool => ({ bool }));
export const toggleSearch = createAction('Toggle Search');
export const toggleComments = createAction('Toggle Comments');
