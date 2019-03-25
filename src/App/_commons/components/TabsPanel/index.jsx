import React, { Component } from 'react';

// Commons
import TabsBox from 'App/_commons/components/TabsBox';
import PanelContainer from 'App/_commons/elements/PanelContainer';

//
class TabsPanel extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
      activeTab: props.tabs ? 0 : null
    }
    //this.tabsContainers = props.tabsContainers || [];
  }

  // React methods
  componentDidMount() {
    const { tabs=[] } = this.props;
    //let _tabs = this.changeTabsStatus(tabs, [1,2], 'disabled');
    //_tabs = this.changeTabsStatus(_tabs, [0,2], 'visible');
    this.setState({tabs});
    if(this.props.getActiveTab)
      this.props.getActiveTab(this.state.activeTab);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.activeTab !== nextProps.activeTab)
      this.setState({activeTab: nextProps.activeTab});
  }

  // Owns
  handleTabChange(event, activeTab) {
    this.setState({activeTab});
    if(this.props.getActiveTab)
      this.props.getActiveTab(activeTab);
  }

  changeTabsStatus = (_tabs, _toChanged, _prop) => {
    return _tabs.reduce((accumulator, currentValue) => {
      let matchFlag = false;
      // eslint-disable-next-line
      _toChanged.map(v => {if (parseInt(v) === currentValue.key){matchFlag = true}});
      if (matchFlag)
        return accumulator.concat([{...currentValue, [_prop]: true}]);
      return accumulator.concat([{...currentValue, [_prop]: false}]);
    }, []);
  }

  render() {
    if(this.props.tabs ? false : true)
      return <div>No tabs list defined...</div>

    const { activeTab, tabs } = this.state;
    const { tabsBoxProps={}, tabsContainers=[] } = this.props;
    const tabsBoxPropsTransform = {...tabsBoxProps, tabs, activeTab, fullWidth: "fullWidth"};

    // Render indeed
    return <PanelContainer style={{padding: '0px'}}>
      <TabsBox handleTabChange={ this.handleTabChange } {...tabsBoxPropsTransform} />
      { tabsContainers[activeTab] }
      { this.props.children }
    </PanelContainer>
  }
}

export default TabsPanel;
