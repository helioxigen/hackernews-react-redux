import React from 'react';
import { connect } from 'react-redux';

import { closeComments } from '../Actions/Actions'

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
          onRequestClose={this.props.closeComments}
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
    closeComments: () => dispatch(closeComments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
