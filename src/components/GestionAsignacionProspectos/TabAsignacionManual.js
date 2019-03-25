import React from 'react';
import PanelBusquedaProspectosAsignacionManual from './PanelBusquedaProspectosAsignacionManual';
import PanelAsignacionManual from './PanelAsignacionManual';
import PanelAccionesAsignacionManual from './PanelAccionesAsignacionManual';

const TabAsignacionManual = props => {
    return (
        <div
            style={
                {
                    width: '100%',
                    height: '100%'
                }
            }
        >
            <div
                style={
                    {
                        width: '100%',
                        height: '20%'
                    }
                }
            >
                <PanelBusquedaProspectosAsignacionManual>
                </PanelBusquedaProspectosAsignacionManual>
            </div>
            <div
                style={
                    {
                        width: '100%',
                        height: '80%',
                        display: 'inline-flex'
                    }
                }
            >
                <div
                    style={
                        {
                            width: '47%',
                            height: '100%',
                            textAlign: 'center'
                        }
                    }
                >
                    <PanelAsignacionManual
                        title={'Prospectos Origen'}
                    >
                    </PanelAsignacionManual>
                </div>
                <div
                    style={
                        {
                            width: '6%',
                            height: '100%',
                            textAlign: 'center'
                        }
                    }
                >
                    <PanelAccionesAsignacionManual>
                    </PanelAccionesAsignacionManual>
                </div>
                <div
                    style={
                        {
                            width: '47%',
                            height: '100%',
                            textAlign: 'center'
                        }
                    }
                >
                    <PanelAsignacionManual
                        title={'Prospectos Destino'}
                    >
                    </PanelAsignacionManual>
                </div>
            </div>
        </div>
    );
};

export default TabAsignacionManual;