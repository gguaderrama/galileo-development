/* eslint-disable import/first */
// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Utils
//import { formValidator, isEmpty, formCleaner } from 'utils/form-utils';
import { pathKeyNormalizer } from 'utils/misc';

// Actions
import * as catalogsCollectionActions from 'App/_commons/components/CatalogsCollectionPanel/redux-about/actions';
import * as appActions from 'redux/shared-reducers/app-actions';

// Common Components
import { TabContainer } from 'App/_commons/components/TabsBox';
import TabsPanel from 'App/_commons/components/TabsPanel';
import DataCollectionPanel, { handleAttrChangeValue } from 'App/_commons/components/DataCollectionPanel';
//import PanelContainer, { TitlePanelContainer, TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import CatalogsCollectionPanel from 'App/_commons/components/CatalogsCollectionPanel';

// Owns
import InfoGrlTemplate from './viewTemplates/InfoGrlTemplate';
import DatosCreditoTemplate from './viewTemplates/DatosCreditoTemplate';

// Interfaces
import { panelsInterface } from './interfaces/prospectoRegisterInterface';
const { panelTabs:i_panelTabs } = panelsInterface;

// Styles
import { styles } from './styles';

// Main Fn
class ProspectoRegister extends Component {
  constructor(props) {
    super(props);
    this.handleOnCancel = this.handleOnCancel.bind(this);
    this.getActiveTab = this.getActiveTab.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleAttrChangeValue = this.handleAttrChangeValue.bind(this);
    this.state = {
      activeTab: 0,
      generalInfo: null,
      creditInfo: null,
    }
  }

  // React methods
  componentDidMount() {
    this.props.changeZeroKeyAppBuffer();
    this.props.breadcrumbsShow();
    const listaCatalogos = {"listaCatalogos": [
        {"tipoCodigo":"FREC"},
        {"tipoCodigo":"CONT"}
    ]}
    this.props.loadListaCatalogos(listaCatalogos);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.appBuffer !== nextProps.appBuffer){
      if (nextProps.appBuffer && nextProps.appBuffer[pathKeyNormalizer(this.props.location.pathname)]){
        //console.log
        return this.setState({generalInfo: nextProps.appBuffer[pathKeyNormalizer(this.props.location.pathname)].prospecto});
      }
      return this.setState({generalInfo:{}});
      //return this.props.history.goBack(null);
    }
  }

  // Own methods
  handleOnCancel(event) {
    this.props.history.goBack(null);
  }

  handleOnSave() {
    console.log('ProspectoRegister >: handleOnSave');
  }

  getActiveTab(activeTab) {
    this.setState({activeTab})
  }

  handleAttrChangeValue(event, panelRelated = null){
    this.setState(handleAttrChangeValue(this.state, {event, panelRelated}));
  }

  // Render
  render() {
    const { classes } = this.props;
    const { generalInfo, creditInfo } = this.state;
    if(!generalInfo)
      return null;

    console.log('ProspectoRegister >:', generalInfo);

    const infoGrlSpread = {
      classes,
      ...generalInfo,
      handleOnChange: e => this.handleAttrChangeValue(e, 'generalInfo'),
      viewTemplate: InfoGrlTemplate,
      intoPanelContainer: false,
    }
    const datosCreditoSpread = {
      classes,
      ...creditInfo,
      handleOnChange: e => this.handleAttrChangeValue(e, 'creditInfo'),
      viewTemplate: DatosCreditoTemplate,
      intoPanelContainer: false,
    }
    const tabsPanelSpread = {
      activeTab: this.state.activeTab,
      getActiveTab: this.getActiveTab,
      tabs: i_panelTabs.tabs,
      tabsContainers: [
        <TabContainer children={<CatalogsCollectionPanel>{catalogs => <DataCollectionPanel {...catalogs} {...infoGrlSpread} />}</CatalogsCollectionPanel>}/>,
        <TabContainer children={<CatalogsCollectionPanel>{catalogs => <DataCollectionPanel {...catalogs} {...datosCreditoSpread} />}</CatalogsCollectionPanel>}/>,
      ]
    }

    // Render indeed
    return <Fragment>
      <TabsPanel {...tabsPanelSpread}>
        <ButtonsContainer style={{marginTop:50}}>
          <ButtonOriginSecondary
            onClick={this.handleOnCancel}>Cancelar</ButtonOriginSecondary>
          <ButtonOriginPrimary onClick={this.handleOnSave}>Guardar</ButtonOriginPrimary>
        </ButtonsContainer>
      </TabsPanel>
    </Fragment>
  }
}

const mapStateToProps = state => ({
  appBuffer: state.app.bufferState,
});

export default connect(mapStateToProps, {...appActions, ...catalogsCollectionActions})(withStyles(styles)(ProspectoRegister));
