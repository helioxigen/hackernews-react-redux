import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import Loader from './Loader';

import { changeTab, fetchList } from '../Actions/Actions';

class SwitchTabs extends React.Component {
  constructor(props){
    super(props)
    props.fetchList(props.currentTab);
  }
  handleChange = (value) => {
    // changeTab(value);
    // this.props.fetchList(value);
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
    fetchList: list => dispatch(fetchList(list))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SwitchTabs)
