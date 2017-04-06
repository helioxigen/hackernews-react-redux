import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import Loader from './Loader';

export default class SwitchTabs extends React.Component {
  render() {
    return (
      <div>
        <Tabs className='tabs'
              value={this.props.tab}
              onChange={this.props.onTabChange}
        >
          <Tab label="Top" value="top"/>
          <Tab label="New" value="new"/>
          <Tab label="Ask" value="ask"/>
        </Tabs>
        <Loader/>
      </div>

    );
  }
}
