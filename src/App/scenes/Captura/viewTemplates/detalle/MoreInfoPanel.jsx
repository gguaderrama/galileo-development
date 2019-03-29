// Dependencies
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Commons
import { ButtonsContainer, ButtonOriginPrimary, ButtonOriginSecondary } from 'App/_commons/elements/ButtonsFeature';
import { TitlePanelContainer, TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import DataCollectionPanel from 'App/_commons/components/DataCollectionPanel';
import LeftIconMenuPanel from 'App/_commons/components/LeftIconMenuPanel';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
import CatalogsCollectionPanel from 'App/_commons/components/CatalogsCollectionPanel';

// Owns
import MoreInfoPanel_personales from './MoreInfoPanel_personales';
import MoreInfoPanel_empleo from './MoreInfoPanel_empleo';
import MoreInfoPanel_telefono from './MoreInfoPanel_telefono';
import MoreInfoPanel_domicilio from './MoreInfoPanel_domicilio';

// Interfaces
import telefonosTableInterface from 'App/scenes/Captura/interfaces/telefonosTableInterface';
import domiciliosTableInterface from 'App/scenes/Captura/interfaces/domiciliosTableInterface';

// Styles
import { styles } from './../styles';

class MoreInfoPanel extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeMenu = this.handleOnChangeMenu.bind(this);
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleOnClear = this.handleOnClear.bind(this);
    this.state = {
      selected: 0,
      allData: null,
      personales: null,
      empleo: null,
      telefono: null,
      domicilio: null,
    }
  }

  // React methods
  componentWillUnmount() {
    if(this.props.setDataToParent)
      this.props.setDataToParent(this.state, 'panelInfoMore');
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    this.setState({allData:{...this.props.initData}});
  }

  // Owns methods
  handleOnChangeMenu(itemIndex) {
    this.setState({selected: itemIndex});
  }

  handleOnChangeInput(event, panel) {
    this.setState({[panel]: {...this.state[panel], [event.target.name]: event.target.value}});
  }

  handleOnSave() {
    console.log('MoreInfoPanel >: onSave');
  }

  handleOnClear() {
    console.log('MoreInfoPanel >: onClear');
  }

  // Render indeed
  render() {
    console.log('Render state MoreInfoPanel >:', this.state);
    const { classes={closeButton:''}, handleOnClose = e => console.log('Close icon'),
      submitDisabled = false } = this.props;
    const { allData } = this.state;

    if(!allData)
      return null

    const dataCollectionPersonalesSpread = {
      classes,
      ...allData,
      title: null,
      handleOnChange: e => this.handleOnChangeInput(e, 'allData'),
      viewTemplate: MoreInfoPanel_personales,
      intoPanelContainer: false,
    }
    const dataCollectionEmpleoSpread = {
      classes,
      ...allData,
      title: null,
      handleOnChange: e => this.handleOnChangeInput(e, 'allData'),
      viewTemplate: MoreInfoPanel_empleo,
      intoPanelContainer: false,
    }
    const dataCollectionTelefonoSpread = {
      classes,
      ...allData,
      title: null,
      handleOnChange: e => this.handleOnChangeInput(e, 'allData'),
      viewTemplate: MoreInfoPanel_telefono,
      intoPanelContainer: false,
    }
    const telefonosTablePanelSpread = {
      title: <TitlePanelContainerAlt>Telefonos registrados</TitlePanelContainerAlt>,
      columsData: telefonosTableInterface.colums,
      rowData: this.state.allData.telefonosParticulares,
      //rowTemplate: TableRowTemplate,
      classesOverride: {tableBody: {backgroundColor: "white"}},
      handleRowChange: null,
      emptyRowDataMsg: 'No tiene telefonos registrados.',
    }
    const dataCollectionDomicilioSpread = {
      classes,
      ...allData,
      title: null,
      handleOnChange: e => this.handleOnChangeInput(e, 'allData'),
      viewTemplate: MoreInfoPanel_domicilio,
      intoPanelContainer: false,
    }
    const domicilioTablePanelSpread = {
      title: <TitlePanelContainerAlt>Domicilios</TitlePanelContainerAlt>,
      columsData: domiciliosTableInterface.colums,
      rowData: this.state.allData.domiciliosParticulares,
      //rowTemplate: TableRowTemplate,
      classesOverride: {tableBody: {backgroundColor: "white"}},
      handleRowChange: null,
      emptyRowDataMsg: 'No tiene Domicilios registrados.',
    }

    const content = [
      <CatalogsCollectionPanel>{catalogs => <DataCollectionPanel {...catalogs} {...dataCollectionPersonalesSpread} />}</CatalogsCollectionPanel>,
      <DataCollectionPanel {...dataCollectionEmpleoSpread} />,
      <Fragment>
        <DataCollectionPanel {...dataCollectionTelefonoSpread} />
        <ResultTablePanel {...telefonosTablePanelSpread} />
      </Fragment>,
      <Fragment>
        <DataCollectionPanel {...dataCollectionDomicilioSpread} />
        <ResultTablePanel {...domicilioTablePanelSpread} />
      </Fragment>
    ]

    // Render indeed
    return (<div>
      <TitlePanelContainer>Datos del solicitante</TitlePanelContainer>
      <IconButton className={classes.closeButton} aria-label="Close" onClick={handleOnClose}>
        <Icon children="clear"/>
      </IconButton>
      <LeftIconMenuPanel
        style={{width:1000}}
        handleOnChangeMenu={this.handleOnChangeMenu}
        content={content[this.state.selected]} />
      { submitDisabled && <ButtonsContainer style={{margin:0}}>
        <ButtonOriginSecondary onClick={this.handleOnClear}>Limpiar</ButtonOriginSecondary>
        <ButtonOriginPrimary onClick={this.handleOnSave}>Guardar</ButtonOriginPrimary>
      </ButtonsContainer> }
    </div>)
  }
}

export default withStyles(styles)(MoreInfoPanel);
