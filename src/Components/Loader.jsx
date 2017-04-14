import React from 'react';
import classNames from 'classnames';

import LinearProgress from 'material-ui/LinearProgress';

class Loader extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames({
          loader: true,
          loading: this.props.loading,
          loaded: !this.props.loading,
        })}
      >
        <LinearProgress mode="indeterminate" />
      </div>
    );
  }
}

export default Loader;
