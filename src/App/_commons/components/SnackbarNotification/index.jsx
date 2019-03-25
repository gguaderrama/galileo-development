import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

// Actions
import * as actions from 'redux/shared-reducers/app-actions';

// _commons
import { ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import { TitlePanelContainer } from 'App/_commons/elements/PanelContainer';

const SnackbarNotificacion = props => {
  const closeIt = () => props.closeSnackbarNotification();
  const { classes } = props;
  const { opened, verticalPosition, horizontalPosition, duration, icon = null, message, type, title = 'Snackbar title' } = props;
  const { onClose } = props;
  //
  const classType = type === 'warning' ? classes.snackbarWarning
    : type === 'error' ? classes.snackbarError
    : type === 'information' ? classes.snackbarInformation
    : type === 'success' ? classes.snackbarSuccess : null
  const defaultIcons = {
    error: 'highlight_off_outline',
    warning: 'error_outline',
    success: 'check_circle_outline',
    information: 'help_outline'
  }
  //
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: verticalPosition,
          horizontal: horizontalPosition,
        }}
        open={opened}
        autoHideDuration={duration}
        onClose={onClose || closeIt} >
              <SnackbarContent
                className={classNames(classes.root, classes.message, classType)}
                message={
                  <div className={classNames(classes.divTitleFlex, classes[type])}>
                    <div style={{padding:30}}>
                      <div style={{display: 'inline-block', marginBottom: 10}}>
                        <Icon className={classes.button}>{icon || defaultIcons[type]}</Icon>
                        <TitlePanelContainer style={{float: 'left'}}>{title}</TitlePanelContainer>
                      </div>
                      <div style={{fontSize: '1.15em', color: '#222'}}>{message}</div>
                      <span className={classes.buttonAceptar}>
                        <ButtonOriginSecondary
                          color="inherit"
                          onClick={onClose || closeIt}
                          children="Aceptar"/>
                      </span>
                    </div>
                  </div>
              }/>
      </Snackbar>
    </div>
  );
};

SnackbarNotificacion.propTypes = {
    opened: PropTypes.bool.isRequired,
    verticalPosition: PropTypes.string.isRequired,
    horizontalPosition: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

    onClose: PropTypes.func,
};

export default connect(null, actions)(withStyles(styles)(SnackbarNotificacion));
