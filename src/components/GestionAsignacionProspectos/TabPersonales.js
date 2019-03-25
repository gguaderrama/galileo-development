import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const TabPersonales = props => {
    const { classes } = props;
    const { selectedProspect } = props;
    const { parseDate } = props;
    return (
        <div
            style={
                {
                    margin: 10
                }
            }
        >
            <div>
                <TextField
                    label="Persona"
                    value={selectedProspect.idProspecto}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Nombre(s)"
                    value={selectedProspect.nombre}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Apellido Paterno"
                    value={selectedProspect.apellidoPat}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Apellido Materno"
                    value={selectedProspect.apellidoMat}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </div>
            
            <div>
                <TextField
                    label="Fecha Nacimiento"
                    value={parseDate(selectedProspect.fechaNacimiento)}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="Genero"
                    value={selectedProspect.genero}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="RFC Capturado"
                    value={selectedProspect.rfcCapturado}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
                <TextField
                    label="RFC Calculado"
                    value={selectedProspect.rfcCalculado}
                    className={classes.formControl}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                </TextField>
            </div>
        </div>
    );
};

TabPersonales.propTypes = {
    selectedProspect: PropTypes.object.isRequired,

    parseDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(TabPersonales);