import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PanelExpansionSucursales from './PanelExpansionSucursales';
import PanelExpansionPeriodosComerciales from './PanelExpansionPeriodosComerciales';
import PanelExpansionBusquedaAvanzada from './PanelExpansionBusquedaAvanzada';

const PanelExpansiones = props => {
    return (
        <Paper
            style={
                {
                    width: '100%',
                    heigth: '100%'
                }
            }
        >
            <div
                style={
                    {
                        margin: 10,
                        textAlign: 'center'
                    }
                }
            >
                <Typography
                    variant='h6'
                    style={
                        {
                            color: '#233A79'
                        }
                    }
                >
                    Gestión Prospectos
                </Typography>     
            </div>
            <div
                style={
                    {
                        margin: 10
                    }
                }
            >
                <PanelExpansionBusquedaAvanzada
                    {...props}
                >
                </PanelExpansionBusquedaAvanzada>
            </div>
            <div
                style={
                    {
                        margin: 10
                    }
                }
            >
                <PanelExpansionPeriodosComerciales
                    {...props}
                >
                </PanelExpansionPeriodosComerciales>
            </div>
            <div
                style={
                    {
                        margin: 10
                    }
                }
            >
                <PanelExpansionSucursales
                    {...props}
                >
                </PanelExpansionSucursales>
            </div>
        </Paper>
    );
};

export default PanelExpansiones;