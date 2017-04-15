import React from 'react';

import Snackbar from 'material-ui/Snackbar';


const Errorbar = props => (
  <Snackbar
    message={props.message}
    autoHideDuration={4000}
  />
);

export default Errorbar;
