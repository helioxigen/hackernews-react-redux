import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class CommentCard extends React.Component{
  render(){
    let time = moment.unix(this.props.time).format('Do MMMM YYYY, hh:mm:ss');
    return(
            <Card className='commentCard'>
              <CardHeader
                className='commentTitle'
                title={`${this.props.by} / ${time}`}
              />
            <CardText dangerouslySetInnerHTML={{__html: this.props.children}}/>
              <CardActions>
                <FlatButton label="Show Answers" onClick={this.handleOpen}/>
              </CardActions>

            </Card>
    )
  }
}
