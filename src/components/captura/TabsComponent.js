import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';

const styles = {
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
};

class TabsComponent extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: 0
        }
    }

    handleTabChange = (event, value) => {

    }

    render() {
        const { classes } = this.props;
        const { activeTab } = this.state;

        return (
            <div className={classes.root}>
                <Tabs
                    value={activeTab}
                    onChange={this.handleChange}
                    fullWidth
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab icon={<Icon>person_add</Icon>} label="RECENTS" />
                    <Tab icon={<Icon>favorite</Icon>} label="FAVORITES" />
                    <Tab icon={<Icon>edit</Icon>} label="NEARBY" />
                </Tabs>
            </div>
        );
    }
}

TabsComponent.propTypes = {

};

export default withStyles(styles)(TabsComponent);