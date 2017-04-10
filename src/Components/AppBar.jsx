import React from 'react';

import AppBar from 'material-ui/AppBar';

import SettingsMenu from '../Containers/SettingsMenu';
import SearchBar from '../Containers/SearchBar';
import DynamicTitle from '../Containers/DynamicTitle';


const Appa = () => (
  <AppBar
    title={<DynamicTitle />}
    iconElementLeft={<SearchBar />}
    iconElementRight={<SettingsMenu />}
  />
);

export default Appa;
