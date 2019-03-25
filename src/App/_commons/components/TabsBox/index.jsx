import React from 'react';
//
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    background: '#F2F2F2',
  },
  selected: {
    background: '#233A79',
    '&$labelIcon': {
      color: 'white',
    },
  },
  labelIcon: {},
  //
  rootAlt: {
    background: '#233A79',
    '&$labelIcon': {
      color: 'white',
    },
  }
};


const tabsDefault = [
  {
    key: 0,
    label: 'Tab label',
    icon: 'search',
    disabled: false,
    visible: true
  }
]
//
const TabsBox = props => {
  const { handleTabChange, tabs = tabsDefault, activeTab = 0, fullWidth = 'scrollable', styleVariant = null, classes } = props;
  return <Tabs
    style={{borderBottom: 'solid 1px #e8e8e8'}}
    value={activeTab}
    onChange={handleTabChange}
    indicatorColor="primary"
    textColor="primary"
    variant={fullWidth}
    children={ tabs.map((tab, index) => tab.visible &&
      <Tab
        classes={{
          root: styleVariant && (styleVariant === 'follow' ? (index > activeTab ? classes.root : classes.rootAlt) : classes.root),
          selected: styleVariant && classes.selected,
          labelIcon: styleVariant && classes.labelIcon
        }}
        key={tab.key} icon={<Icon>{tab.icon}</Icon>} label={tab.label} disabled={tab.disabled} />
    )}
  />
}

export default withStyles(styles)(TabsBox);

/*
 * Extras
 */
export function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: '0 25px', ...props.style }}>
      {props.children}
    </Typography>
  );
}
