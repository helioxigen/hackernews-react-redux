import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { changeSize } from '../Actions/Actions';
import { fetchList } from '../Actions/fetchActions';

class SettingsMenu extends React.Component {
  handleResize = (e, item) => {
    changeSize(item.props.value);
    fetchList(this.props.currentTab);
  }
  render() {
    const nestedMenuItems = [{
      primaryText: '6',
      value: 6,
    }, {
      primaryText: '12',
      value: 12,
    }, {
      primaryText: '24',
      value: 24,
    }];
    return (
      <IconMenu
        className="settings-menu"
        iconButtonElement={<IconButton><Settings /></IconButton>}
        iconStyle={{ color: 'white' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Size"
          rightIcon={<ArrowDropRight />}
          menuItems={nestedMenuItems.map(menuItem => (
            <MenuItem
              {...menuItem}
              onTouchTap={event => this.handleResize(event, { props: { ...menuItem } })}
            />
          ))}
        />
      </IconMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTab: state.get('currentTab'),
  };
}

export default connect(mapStateToProps)(SettingsMenu);
