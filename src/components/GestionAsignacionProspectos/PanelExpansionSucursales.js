import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const PanelExpansionSucursales = props => {
    const { empresas, oficinas } = props;
    const { empresa, oficina } = props;
    const { disabled, expanded } = props.expansionPanelSucursales;
    const { handleEmpresaChange, handleOficinaChange, handleExpansionPanelSucursalesChange } = props;
    return (
        <ExpansionPanel
            disabled={disabled}
            expanded={expanded}
            onChange={handleExpansionPanelSucursalesChange}
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
                    location_city
                </Icon>
                <Typography>Sucursales Disponibles</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div
                    style= {
                        {
                            width: '100%',
                            textAlign: 'center'
                        }
                    }
                >
                    <div>
                        <FormControl
                            style={
                                {
                                    margin: 10,
                                    width: 'calc(100% - 10px)',
                                    textAlign: 'left'
                                }
                            }
                            required={true}
                        >
                            <InputLabel
                                disabled={empresa.disabled}
                                htmlFor="empresa-simple"
                            >
                                Empresa
                            </InputLabel>
                            <Select
                                readOnly={empresa.readOnly}
                                value={empresa.value}
                                error={empresa.error}
                                disabled={empresa.disabled}
                                onChange={handleEmpresaChange}
                                inputProps={{
                                    name: 'empresa',
                                    id: 'empresa-simple',
                                }}
                            >
                                {empresas.length > 0 && empresas.map(empresa => empresa && <MenuItem key={empresa.claveEmpresa} value={empresa.claveEmpresa}>{empresa.nombreEmpresa}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl
                            style={
                                {
                                    margin: 10,
                                    width: 'calc(100% - 10px)',
                                    textAlign: 'left'
                                }
                            }
                            required={true}
                        >
                            <InputLabel
                                disabled={oficina.disabled}
                                htmlFor="oficina-simple"
                            >
                                Oficina
                            </InputLabel>
                            <Select
                                readOnly={oficina.readOnly}
                                value={oficina.value}
                                error={oficina.error}
                                disabled={oficina.disabled}
                                onChange={handleOficinaChange}
                                inputProps={{
                                    name: 'oficina',
                                    id: 'oficina-simple',
                                }}
                            >
                                {oficinas.length > 0 && oficinas.filter(a => a.oficina !== 0).sort((a, b) => a.oficina - b.oficina).map(oficina => oficina && <MenuItem key={oficina.oficina} value={oficina.oficina}>{`${oficina.oficina}-${oficina.nombre}`}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

PanelExpansionSucursales.propTypes = {
    empresas: PropTypes.array.isRequired,
    oficinas: PropTypes.array.isRequired,

    empresa: PropTypes.object.isRequired,
    oficina: PropTypes.object.isRequired,

    expansionPanelSucursales: PropTypes.object.isRequired,

    handleEmpresaChange: PropTypes.func.isRequired,
    handleOficinaChange: PropTypes.func.isRequired,
    handleExpansionPanelSucursalesChange: PropTypes.func.isRequired,
};

export default PanelExpansionSucursales;