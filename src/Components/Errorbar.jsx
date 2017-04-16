import React from 'react';

import Snackbar from 'material-ui/Snackbar';


const Errorbar = props => (
  <Snackbar
    open={props.message}
    message={props.message}
    autoHideDuration={4000}
    onRequestClose={props.onHide}
  />
);

export default Errorbar;
