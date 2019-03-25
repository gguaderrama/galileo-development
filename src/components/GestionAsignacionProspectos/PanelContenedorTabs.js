import React from 'react';
import Paper from '@material-ui/core/Paper';
import PanelTabs from './PanelTabs';

const PanelContenedorTabs = props => {
    return (
        <Paper
            style={
                {
                    width: '100%',
                    height: '100%'
                }
            }
        >
            <div
                style = {
                    {
                        width: 'calc(100% - 20px)',
                        height: 'calc(100% - 20px)',
                        margin: 10
                    }
                }
            >
                <PanelTabs
                    {...props}
                >
                </PanelTabs>
            </div>
        </Paper>
    );
};

export default PanelContenedorTabs;