import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { changePage } from '../Actions/Actions';

import Pagination from 'material-ui-pagination';

class Paginatron extends React.Component {
  render() {
    return (
      <Pagination
        total='5'
        display='5'
        current={this.props.pageNumber}
        onChange={this.changePage}
      />
    );
  }
}

function mapStateToProps(state) {
  return{
    pageNumber: state.get('pageNumber')
  }
}

function mapDispatchToProps(dispatch) {
  return{
    changePage: page => dispatch(changePage(page))
  }
}

export default connect(null, mapDispatchToProps)(Paginatron)
