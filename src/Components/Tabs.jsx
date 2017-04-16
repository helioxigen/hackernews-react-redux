import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import Loader from './Loader';

export default class SwitchTabs extends React.PureComponent {
  render() {
    return (
      <div>
        <Tabs
          className="tabs"
          value={this.props.tab}
          onChange={this.props.onTabChange}
          inkBarStyle={{ backgroundColor: '#0090FF' }}
        >
          <Tab label="Top" value="top" />
          <Tab label="New" value="new" />
          <Tab label="Ask" value="ask" />
        </Tabs>
        <Loader loading={this.props.loading} />
      </div>
    );
  }
}
