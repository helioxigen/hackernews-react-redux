import React from 'react';
import { connect } from 'react-redux';

import { toggleComments } from '../Actions/Actions'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Comments extends React.Component{
  componentWillReceiveUpdate = () =>{

  }
  render(){
    return(
      <div>
        <Dialog
          title="Comments"
          modal={false}
          open={this.props.showComments}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          >
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return{
      showComments: state.get('showComments')
    }
}

function mapDispatchToProps(dispatch) {
  return{
    toggleComments: () => dispatch(toggleComments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
