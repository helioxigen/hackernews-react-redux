import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import { getPage } from '../Actions/fetchActions';

const buttonStyle = { width: '50px', height: '50px', padding: '12px' };
const iconStyle = { width: '30px', height: '30px', color: 'white' };

class Pager extends React.Component {
  handleLeftTap = () => {
    getPage(-1);
  }
  handleRightTap = () => {
    getPage(1);
  }
  render() {
    return (
      <div className="pager">
        <IconButton
          onTouchTap={this.handleLeftTap}
          iconStyle={iconStyle}
          style={buttonStyle}
        >
          <ArrowLeft />
        </IconButton>
        <IconButton
          onTouchTap={this.handleRightTap}
          iconStyle={iconStyle}
          style={buttonStyle}
        >
          <ArrowRight />
        </IconButton>
      </div>
    );
  }
}

function mapState(state) {
  return {
    page: state.get('pageNumber'),
    currentTab: state.get('currentTab'),
  };
}

export default connect(mapState)(Pager);
