import React from 'react';
//import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';


const PanelBusquedaProspectosAsignacionManual = props => {
    const { classes } = props;
    return (
        <div
            style={
                {
                    width: '100%'
                }
            }
        >
            <div
                style={
                    {
                        margin: 10
                    }
                }
            >
                <Typography
                    variant='h6'
                >
                    Búsqueda Prospectos
                </Typography>
                <div>
                    <FormControl
                        className={classes.formControl}
                        required={true}
                    >
                        <InputLabel
                            disabled={false}
                            htmlFor="empresa-simple"
                        >
                            Campaña
                            </InputLabel>
                        <Select
                            readOnly={false}
                            value={''}
                            error={false}
                            disabled={false}
                            onChange={(event) => console.log(event.target.value)}
                            inputProps={{
                                name: 'empresa',
                                id: 'empresa-simple',
                            }}
                        >
                            {/* {empresas.length > 0 && empresas.map(empresa => empresa && <MenuItem key={empresa.claveEmpresa} value={empresa.claveEmpresa}>{empresa.nombreEmpresa}</MenuItem>)} */}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        required={true}
                    >
                        <InputLabel
                            disabled={false}
                            htmlFor="empresa-simple"
                        >
                            Periodo
                            </InputLabel>
                        <Select
                            readOnly={false}
                            value={''}
                            error={false}
                            disabled={false}
                            onChange={(event) => console.log(event.target.value)}
                            inputProps={{
                                name: 'empresa',
                                id: 'empresa-simple',
                            }}
                        >
                            {/* {empresas.length > 0 && empresas.map(empresa => empresa && <MenuItem key={empresa.claveEmpresa} value={empresa.claveEmpresa}>{empresa.nombreEmpresa}</MenuItem>)} */}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        required={true}
                    >
                        <InputLabel
                            disabled={false}
                            htmlFor="empresa-simple"
                        >
                            Destino
                            </InputLabel>
                        <Select
                            readOnly={false}
                            value={''}
                            error={false}
                            disabled={false}
                            onChange={(event) => console.log(event.target.value)}
                            inputProps={{
                                name: 'empresa',
                                id: 'empresa-simple',
                            }}
                        >
                            {/* {empresas.length > 0 && empresas.map(empresa => empresa && <MenuItem key={empresa.claveEmpresa} value={empresa.claveEmpresa}>{empresa.nombreEmpresa}</MenuItem>)} */}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        required={true}
                    >
                        <InputLabel
                            disabled={false}
                            htmlFor="empresa-simple"
                        >
                            Gestor Origen
                            </InputLabel>
                        <Select
                            readOnly={false}
                            value={''}
                            error={false}
                            disabled={false}
                            onChange={(event) => console.log(event.target.value)}
                            inputProps={{
                                name: 'empresa',
                                id: 'empresa-simple',
                            }}
                        >
                            {/* {empresas.length > 0 && empresas.map(empresa => empresa && <MenuItem key={empresa.claveEmpresa} value={empresa.claveEmpresa}>{empresa.nombreEmpresa}</MenuItem>)} */}
                        </Select>
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
                            onClick={() => console.log('Click Limpiar')}
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
                            onClick={() => console.log('Click Consultar')}
                        >
                            Consultar
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

/* PanelBusquedaProspectosAsignacionManual.propTypes = {

}; */

export default withStyles(styles)(PanelBusquedaProspectosAsignacionManual);