import React from 'react';
import { connect } from 'react-redux';

import { closeComments } from '../Actions/Actions';
import { fetchComments } from '../Actions/fetchActions';

import CommentCard from '../Components/CommentCard';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class Comments extends React.Component{
  handleClose(){
    closeComments();
  }
  render(){
    return(
      <div>
        <Dialog
          title="Comments"
          modal={false}
          open={this.props.showComments}
          contentStyle={{width: '90%',maxWidth: 'none'}}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          >
          {this.props.commentsList.map( comment => {
            return(
              <CommentCard
                key={comment.get('id')}
                by={comment.get('by')}
                time={comment.get('time')}
              >
                {comment.get('text')}
              </CommentCard>
            )
          })}
        </Dialog>
      </div>
    )
  }
}

function mapState(state) {
    return{
      showComments: state.get('showComments'),
      commentsList: state.get('commentsList')
    }
}

export default connect(mapState)(Comments)
