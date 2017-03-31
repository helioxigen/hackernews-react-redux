import React from 'react';
import { connect } from 'react-redux';

import { changeSize, fetchList } from '../Actions/Actions';

import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

class SettingsMenu extends React.Component{
  handleResize = (e, item) => {
    this.props.changeSize(item.props.value);
    this.props.fetchList(this.props.currentTab);
  }
  render(){
    const nestedMenuItems = [{
      primaryText: '6',
      value: 6,
    }, {
      primaryText: '12',
      value: 12
    }, {
      primaryText: '24',
      value: 24
    }];
    return(
      <IconMenu
         className='settings-menu'
         iconButtonElement={<IconButton><Settings/></IconButton>}
         iconStyle={{color: 'white'}}
         anchorOrigin={{horizontal: 'left', vertical: 'top'}}
         targetOrigin={{horizontal: 'left', vertical: 'top'}}
       >
         <MenuItem primaryText="Size"
                   rightIcon={<ArrowDropRight />}
                   menuItems={nestedMenuItems.map(menuItem => (
                     <MenuItem
                       {...menuItem}
                       onTouchTap={event => this.handleResize(event, { props: {...menuItem} })}
                       />
                   ))}
         />
       </IconMenu>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{
    changeSize: size => dispatch(changeSize(size)),
    fetchList: list => dispatch(fetchList(list))
  }
}

function mapStateToProps(state){
  return{
    currentTab: state.get('currentTab')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu)
