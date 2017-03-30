import React from 'react';
import { connect } from 'react-redux';

import { changeSize } from '../Actions/Actions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import Settings from 'material-ui/svg-icons/action/settings';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class SettingsMenu extends React.Component{
  handleResize = (size) => {
    this.props.changeSize(size);
  }
  render(){
    return(
      <IconMenu
         className='settings-menu'
         iconButtonElement={<IconButton><Settings/></IconButton>}
         anchorOrigin={{horizontal: 'left', vertical: 'top'}}
         targetOrigin={{horizontal: 'left', vertical: 'top'}}
       >
         <MenuItem primaryText="Size"
                   rightIcon={<ArrowDropRight />}
                   menuItems={[
                     <MenuItem primaryText="12" onClick={this.handleResize(6)}/>,
                     <MenuItem primaryText="12" onClick={this.handleResize(12)}/>,
                     <MenuItem primaryText="24" onClick={this.handleResize(24)}/>
                   ]}
         />
       </IconMenu>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{
    changeSize: size => dispatch(changeSize(size))
  }
}

export default connect(null, mapDispatchToProps)(SettingsMenu)
