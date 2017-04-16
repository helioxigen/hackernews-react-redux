import React from 'react';
import classNames from 'classnames';

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

import CommentCard from '../Containers/CommentCard';

export default class CommentsDialog extends React.PureComponent {
  render() {
    return (
      <div>
        <Dialog
          modal={false}
          open
          contentStyle={{ width: '90%', maxWidth: 'none' }}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
        >
          <div
            className={classNames(
              'loading-comments',
              { loaded: !!this.props.list.length })
            }
          >
            <CircularProgress size={70} thickness={5} />
          </div>
          {this.props.list.map(comment =>
            comment.by &&
            <CommentCard
              key={comment.id}
              by={comment.by}
              time={comment.time}
              kids={comment.kids}
            >
              {comment.text}
            </CommentCard>)
          }
        </Dialog>
      </div>
    );
  }
}
