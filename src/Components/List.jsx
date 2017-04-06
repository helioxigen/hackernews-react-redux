import React, {PropTypes} from 'react';

import StoryCard from '../Containers/StoryCard';

export default class List extends React.Component {
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
