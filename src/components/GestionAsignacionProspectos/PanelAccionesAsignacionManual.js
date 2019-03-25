import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const PanelAccionesAsignacionManual = props => {
    return (
        <div>
            <Tooltip title='Agregar seleccion a destino'>
                <Button
                    style={
                        {
                            marginTop: 10,
                            marginBottom: 10
                        }
                    }
                    color='primary'
                >
                    <Icon>arrow_back_ios</Icon>
                </Button>
            </Tooltip>
            <Tooltip title='Quitar Seleccion a destino'>
                <Button
                    style={
                        {
                            marginTop: 10,
                            marginBottom: 10
                        }
                    }
                    color='primary'
                >
                    <Icon>arrow_forward_ios</Icon>
                </Button>
            </Tooltip>
            <Tooltip title='Asignar seleccion de Prospectos a destino'>
                <Button
                    style={
                        {
                            marginTop: 10,
                            marginBottom: 10
                        }
                    }
                    color='primary'
                    onClick={() => console.log('guardar asignacion')}
                >
                    <Icon>save</Icon>
                </Button>
            </Tooltip>
        </div>
    );
};

export default PanelAccionesAsignacionManual;