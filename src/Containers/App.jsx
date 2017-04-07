import React from 'react';
import { connect } from 'react-redux';

import Tabs from '../Components/Tabs';
import List from '../Components/List';
import Appa from '../Components/AppBar';
import Comments from './Comments';

import { changeTab, searchMode } from '../Actions/Actions';
import { fetchList } from '../Actions/fetchActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props){
    super(props)
    fetchList(props.currentTab)
  }
  handleTabChange = (tab) => {
    if (this.props.searchMode) {
      searchMode(false);
    }
    changeTab(tab);
    fetchList(tab);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className='inner'>
          <Appa showSearchTitle={this.props.searchMode}/>
          <Tabs
            tab={this.props.currentTab}
            onTabChange={this.handleTabChange}
          />
          <List list={this.props.list}/>
          <Comments/>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapState(state){
  return{
    currentTab: state.get('currentTab'),
    searchMode: state.get('searchMode'),
    list: state.get('storyList')
  }
}

export default connect(mapState)(App)
