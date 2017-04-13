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
    return (
      <Card className="storycard">
        <CardHeader
          className="title"
          title={this.props.title}
          subtitle={`${this.props.by} / ${time}`}
        />
        <CardActions>
          {this.props.url ? <FlatButton label="Go To URL" href={this.props.url} /> : ''}
          {this.props.kids ?
            <FlatButton
              label={this.props.url ? 'Show Comments' : 'Show Answers'}
              onClick={this.handleOpen}
            />
          :
            <FlatButton disabled label={this.props.url ? 'No Comments' : 'No Answers'} />}
        </CardActions>

      </Card>
    );
  }
}
