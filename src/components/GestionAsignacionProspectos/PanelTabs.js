import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import PanelResultadosBusquedaProspecto from '../GestionAsignacionProspectos/PanelResultadosBusquedaProspecto';
import TabCitas from './TabCitas';
import TabAsignacionManual from './TabAsignacionManual';

const PanelTabs = props => {
    const { gestionAsignacionProspectosTabs, gestionAsignacionProspectosActiveTab } = props;
    const { handleTabChange } = props;
    return (
        <div
            style={
                {
                    width: '100%',
                    height: '100%',
                }
            }
        >
            <div
                style={
                    {
                        width: '100%',
                        height: 'calc(13% - 5px)'
                    }
                }
            >
                <Tabs
                    value={gestionAsignacionProspectosActiveTab}
                    onChange={handleTabChange}
                    indicatorColor='primary'
                    textColor='primary'
                >
                    {
                        gestionAsignacionProspectosTabs.map(tab =>
                            tab.visible &&
                            <Tab
                                key={tab.key}
                                label={tab.label}
                                icon={
                                    tab.icons.length > 1 ? <div><Icon>{tab.icons[0].name}</Icon><Icon>{tab.icons[1].name}</Icon></div> : <Icon>{tab.icons[0].name}</Icon>
                                }
                                disabled={tab.disabled}
                            >
                            </Tab>
                        )
                    }
                </Tabs>
            </div>
            {
                gestionAsignacionProspectosActiveTab === 0 &&
                <div
                    style={
                        {
                            width: '100%',
                            height: 'calc(87% - 5px)'
                        }
                    }
                >
                    <PanelResultadosBusquedaProspecto
                        {...props}
                    >
                    </PanelResultadosBusquedaProspecto>
                </div>
            }
            {
                gestionAsignacionProspectosActiveTab === 1 &&
                <div
                    style={
                        {
                            width: '100%',
                            height: 'calc(87% - 5px)'
                        }
                    }
                >
                    <TabCitas
                        {...props}
                    >
                    </TabCitas>
                </div>
            }
            {
                gestionAsignacionProspectosActiveTab === 2 &&
                <div
                    style={
                        {
                            width: '100%',
                            height: 'calc(87% - 5px)'
                        }
                    }
                >
                    <TabAsignacionManual>
                    </TabAsignacionManual>
                </div>
            }
        </div>
    );
};

PanelTabs.propTypes = {
    gestionAsignacionProspectosTabs: PropTypes.array.isRequired,
    gestionAsignacionProspectosActiveTab: PropTypes.number.isRequired,

    handleTabChange: PropTypes.func.isRequired,
};

export default PanelTabs;