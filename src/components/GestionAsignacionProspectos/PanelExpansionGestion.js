import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import PanelGestionProspecto from './PanelGestionProspecto';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';


const PanelExpansionGestion = props => {
    const { classes } = props;
    const { selectedDate } = props;
    return (
        <div
            style={
                {
                    marginTop: 50
                }
            }
        >
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<Icon>expand_more</Icon>}
                >
                    <Tooltip
                        title={Object.keys(selectedDate).length > 0 ? 'Cierre Cita' : 'Gestión Prospecto'}
                    >
                        <div className={classes.divButtonContainer}>
                            <Icon
                                className={classes.button}
                                color='primary'
                            >
                                work
                            </Icon>
                            <Typography
                                variant='subtitle1'
                            >
                                {Object.keys(selectedDate).length > 0 ? 'Cierre Cita' : 'Gestión Prospecto'}
                            </Typography>
                        </div>
                    </Tooltip>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <PanelGestionProspecto
                        {...props}
                    >
                    </PanelGestionProspecto>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

PanelExpansionGestion.propTypes = {
    selectedDate: PropTypes.object.isRequired,
}

export default withStyles(styles)(PanelExpansionGestion);