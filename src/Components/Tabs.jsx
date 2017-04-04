import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import Loader from './Loader';

import { changeTab, fetchList } from '../Actions/Actions';

class SwitchTabs extends React.Component {
  constructor(props){
    super(props)
    props.fetchList(this.props.currentTab);
  }
  handleChange = (value) => {
    this.props.changeTab(value);
    this.props.fetchList(value);
  }
  render() {
    return (
      <div>
        <Tabs className='tabs'
              value={this.props.currentTab}
              onChange={this.handleChange}
        >
          <Tab label="Top" value="top"/>
          <Tab label="New" value="new"/>
          <Tab label="Ask" value="ask"/>
        </Tabs>
        <Loader/>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    currentTab: state.get('currentTab')
  }
}

function mapDispatchToProps(dispatch){
  return{
    changeTab: tab => dispatch(changeTab(tab)),
    fetchList: listName => dispatch(fetchList(listName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchTabs)
