import React from 'react';

import StoryCard from '../Containers/StoryCard';

export default class List extends React.PureComponent {
  render() {
    return (
      <div className="list">
        {this.props.list.map(story => (
          <StoryCard
            key={story.get('id')}
            id={story.get('id')}
            kids={story.get('kids')}
            title={story.get('title')}
            by={story.get('by')}
            url={story.get('url')}
            time={story.get('time')}
          />
        ))}
      </div>
    );
  }
}
