import React from 'react';
import moment from 'moment';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { fetchComments } from '../Actions/fetchActions';

export default class StoryCard extends React.Component {
  handleOpen = () => {
    fetchComments(this.props.kids);
  }
  render() {
    const time = moment.unix(this.props.time).format('Do MMMM YYYY, hh:mm:ss');
    const answer = this.props.count === 1 ? 'answer' : 'answers';
    const comment = this.props.count === 1 ? 'comment' : 'comments';
    const countType = this.props.url ? comment : answer;
    const count = `${this.props.count} ${countType}`;
    return (
      <Card className="storycard">
        <CardHeader
          className="title"
          title={this.props.title}
          subtitle={`${this.props.by} / ${time}`}
        >
          <div className="count">
            {!!this.props.count && count}
          </div>
        </CardHeader>
        <CardActions>
          {this.props.url && <FlatButton label="Go To URL" target="_blank" href={this.props.url} />}
          {this.props.kids ?
            <FlatButton
              label={this.props.url ? 'Show Comments' : 'Show Answers'}
              onTouchTap={this.handleOpen}
            />
          :
            <FlatButton disabled label={this.props.url ? 'No Comments' : 'No Answers'} />}
        </CardActions>

      </Card>
    );
  }
}
