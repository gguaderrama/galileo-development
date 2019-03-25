import React from 'react';
import PropTypes from 'prop-types';
import PanelTabsDetallesProspecto from './PanelTabsDetallesProspecto';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const DialogoDetallesProspecto = props => {
    const { classes } = props;
    const { opened } = props;
    const { handleDialogoDetallesProspectoClose } = props;
    return (
        <div>
            <Dialog
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                open={opened}
                onClose={handleDialogoDetallesProspectoClose}
                scroll='paper'
                maxWidth={false}
            >
                <div
                    style={
                        {
                            width: '90vw',
                            height: '90vh'
                        }
                    }
                >
                    <DialogTitle>
                        <div>
                            <Typography
                                variant="h6">
                                Detalles Prospecto
                            </Typography>
                        </div>
                        <div>
                            <IconButton
                                className={classes.closeButton}
                                color="primary"
                                onClick={handleDialogoDetallesProspectoClose}
                            >
                                <Icon>
                                    close
                                </Icon>
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div
                            style={
                                {
                                    margin: 10
                                }
                            }
                        >
                            <PanelTabsDetallesProspecto
                                {...props}
                            >
                            </PanelTabsDetallesProspecto>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
};

DialogoDetallesProspecto.propTypes = {
    opened: PropTypes.bool.isRequired,

    handleDialogoDetallesProspectoClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DialogoDetallesProspecto);