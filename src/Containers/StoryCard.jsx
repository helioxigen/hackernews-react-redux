import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { openComments } from '../Actions/Actions';
import { fetchComments } from '../Actions/fetchActions';

export default class StoryCard extends React.Component{
  handleOpen = () => {
    openComments(this.props.kids);
    fetchComments();
  }
  render(){
    let time = moment.unix(this.props.time).format('Do MMMM YYYY, hh:mm:ss');
    return(
      <Card className='storycard'>
        <CardHeader
          className='title'
          title={this.props.title}
          subtitle={`${this.props.by} / ${time}`}
        />
        <CardActions>
          {this.props.url ? <FlatButton label="Go To URL" href={this.props.url}/> : ''}
          {this.props.kids ?
            <FlatButton label={this.props.url ? 'Show Comments' : 'Show Answers'}
                        onClick={this.handleOpen}/> :
            <FlatButton disabled label={this.props.url ? 'No Comments' : 'No Answers'}/>}
        </CardActions>

      </Card>
    )
  }
}
