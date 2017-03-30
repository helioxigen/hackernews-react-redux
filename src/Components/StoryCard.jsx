import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class StoryCard extends React.Component{
  render(){
    return(
      <Card className='storycard'>
        <CardHeader
          className='title'
          title={this.props.title}
          subtitle={`${this.props.by} / ${this.props.time}`}
        />
        <CardActions>
          <FlatButton label="Go To URL" href={this.props.url}/>
          <FlatButton label="Show Comments" on />
        </CardActions>

      </Card>
    )
  }
}
