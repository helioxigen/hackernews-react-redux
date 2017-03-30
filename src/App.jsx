import React, {PropTypes} from 'react';

import Tabs from './Components/Tabs';
import List from './Components/List';
import Appa from './Components/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='inner'>
          <Appa/>
          <Tabs/>
          <List/>
        </div>
      </MuiThemeProvider>
    );
  }
}
