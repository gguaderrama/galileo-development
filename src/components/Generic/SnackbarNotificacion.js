import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const SnackbarNotificacion = props => {
    const { classes } = props;
    const { opened, verticalPosition, horizontalPosition, duration, message, type } = props;
    const { onClose } = props;
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: verticalPosition ? verticalPosition : 'top',
                    horizontal: horizontalPosition ? horizontalPosition : 'right',
                }}
                open={opened}
                autoHideDuration={duration}
                onClose={onClose}
            >
                <SnackbarContent
                    className={type === 'warning' ? classes.snackbarWarning : type === 'error' ? classes.snackbarError : type === 'information' ? classes.snackbarInformation : type === 'success' ? classes.snackbarSuccess : null}
                    message={
                        <div className={classes.divTitleFlex}>
                            <span>{message}</span>
                        </div>
                    }
                    action={
                        <IconButton
                            color="inherit"
                            onClick={onClose}
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    }
                >
                </SnackbarContent>
            </Snackbar>
        </div>
    );
};

SnackbarNotificacion.propTypes = {
    opened: PropTypes.bool,
    verticalPosition: PropTypes.string,
    horizontalPosition: PropTypes.string,
    duration: PropTypes.number,
    message: PropTypes.string,
    type: PropTypes.string,
    onClose: PropTypes.func,
};

export default withStyles(styles)(SnackbarNotificacion);