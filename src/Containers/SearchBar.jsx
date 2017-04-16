import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import Popover from 'material-ui/Popover';

import { searchMode, changePage } from '../Actions/Actions';
import { search } from '../Actions/fetchActions';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      showSearch: false,
    };
  }
  toggleSearch = (event) => {
    event.preventDefault();
    this.setState({
      showSearch: true,
    });
  }
  handleSearchQuery = (e) => {
    e.preventDefault();
    this.handlePopoverClose();
    searchMode(true);
    changePage(-(this.props.pgNum - 1));
    search(this.state.searchQuery);
    this.setState({
      searchQuery: '',
    });
  }
  handleChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  }
  handlePopoverClose = () => {
    this.setState({
      showSearch: false,
    });
  }
  render() {
    return (
      <div>
        <IconButton
          className="searchbutton"
          iconStyle={{ color: 'white' }}
          onTouchTap={this.toggleSearch}
        >
          <Search />
        </IconButton>
        <Popover
          open={this.state.showSearch}
          useLayerForClickAway={screen.width < 720}
          anchorEl={document.getElementsByClassName('searchbutton')[0]}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          style={{ padding: '0px 10px 0px 10px' }}
          onRequestClose={this.handlePopoverClose}
        >
          <form onSubmit={this.handleSearchQuery}>
            <TextField
              fullWidth
              hintText="Search"
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
          </form>
        </Popover>
      </div>
    );
  }
}


function mapState(state) {
  return {
    pgNum: state.get('pgNum'),
  };
}

export default connect(mapState)(SearchBar);
