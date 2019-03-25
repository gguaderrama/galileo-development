import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const DialogoNotificacion = props => {
  const {
    opened = false,
    subcontent,
    content,
    isLoadingDialog = false,
    handleClose,
    handleOnClose,
    title,
    icon,
    iconColor,
    flag = false,
    buttonsHidden = false,
    classes
  } = props;

  if (!isLoadingDialog)
    return (
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={opened}
        onClose={handleClose}
        scroll='paper'
        maxWidth="md"
      >
        {title &&
          <DialogTitle>
            <div className={classes.divTitleFlex}>
              {icon && <Icon className={classes.button} color={iconColor} children={icon || null} />}
              title
                  {/*<Typography variant='h4' children={title} />*/}
            </div>
          </DialogTitle>
        }
        <DialogContent>
          {content &&
            <div className={classes.divContainer}>
              {typeof (content) === 'string'
                ? <Typography variant='h5' children={content} />
                : content
              }
            </div>
          }
          {subcontent && <DialogContentText>{subcontent}</DialogContentText>}
          {buttonsHidden ||
            <DialogActions>
              {flag &&
                <Button
                  value="cancel"
                  className={classes.button}
                  variant="contained"
                  //color="secondary"
                  color="primary"
                  onClick={handleClose}>Cancelar</Button>
              }
              <Button
                value="acept"
                //variant="contained"
                color="primary"
                onClick={flag ? handleOnClose : handleClose}>Confirmar</Button>
            </DialogActions>
          }
        </DialogContent>
      </Dialog>
    );

  return <Modal open={opened} disableAutoFocus={true}>
    <div className={classes.divContainerLoading}>
      <div>
        <div className={classes.divLoadingSpiner}><CircularProgress size={80} /></div>
        <div className={classes.divLoadingText}>Cargando datos...</div>
      </div>
    </div>
  </Modal>
};

DialogoNotificacion.propTypes = {
  opened: PropTypes.bool,
  content: PropTypes.string,
  subcontent: PropTypes.string,
  isLoadingDialog: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DialogoNotificacion);