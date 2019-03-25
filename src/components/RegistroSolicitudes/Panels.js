import React from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

export const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',

        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        width: '1400px',
        marginLeft: '141px',
        marginRight: '140px',

    },
    expanded: {
        width: '1400px',
        height: '395px',
        marginLeft: '140px',
        marginRight: '140px',
        overflowY: 'scroll'


    }
})(MuiExpansionPanel);

export const ExpansionPanelCaptura = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',

        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        width: '100%px',
        // marginLeft: '141px',
        // marginRight: '140px',

    },
    expanded: {
        width: '100%px',
        height: '395px',
        // marginLeft: '140px',
        // marginRight: '140px',
        overflowY: 'scroll'

    }
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
    root: {
     
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,

        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {

    },
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

export const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit,

    },
}))(MuiExpansionPanelDetails);