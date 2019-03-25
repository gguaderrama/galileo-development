// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles } from './styles/styles';

//
const DialogNotificationModal = props => {
  const {
    title,
    icon,
    iconColor,
    content,
    subcontent,
    opened,
    handleClose,
    handleOnClose,
    isLoadingDialog=false,
    flag=false,
    buttonsHidden=false,
    classes
  } = props;
  // Render
  return(
    <Dialog
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      open={opened}
      onClose={handleClose}
      scroll='paper'
      maxWidth="md">
        {title && <DialogTitle>
          <div className={classes.divTitleFlex}>
            <Icon className={classes.button} color={iconColor} children={icon || null} />
            <Typography variant='h4' children={title} />
          </div>
        </DialogTitle>}
        <DialogContent>
          <div>
            {content &&
              <div className={classes.divContainer}>
                {typeof(content) === 'string'
                  ? <Typography variant='h5' children={content} />
                  : content
                }
              </div>
            }
            {subcontent &&
              <div className={classes.divContainer}>
                <Typography variant='body1' children={subcontent} />
              </div>
            }
            { buttonsHidden ||
              <div className={classes.divButttonContainer}>
                <Button
                  value="acept"
                  variant="contained"
                  color="primary"
                  onClick={flag ? handleOnClose : handleClose}>Aceptar</Button>
                {flag &&
                  <Button
                    value="cancel"
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}>Cancelar</Button>
                }
              </div>
            }
          </div>
        </DialogContent>
    </Dialog>
  )
}

DialogNotificationModal.propTypes = {
    opened: PropTypes.bool.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    subcontent: PropTypes.string,
    isLoadingDialog: PropTypes.bool,
    //
    handleClose: PropTypes.func,
};

export default withStyles(styles)(DialogNotificationModal);
