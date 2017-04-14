import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Tabs from '../Components/Tabs';
import List from '../Components/List';
import Appa from '../Components/AppBar';
import CommentsDialog from '../Components/CommentsDialog';

import { changeTab, searchMode, closeComments } from '../Actions/Actions';
import { fetchTab } from '../Actions/fetchActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    fetchTab(props.currentTab);
  }
  handleTabChange = (tab) => {
    if (this.props.searchMode) {
      searchMode(false);
    }
    changeTab(tab);
    fetchTab(tab);
  }
  handleCloseComments() {
    closeComments();
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="inner">
          <Appa showSearchTitle={this.props.searchMode} />
          <Tabs
            tab={this.props.currentTab}
            onTabChange={this.handleTabChange}
            loading={this.props.loading}
          />
          <List list={this.props.storyList} />
          {this.props.comments.map(list => (
            <CommentsDialog
              key={list[0].parent}
              list={list}
              handleClose={this.handleCloseComments}
            />
          ))}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapState(state) {
  return {
    currentTab: state.get('currentTab'),
    searchMode: state.get('searchMode'),
    comments: state.get('comments'),
    storyList: state.get('stories'),
    loading: state.get('loading'),
  };
}

export default connect(mapState)(App);
