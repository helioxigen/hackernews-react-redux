import React from 'react';

import StoryCard from '../Containers/StoryCard';

export default class List extends React.PureComponent {
  render() {
    return (
      <div className="list">
        {this.props.list.map(story => (
          <StoryCard
            key={story.id}
            id={story.id}
            count={story.descendants}
            kids={story.kids}
            title={story.title}
            by={story.by}
            url={story.url}
            time={story.time}
          />
        ))}
      </div>
    );
  }
}
