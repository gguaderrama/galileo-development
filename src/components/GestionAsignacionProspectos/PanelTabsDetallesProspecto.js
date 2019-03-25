import React from 'react';
import PropTypes from 'prop-types';
import TabPersonales from './TabPersonales';
import TabOfertas from './TabOfertas';
import TabTelefonos from './TabTelefonos';
import TabDomicilios from './TabDomicilios';
import TabAsignacion from './TabAsignacion';
import PanelExpansionGestion from './PanelExpansionGestion';
import PanelExpansionHistorialGestiones from './PanelExpansionHistorialGestiones';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const PanelTabsDetallesProspecto = props => {
    const { detallesProspectoTabs, detallesProspectoActiveTab } = props;
    const { handleDetallesProspectoTabChange } = props;
    return (
        <div>
            <Tabs
                value={detallesProspectoActiveTab}
                onChange={handleDetallesProspectoTabChange}
                indicatorColor='primary'
                textColor='primary'
            >
                {detallesProspectoTabs.map(tab =>
                    <Tooltip
                        key={tab.key}
                        title={tab.toolTip}
                    >
                        <Tab
                            icon={<Icon>{tab.icon}</Icon>}
                            label={tab.label}
                        >
                        </Tab>
                    </Tooltip>)}
            </Tabs>
            {detallesProspectoActiveTab === 0 &&
                <TabOfertas
                    {...props}
                >

                </TabOfertas>
            }
            {detallesProspectoActiveTab === 1 &&
                <TabAsignacion
                    {...props}
                >

                </TabAsignacion>
            }
            {detallesProspectoActiveTab === 2 &&
                <TabPersonales
                    {...props}
                >

                </TabPersonales>
            }
            {detallesProspectoActiveTab === 3 &&
                <TabTelefonos
                    {...props}
                >

                </TabTelefonos>
            }
            {detallesProspectoActiveTab === 4 &&
                <TabDomicilios
                    {...props}
                >

                </TabDomicilios>
            }
            <div>
                <PanelExpansionGestion
                    {...props}
                >
                </PanelExpansionGestion>
                <PanelExpansionHistorialGestiones
                    {...props}
                >
                </PanelExpansionHistorialGestiones>
            </div>
        </div>
    );
};

PanelTabsDetallesProspecto.propTypes = {
    detallesProspectoTabs: PropTypes.array.isRequired,
    detallesProspectoActiveTab: PropTypes.number.isRequired,

    handleDetallesProspectoTabChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(PanelTabsDetallesProspecto);