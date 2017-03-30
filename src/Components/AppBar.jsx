import React from 'react';
import { connect } from 'react-redux';

import { changeSize } from '../Actions/Actions';
import SettingsMenu from './SettingsMenu';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

export default class Appa extends React.Component{
  render(){
    return(
      <AppBar
        title={'HAXXZOR NEWS'}
        iconElementLeft={<IconButton><Search/></IconButton>}
        iconElementRight={<SettingsMenu/>}
      />
    )
  }
}
