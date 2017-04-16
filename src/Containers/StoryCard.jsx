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
    const actionLabel = this.props.url ? 'Show Comments' : 'Show Answers';
    const labelWithCount = `${actionLabel} (${this.props.count})`;
    return (
      <Card className="storycard">
        <CardHeader
          className="title"
          title={this.props.title}
          subtitle={`${this.props.by} / ${time}`}
        />
        <CardActions>
          {this.props.url && <FlatButton label="Go To URL" target="_blank" href={this.props.url} />}
          {this.props.kids ?
            <FlatButton
              label={labelWithCount}
              onTouchTap={this.handleOpen}
            />
          :
            <FlatButton disabled label={this.props.url ? 'No Comments' : 'No Answers'} />}
        </CardActions>

      </Card>
    );
  }
}
