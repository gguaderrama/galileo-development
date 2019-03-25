import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';

const PanelExpansionBusquedaAvanzada = props => {
    const { disabled, expanded } = props.expansionPanelBusquedaAvanzada;
    const { nombre, apellidoPaterno, apellidoMaterno, persona, contrato } = props;
    const { handleExpansionPanelBusquedaAvanzadaChange, handleNombreChange, handleApellidoPaternoChange, handleApellidoMaternoChange, handlePersonaChange, handleContratoChange, handleLimpiarOnClick, handleConsultarOnClick } = props;
    return (
        <ExpansionPanel
            disabled={disabled}
            expanded={expanded}
            onChange={handleExpansionPanelBusquedaAvanzadaChange}
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
                    search
                </Icon>
                <Typography>Búsqueda Avanzada</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div
                    style={
                        {
                            width: '100%',
                            textAlign: 'center'
                        }
                    }
                >
                    <div>
                        <TextField
                            style={
                                {
                                    width: '100%',
                                    marginTop: 0,
                                    marginBottom: 10
                                }
                            }
                            required={true}
                            label='Nombre'
                            value={nombre.value}
                            onChange={handleNombreChange}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            style={
                                {
                                    width: '100%',
                                    marginTop: 0,
                                    marginBottom: 10
                                }
                            }
                            required={true}
                            label='Apellido Paterno'
                            value={apellidoPaterno.value}
                            onChange={handleApellidoPaternoChange}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            style={
                                {
                                    width: '100%',
                                    marginTop: 0,
                                    marginBottom: 10
                                }
                            }
                            label='Apellido Materno'
                            value={apellidoMaterno.value}
                            onChange={handleApellidoMaternoChange}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div>
                        <FormControl
                            style={
                                {
                                    width: '100%',
                                    marginTop: 0,
                                    marginBottom: 10
                                }
                            }
                            error={persona.error}
                        >
                            <InputLabel>
                                Persona
                            </InputLabel>
                            <Input
                                value={persona.value}
                                onChange={handlePersonaChange}
                                aria-describedby='personaError'
                            >
                            </Input>
                            {
                                persona.error === true &&
                                <FormHelperText
                                    id='personaError'
                                >
                                    Necesariamente debe contener 12 caracteres
                                </FormHelperText>
                            }
                        </FormControl>
                    </div>
                    <div>
                        <FormControl
                            style={
                                {
                                    width: '100%',
                                    marginTop: 0,
                                    marginBottom: 10
                                }
                            }
                            error={contrato.error}
                        >
                            <InputLabel>
                                Contrato
                            </InputLabel>
                            <Input
                                value={contrato.value}
                                onChange={handleContratoChange}
                                aria-describedby='contratoError'
                            >
                            </Input>
                            {
                                contrato.error === true &&
                                <FormHelperText
                                    id='contratoError'
                                >
                                    Necesariamente debe contener 12 caracteres
                                </FormHelperText>
                            }
                        </FormControl>
                    </div>
                    <div
                        style={
                            {
                                textAlign: 'right'
                            }
                        }
                    >
                        <Tooltip title='Limpiar Filtros Busqueda'>
                            <Button
                                style={
                                    {
                                        marginTop: 20,
                                        marginRight: 5
                                    }
                                }
                                color='primary'
                                onClick={handleLimpiarOnClick}
                            >
                                Limpiar
                        </Button>
                        </Tooltip>
                        <Tooltip title='Consultar Prospectos'>
                            <Button
                                style={
                                    {
                                        marginTop: 20,
                                        marginLeft: 5
                                    }
                                }
                                variant='contained'
                                color='primary'
                                onClick={handleConsultarOnClick}
                            >
                                Consultar
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

PanelExpansionBusquedaAvanzada.propTypes = {
    expansionPanelBusquedaAvanzada: PropTypes.object.isRequired,
    nombre: PropTypes.object.isRequired,
    apellidoPaterno: PropTypes.object.isRequired,
    apellidoMaterno: PropTypes.object.isRequired,
    persona: PropTypes.object.isRequired,
    contrato: PropTypes.object.isRequired,

    handleExpansionPanelBusquedaAvanzadaChange: PropTypes.func.isRequired,
    handleNombreChange: PropTypes.func.isRequired,
    handleApellidoPaternoChange: PropTypes.func.isRequired,
    handleApellidoMaternoChange: PropTypes.func.isRequired,
    handlePersonaChange: PropTypes.func.isRequired,
    handleContratoChange: PropTypes.func.isRequired,
    handleLimpiarOnClick: PropTypes.func.isRequired,
    handleConsultarOnClick: PropTypes.func.isRequired,
};

export default PanelExpansionBusquedaAvanzada;