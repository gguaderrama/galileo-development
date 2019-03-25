// Dependencies
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Styles
import { styles } from './styles';

const GoBack = props => <div className={props.classes.divContainerWide}>
  <div className={props.classes.divContainer}>
    <Button
      color="primary"
      className={props.classes.button}
      onClick={() => props.history.goBack(null)}>
      <i className="material-icons">keyboard_arrow_left</i>Regresar
    </Button>
  </div>
</div>

export default withStyles(styles)(GoBack);
