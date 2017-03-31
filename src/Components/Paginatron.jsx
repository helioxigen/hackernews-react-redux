import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { changePage } from '../Actions/Actions';

import Pagination from 'material-ui-pagination';

class Paginatron extends React.Component {
  changePage = (page) => {
    this.props.changePage(page);
  }
  render() {
    return (
      <div className='pagination'>
        <Pagination
          total='50'
          display='10'
          current={this.props.pageNumber}
          onChange={this.changePage}
        />
      </div>
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
