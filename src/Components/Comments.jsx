import React from 'react';
import { connect } from 'react-redux';

import { closeComments, fetchComments } from '../Actions/Actions';

import CommentCard from './CommentCard';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class Comments extends React.Component{
  constructor(props){
    super(props);
    // props.fetchComments(props.storyKids);
  }
  componentWillReceiveProps = () => {
    this.props.fetchComments()
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
          {this.props.commentsList.map( comment => {
            return(
              <CommentCard
                ket={comment.get('id')}
                by={comment.get('by')}
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

function mapStateToProps(state) {
    return{
      showComments: state.get('showComments'),
      storyKids: state.get('storyKids'),
      commentsList: state.get('commentsList')
    }
}

function mapDispatchToProps(dispatch) {
  return{
    closeComments: () => dispatch(closeComments()),
    fetchComments: id => dispatch(fetchComments(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
