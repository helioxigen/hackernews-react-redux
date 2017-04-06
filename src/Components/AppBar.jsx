import React from 'react';

import SettingsMenu from '../Containers/SettingsMenu';
import SearchBar from '../Containers/SearchBar';
import DynamicTitle from '../Containers/DynamicTitle';

import AppBar from 'material-ui/AppBar';

export default class Appa extends React.Component{
  render(){
    return(
      <AppBar
        title={<DynamicTitle/>}
        iconElementLeft={<SearchBar/>}
        iconElementRight={<SettingsMenu/>}
      />
    )
  }
}
