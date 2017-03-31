import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';
import { fetchList } from '../Actions/Actions';

class List extends React.Component {
  render() {
    return (
      <div className='list'>
        {this.props.list.map( story =>{
          let time = convertTimestamp(story.get('time'));
          return <StoryCard key={story.get('id')}
                            title={story.get('title')}
                            by={story.get('by')}
                            url={story.get('url')}
                            time={time}
          />
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.get('list')
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchList: listName => dispatch(fetchList(listName))
  }
}

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}

export default connect(mapStateToProps, mapDispatchToProps)(List);