// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Styles
import { styles } from './styles';

// Utils
import { pathKeyNormalizer } from 'utils/misc';
import { formValidator } from 'utils/form-utils';

// Actions
import * as actions from './redux-about/actions';
import * as catalogsCollectionActions from 'App/_commons/components/CatalogsCollectionPanel/redux-about/actions';
import * as appActions from 'redux/shared-reducers/app-actions';

// Common Components
import PanelContainer from 'App/_commons/elements/PanelContainer';
import { TabContainer } from 'App/_commons/components/TabsBox';
import TabsPanel from 'App/_commons/components/TabsPanel';
import DataCollectionPanel from 'App/_commons/components/DataCollectionPanel';
import CatalogsCollectionPanel from 'App/_commons/components/CatalogsCollectionPanel';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
import AccordionPanel from 'App/_commons/components/AccordionPanel';
//import NotesPanel from 'App/_commons/components/NotesPanel';
import { ButtonsContainer, ButtonOriginPrimary } from 'App/_commons/elements/ButtonsFeature';

// Own Components
import PanelInfoTemplate from './viewTemplates/PanelInfoTemplate';
import PanelGestionTemplate from './viewTemplates/PanelGestionTemplate';
import MoreInfoPanel from './viewTemplates/MoreInfoPanel';
import SimulatorPanel from './viewTemplates/SimulatorPanel';

// Interfaces
import { panelsInterface } from './interfaces/prospectoDetailInterface';
import generarGestionInterface from './interfaces/generarGestionInterface';
const { /*panelInfo,*/ panelInfoTabs:i_panelInfoTabs, panelGestion:i_panelGestion, panelGestionesHistory } = panelsInterface;

/*const notesDummie = [
  {
    title: "Nota uno",
    date: "Dicembre 20, 2018",
    hour: "08:00 hrs",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis nunc quis nisl gravida, in rutrum ex luctus. Etiam turpis nibh, lacinia id nibh eu, rhoncus dignissim risus."
  },
  {
    title: "Nota dos, y mas larga",
    date: "Dicembre 21, 2018",
    hour: "08:30 hrs",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis nunc quis nisl gravida, in rutrum ex luctus. Etiam turpis nibh, lacinia id nibh eu, rhoncus dignissim risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis nunc quis nisl gravida, in rutrum ex luctus. Etiam turpis nibh, lacinia id nibh eu, rhoncus dignissim risus."
  }
]*/
//
class ProspectoDetail extends Component {
  constructor(props){
    super(props);
    // interface to validate
    this.generarGestionInterface = generarGestionInterface || null;
    // Methods
    this.handleAttrChangeValue = this.handleAttrChangeValue.bind(this);
    this.handleMoreInfo = this.handleMoreInfo.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.getDataFromPanelModal = this.getDataFromPanelModal.bind(this);
    this.listSpreadBuilder = this.listSpreadBuilder.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleOnSubmitNote = this.handleOnSubmitNote.bind(this);
    this.loadExtendData = this.loadExtendData.bind(this);
    this.transformDataToPanelGestion = this.transformDataToPanelGestion.bind(this);
    this.handleGenerarGestionProspecto = this.handleGenerarGestionProspecto.bind(this);
    this.handleError = this.handleError.bind(this);
    //
    const { params } = this.props.match;
    const { prospectoDetailUID=null } = params;
    this.prospectoDetailUID = prospectoDetailUID;
    this.appBufferKey = pathKeyNormalizer(this.props.location.pathname);
    this.state = {
      disabledList: ['scheduledDate'],
      session: null,
      panelInfo: null,
      panelInfoMore: null,
      panelInfoTabs: null,
      panelGestion: null,
      gestion: null
    }
  }

  /*
   * React methods
   */
  componentDidMount() {
    this.props.changeZeroKeyAppBuffer();
    this.props.breadcrumbsShow();
    const keyToState = this.props.appBuffer[this.appBufferKey];
    if(!keyToState)
      return this.props.history.push(`/prospectos/`);
    this.loadExtendData(keyToState.session);
    const listaCatalogos = {"listaCatalogos": [
        {"tipoCodigo":"ECIV"},
        {"tipoCodigo":"ESTU"}
    ]}
    this.props.loadListaCatalogos(listaCatalogos);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.appBuffer !== nextProps.appBuffer){
      if (nextProps.appBuffer && nextProps.appBuffer[this.appBufferKey]){
        const keyToState = nextProps.appBuffer[this.appBufferKey];
        return this.setState({...this.state, ...this.transformDataToPanelGestion(keyToState)});
      }
      return this.props.history.goBack(null);
      // TODO: Redirect to parent route or load user data, ASK IT!
    }
  }

  /*
   * Own methods
   */
  loadExtendData(session){
    const { empresa, oficina, usuario } = session;
    if(!empresa || !oficina || !usuario)
      this.props.history.goBack(null);
    this.props.loadConsultarDatosContratoAnterior(this.prospectoDetailUID, this.appBufferKey)
      .then(r => {
        const { contratoAnterior } = r.payload;
        const contrato = contratoAnterior ? contratoAnterior.contrato : null;
        const paramsOfertas = contrato
          ? {key:'folio', data:{"codigoFormato":"VIEW","empresa":String(empresa.claveEmpresa)}}
          : {key:'solicitud', data:{"claveEmpresa":String(empresa.claveEmpresa),"creditoGrupal":"N","cliente":String(this.prospectoDetailUID),"oficina":{"oficina":String(oficina.oficina)}}}
        const contactoGestoresParams = {
          claveEmpresa: String(empresa.claveEmpresa),
          oficina: oficina.oficina,
          idProspecto: String(this.prospectoDetailUID),
          gestor: usuario.claveUsuario
        }
        this.props.loadConsultarOfertasSolicitudesContratos({cliente:String(this.prospectoDetailUID), oficina:String(oficina.oficina), paramsOfertas}, this.appBufferKey);
        this.props.loadContactoGestiones(contactoGestoresParams, this.appBufferKey);
      })
  }

  handleAttrChangeValue(event, panelRelated = null){
    if(!event.target)
      return null;

    if(panelRelated === 'gestion')
      this.setState({disabledList:['scheduledDate']});
    // eslint-disable-next-line
    if(panelRelated === 'gestion' && event.target.value === 'CITA' || event.target.value === 'LLDP')
      this.setState({disabledList:[]});

    if(!panelRelated)
      return this.setState({[event.target.name]:event.target.value});
    //
    this.setState({
      [panelRelated]:{...this.state[panelRelated], [event.target.name]:event.target.value}
    });
  }

  handleRowChange(event, rowId, whishPanel) {
    //console.log('handleRowChange in ProspectoDetail :>', event.currentTaget, rowId, whishPanel);
    switch (whishPanel) {
      case 'simulador':
        this.props.setDialogNotificationModal({
          content: <SimulatorPanel
            //initData={this.state.panelInfoMore}
            //setDataToParent={this.getDataFromPanelModal}
            handleOnClose={this.props.setDialogNotificationModalToInit} />,
          opened: true,
          buttonsHidden: true,
        });
        break;
      default:

    }
  }

  handleMoreInfo(event, panelRelated){
    this.props.setDialogNotificationModal({
      content: <MoreInfoPanel
        initData={this.state.panelInfo}
        setDataToParent={this.getDataFromPanelModal}
        handleOnClose={this.props.setDialogNotificationModalToInit} />,
      opened: true,
      buttonsHidden: true,
    });
  }

  getDataFromPanelModal(data, stateRef) {
    this.setState({[stateRef]: data});
  }

  handleAddNote(event, AddNoteComponent) {
    this.props.setDialogNotificationModal({
      content: <AddNoteComponent
        placeholder="Escribe un comentario sobre el cliente"
        label={null}
        //handleOnChange={(e, v) => console.log(v)}
        //addNoteValue="Persistant data"
        handleOnCancel={this.props.setDialogNotificationModalToInit}
        handleOnSubmit={(e,v) => {this.handleOnSubmitNote(v); this.props.setDialogNotificationModalToInit()}}
        handleOnChange={null}
      />,
      opened: true,
      buttonsHidden: true,
    });
  }

  handleOnSubmitNote(note){
    console.log('handleOnSubmitNote>', note);
  }

  listSpreadBuilder(whishPanel, _i_iterator, _iterator) {
    switch (whishPanel) {
      case 'accordionPanel':
        return _i_iterator.map((itm, idx) => ({
          columsData: itm.colums,
          rowData: this.state.panelGestion.contacto,
          //rowTemplate: TableRowTemplate,
          rowClickDisabled: true,
          classesOverride: {tableBody: {backgroundColor: "white"}},
          handleRowChange: null,
          intoPanelContainer: false,
        }));
      //break;
      case 'tabsPanel':
        return _i_iterator.map((itm, idx) => ({
          columsData: itm.colums,
          rowData: _iterator[idx],
          handleRowChange: this.handleRowChange,
          rowClickDisabled: true,
          classesOverride: {tableBody: {backgroundColor: "white"}},
          intoPanelContainer: false
        }));
      //break;
      case 'gestionesHistory':
        return {
          columsData: _i_iterator.colums,
          rowData: _iterator,
          handleRowChange: null,
          rowClickDisabled: true,
          classesOverride: {tableBody: {backgroundColor: "white"}},
          intoPanelContainer: false
        }
        //break;
      default:
        return null;

    }
  }

  transformDataToPanelGestion(dataFromBuffer) {
    const { panelGestion = null, panelInfo = null } = dataFromBuffer
    if(panelGestion) {
      const gestionesHistory = panelGestion.prospectos.reduce((a,n) => a.concat(n.gestiones), []);
      const contacto = panelInfo && panelInfo.telefonosParticulares;
      return {...dataFromBuffer, panelGestion:{...panelGestion, gestionesHistory, contacto}};
    }
    return dataFromBuffer;
  }

  handleGenerarGestionProspecto(event) {
    console.log('Generar gestión>', this.state.gestion);

    const isValid = formValidator(this.state.gestion, this.dinamicValidate(this.state.gestion), 'Campos marcados con * son requeridos');
    //
    switch (isValid.status) {
      case true:
        console.log('Generar gestión> OKAS!!!');
        //const avoidEmpties = Object.keys(this.state.gestion)
        //  .filter(i => this.state.gestion[i] !== this.generarGestionInterface.fields[i].onEmpty)
        //  .reduce((acumulator, next) => ({...acumulator, [next]: this.state.gestion[next]}), {});
        ////
        //this.props.loadGenerarGestionProspecto({}, this.appBufferKey);
        break;

      default:
        this.handleError(isValid.error);
    }
  }

  handleError({msg, inputList}) {
    this.props.setSnackbarNotification({
      opened: true,
      title: 'Validación de campos',
      message: `${msg.errorMsg}. ${msg.inputListMissingMsg}`,
      type: "error"
    });
  }

  dinamicValidate(formToValidate) {
    if(formToValidate.respuesta === 'CITA' || formToValidate.respuesta === 'LLDP') {
      return {
        ...this.generarGestionInterface.fields,
        scheduledDate: {...this.generarGestionInterface.fields.scheduledDate, required: true}
      };
    }
    //
    return this.generarGestionInterface.fields;
  }

  //
  render() {
    const { classes } = this.props;
    const { panelInfo, panelInfoTabs, panelGestion } = this.state;
    const { disabledList } = this.state;

    if (!panelInfo || !panelInfoTabs || !panelGestion)
      return null;

    // DetailPanelContainer about
    const detailPersonPanelSpread = {
      classes,
      ...panelInfo,
      title: 'Información de persona',
      handleOnChange: e => this.handleAttrChangeValue(e, 'panelInfo'),
      viewTemplate: PanelInfoTemplate,
      intoPanelContainer: false,
    }

    // TabsPanel about
    const tabTable_PanelSpread = this.listSpreadBuilder('tabsPanel', i_panelInfoTabs.tabs, panelInfoTabs);
    const tabsPanelInfoSpread = {
      tabs: i_panelInfoTabs.tabs,
      tabsContainers: [
        <TabContainer style={{padding: 0}} children={<ResultTablePanel {...tabTable_PanelSpread[0]} />}/>,
        <TabContainer style={{padding: 0}} children={<ResultTablePanel {...tabTable_PanelSpread[1]} />}/>,
        <TabContainer style={{padding: 0}} children={<ResultTablePanel {...tabTable_PanelSpread[2]} />}/>,
      ]
    }

    // Accordion about
    // Gestion
    const tabTable_GestionSpread = this.listSpreadBuilder('accordionPanel', i_panelGestion.itemList[0].contendExtend.tabs);
    const gestionPanelSpread = {
      classes,
      disabledList,
      requiredList: this.dinamicValidate(this.state.gestion || {}) || null,
      title: null,
      handleOnChange: e => this.handleAttrChangeValue(e, 'gestion'),
      viewTemplate: PanelGestionTemplate,
      intoPanelContainer: false,
    }

    console.log('Render :>', this.state.gestion);

    const tabsPanelGestionSpread = {
      tabs: i_panelGestion.itemList[0].contendExtend.tabs,
      tabsContainers: [
        <TabContainer style={{padding: 0}} children={<ResultTablePanel {...tabTable_GestionSpread[0]} />}/>,
        <TabContainer children={
          <CatalogsCollectionPanel>
            { catalogs => <Fragment>
              <DataCollectionPanel {...catalogs} contactoList={panelGestion.contacto} {...gestionPanelSpread} {...this.state.gestion} />
              <ButtonsContainer style={{margin:'0 0 25px'}}>
                <ButtonOriginPrimary
                  onClick={this.handleGenerarGestionProspecto}
                  disabled={!this.state.gestion} >
                  REGISTRAR GESTIÓN
                </ButtonOriginPrimary>
              </ButtonsContainer>
            </Fragment> }
          </CatalogsCollectionPanel>
        }/>,
      ]
    }
    const accordionPanelSpread = {
      itemList: i_panelGestion.itemList,
      contentList: [
        <div style={{width:'100%'}}>
          <TabsPanel {...tabsPanelGestionSpread} />
          <AccordionPanel {...{
            itemList:panelGestionesHistory.itemList,
            contentPadding:0,
            contentList:[<div style={{width:'100%', margin:0}}><ResultTablePanel {
              ...this.listSpreadBuilder(
                'gestionesHistory',
                panelGestionesHistory.itemList[0].contendExtend,
                panelGestion.gestionesHistory)
            }/></div>]
          }} />
        </div>
      ],
      spaceBetween: 30
    }

    // Render indeed
    return (
      <Fragment>
        <PanelContainer style={{padding: '14px'}}>
          <DataCollectionPanel {...detailPersonPanelSpread} />
          <Button
            color="primary"
            onClick={e => this.handleMoreInfo(e, 'panelInfo')}
            children="VER MÁS INFORMACIÓN..." />
        </PanelContainer>
        <TabsPanel {...tabsPanelInfoSpread} />
        <AccordionPanel {...accordionPanelSpread} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  appBuffer: state.app.bufferState,
});

export default connect(mapStateToProps, {...appActions, ...catalogsCollectionActions, ...actions})(withStyles(styles)(ProspectoDetail));
