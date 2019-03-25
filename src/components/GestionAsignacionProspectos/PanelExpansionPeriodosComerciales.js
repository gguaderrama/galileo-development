import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';

const PanelExpansionPeriodosComerciales = props => {
    const { arbolCampanias } = props;
    const { disabled, expanded } = props.expansionPanelPeriodosComerciales;
    const { handlePeriodoOnClick, handlePeriodoCampaniasOnClick, handleExpansionPanelPeriodosComercialesChange } = props;
    return (
        <ExpansionPanel
            disabled={disabled}
            expanded={expanded}
            onChange={handleExpansionPanelPeriodosComercialesChange}
        >
            <ExpansionPanelSummary
                expandIcon={
                    <ExpandMoreIcon>
                    </ExpandMoreIcon>
                }
                style={
                    {
                        backgroundColor: '#ebe9e026'
                    }
                }
            >
                <Icon
                    style={
                        {
                            marginRight: 10
                        }
                    }
                    color='primary'
                >
                    calendar_today
                </Icon>
                <Typography>Periodos Comerciales</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List
                    style={
                        {
                            width: '100%'
                        }
                    }
                    component="nav"
                >
                    {
                        arbolCampanias.map(periodoCampanias =>
                            <div
                                key={periodoCampanias.periodo}
                            >
                                <Tooltip
                                    title={periodoCampanias.descripcion}
                                >
                                    <ListItem
                                        button
                                        onClick={() => handlePeriodoOnClick(periodoCampanias)}
                                    >
                                        <ListItemIcon>
                                            <Icon
                                                color='primary'
                                            >
                                                date_range
                                        </Icon>
                                        </ListItemIcon>
                                        <Typography
                                            color='primary'
                                            style={
                                                {
                                                    width: '90%',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    fontWeight: 500
                                                }
                                            }
                                        >
                                            {periodoCampanias.descripcion}
                                        </Typography>
                                        {
                                            periodoCampanias.expanded ?
                                                <Icon
                                                    style={
                                                        {

                                                        }
                                                    }
                                                >
                                                    expand_less
                                            </Icon>
                                                :
                                                <Icon
                                                    style={
                                                        {

                                                        }
                                                    }
                                                >
                                                    expand_more
                                            </Icon>
                                        }
                                    </ListItem>
                                </Tooltip>
                                <Collapse
                                    in={periodoCampanias.expanded}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List
                                        component="div"
                                        disablePadding
                                    >
                                        {
                                            periodoCampanias.campanias.map(campania =>
                                                <div
                                                    style={
                                                        {
                                                            marginLeft: 30
                                                        }
                                                    }
                                                    key={campania.codigoCampania}
                                                >
                                                    <Tooltip
                                                        title={campania.descripcion}
                                                    >
                                                        <ListItem
                                                            style={
                                                                {

                                                                }
                                                            }
                                                            button
                                                            onClick={() => handlePeriodoCampaniasOnClick(campania)}
                                                        >
                                                            <Typography
                                                                style={
                                                                    {
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    }
                                                                }
                                                            >
                                                                {campania.descripcion}
                                                            </Typography>
                                                        </ListItem>
                                                    </Tooltip>
                                                </div>
                                            )
                                        }
                                    </List>
                                </Collapse>
                            </div>
                        )
                    }
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

PanelExpansionPeriodosComerciales.propTypes = {
    arbolCampanias: PropTypes.array.isRequired,

    expansionPanelPeriodosComerciales: PropTypes.object.isRequired,

    handlePeriodoOnClick: PropTypes.func.isRequired,
    handlePeriodoCampaniasOnClick: PropTypes.func.isRequired,
    handleExpansionPanelPeriodosComercialesChange: PropTypes.func.isRequired,
};

export default PanelExpansionPeriodosComerciales;
