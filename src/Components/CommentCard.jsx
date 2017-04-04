import React from 'react';
import { connect } from 'react-redux';


import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class CommentCard extends React.Component{
  render(){
    return(
            <Card className='commentCard'>
              <CardHeader
                className='commentTitle'
                title={`${this.props.by}`}
              />
            <CardText>
              {this.props.children}
            </CardText>
              <CardActions>
                <FlatButton label="Show Answers" onClick={this.handleOpen}/>
              </CardActions>

            </Card>
    )
  }
}


export default connect(null)(CommentCard)
