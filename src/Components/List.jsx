import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';

class List extends React.Component {
  render() {
    return (
      <div className='list'>
        {this.props.list.map( story =>{
          return <StoryCard key={story.get('id')}
                            id={story.get('id')}
                            kids={story.get('kids')}
                            title={story.get('title')}
                            by={story.get('by')}
                            url={story.get('url')}
                            time={story.get('time')}
          />
        })}
      </div>
    );
  }
}

function mapState(state) {
  return {
    list: state.get('list')
  }
}

export default connect(mapState)(List);
