import React from 'react';
import moment from 'moment';

import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import { fetchComments } from '../Actions/fetchActions';

export default class CommentCard extends React.Component {
  handleOpen = () => {
    fetchComments(this.props.kids);
  }
  render() {
    const time = moment.unix(this.props.time).format('Do MMMM YYYY, hh:mm:ss');
    return (
      <Card className="commentCard">
        <CardHeader
          className="commentTitle"
          title={`${this.props.by} / ${time}`}
        />
        <CardText dangerouslySetInnerHTML={{ __html: this.props.children }} />
        {this.props.kids &&
          <CardActions>
            <FlatButton
              label="Show Answers"
              onClick={this.handleOpen}
            />
          </CardActions>
        }
      </Card>
    );
  }
}
