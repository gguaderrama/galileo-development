/* eslint-disable import/first */
// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Utils
//import { formValidator, isEmpty, formCleaner } from 'utils/form-utils';
//import { pathKeyNormalizer } from 'utils/misc';

// Actions
//import * as actions from './redux-about/actions';
import * as appActions from 'redux/shared-reducers/app-actions';

// Common Components
import { TabContainer } from 'App/_commons/components/TabsBox';
import TabsPanel from 'App/_commons/components/TabsPanel';
//import DataCollectionPanel from 'App/_commons/components/DataCollectionPanel';
import PanelContainer from 'App/_commons/elements/PanelContainer';
import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import ColumnsPanel from 'App/_commons/components/ColumnsPanel';

// Owns

// Interfaces
import { panelsInterface } from './interfaces/panelsInterface';
const { panelTabs:i_panelTabs } = panelsInterface;

// Main Fn
class TabsPanelDemo extends Component {
  constructor(props) {
    super(props);
    this.handleOnNext = this.handleOnNext.bind(this);
    this.handleOnPrev = this.handleOnPrev.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
    this.state = {
      activeTab: 0,
      fromSearchForm: null,
    }
  }

  // React methods
  componentDidMount() {
    this.props.changeZeroKeyAppBuffer();
    this.props.breadcrumbsShow('TabsPanel Demo');
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.appBuffer !== nextProps.appBuffer){
      //if (nextProps.appBuffer && nextProps.appBuffer['prospectos']){
      //  return this.setState({fromSearchForm: nextProps.appBuffer['prospectos'].searchForm});
      //}
      return this.setState({fromSearchForm:{}});
      //return this.props.history.goBack(null);
    }
  }

  // Own methods
  handleOnNext(event) {
    this.setState({activeTab: this.state.activeTab + 1})
  }

  handleOnPrev(event) {
    this.setState({activeTab: this.state.activeTab - 1})
  }

  handleOnSave() {
    console.log('TabsPanelDemo >: handleOnSave');
  }

  getActiveTab(activeTab) {
    this.setState({activeTab})
  }

  // Render
  render() {
    if(!this.state.fromSearchForm)
      return null;

    // TabsPanel about
    const panelContainerSpread = {
      style: {height: 400, marginBottom:0}
    }
    const panelContainerSpread_0 = {
      children: <ColumnsPanel testData={this.state.fromSearchForm} />
    }
    const tabsPanelInfoSpread = {
      tabsBoxProps: {styleVariant: 'follow'},
      activeTab: this.state.activeTab,
      getActiveTab: this.getActiveTab,
      tabs: i_panelTabs.tabs,
      tabsContainers: [
        <TabContainer children={<PanelContainer {...panelContainerSpread} {...panelContainerSpread_0} />}/>,
        <TabContainer children={<PanelContainer {...panelContainerSpread} />}/>,
        <TabContainer children={<PanelContainer {...panelContainerSpread} />}/>,
        <TabContainer children={<PanelContainer {...panelContainerSpread} />}/>,
        <TabContainer children={<PanelContainer {...panelContainerSpread} />}/>,
      ]
    }

    // Render indeed
    return <div>
      <TabsPanel {...tabsPanelInfoSpread}>
        <ButtonsContainer style={{marginTop:0}}>
          <ButtonOriginSecondary
            disabled={this.state.activeTab === 0}
            onClick={this.handleOnPrev}>Volver</ButtonOriginSecondary>
          { this.state.activeTab < i_panelTabs.tabs.length - 1
            && <ButtonOriginSecondary onClick={this.handleOnNext}>Continuar</ButtonOriginSecondary>
          }
          { this.state.activeTab === i_panelTabs.tabs.length -1
            && <ButtonOriginPrimary onClick={this.handleOnSave}>Guardar</ButtonOriginPrimary>
          }
        </ButtonsContainer>
      </TabsPanel>
    </div>
  }
}

const mapStateToProps = state => ({
  appBuffer: state.app.bufferState,
});

export default connect(mapStateToProps, appActions)(TabsPanelDemo);
