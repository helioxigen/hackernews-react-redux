import React from 'react';
import { connect } from 'react-redux';

import Pager from './Pager';

class DynamicTitle extends React.PureComponent {
  render() {
    return (
      <div>
        HAXXXZOR NEWS
        <span
          className="searchtitle"
          style={{ display: this.props.searchMode ? 'inline-block' : 'none' }}
        >
        :SEARCH
        </span>
        <Pager />
      </div>
    );
  }
}

function mapState(state) {
  return {
    searchMode: state.get('searchMode'),
  };
}

export default connect(mapState)(DynamicTitle);
