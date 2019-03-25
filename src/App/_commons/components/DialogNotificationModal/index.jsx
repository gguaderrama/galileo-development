// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles } from './styles';

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
    error=null,
    buttonsHidden=false,
    classes
  } = props;

  // Render
  if (!isLoadingDialog)
    return(
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={opened}
        onClose={handleClose}
        scroll='paper'
        fullWidth={false}
        maxWidth={false}
        >
        { title &&
          <DialogTitle>
            <div className={classes.divTitleFlex}>
              {icon && <Icon className={classes.button} color={iconColor} children={icon || null} />}
              <Typography variant='h4' children={title} />
            </div>
          </DialogTitle>
        }

        <DialogContent style={!buttonsHidden ? {minWidth:450} : null}>
          <div>
            { content &&
              <div className={classes.divContainer}>
                {typeof(content) === 'string'
                  ? <Typography variant='h5' children={content} />
                  : content
                }
              </div>
            }
            { subcontent && <DialogContentText>{subcontent}</DialogContentText> }
            { buttonsHidden ||
              <DialogActions>
                { flag &&
                  <Button
                    value="cancel"
                    className={classes.button}
                    color="primary"
                    onClick={handleClose}>Cancelar</Button>
                }
                <Button
                  className={error && classes.errorButton}
                  value="acept"
                  variant="contained"
                  color="primary"
                  onClick={flag ? handleOnClose : handleClose}>Aceptar</Button>
              </DialogActions>
            }
          </div>
        </DialogContent>

      </Dialog>
    )
  //
  return <Modal open={opened} disableAutoFocus={true}>
    <div className={classes.divContainerLoading}>
      <div>
        <div className={classes.divLoadingSpiner}><CircularProgress size={80} /></div>
        <div className={classes.divLoadingText}><Typography variant='h5'>Cargando Datos...</Typography></div>
      </div>
    </div>
  </Modal>
}

DialogNotificationModal.propTypes = {
    opened: PropTypes.bool,
    title: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    subcontent: PropTypes.string,
    isLoadingDialog: PropTypes.bool,
    //
    handleClose: PropTypes.func,
};

export default withStyles(styles)(DialogNotificationModal);
