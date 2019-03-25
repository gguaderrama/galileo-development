// Solved error
/* eslint-disable import/first */

// Dependencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// Styles
import { styles } from "./styles";

// Utils
import { pathKeyNormalizer } from "utils/misc";
import { formValidator } from "utils/form-utils";

// Actions
import * as actions from "./redux-about/actions";
import * as catalogsCollectionActions from "App/_commons/components/CatalogsCollectionPanel/redux-about/actions";
import * as appActions from "redux/shared-reducers/app-actions";

// Common Components
import AccordionPanel from "App/_commons/components/AccordionPanel";
//import NotesPanel from 'App/_commons/components/NotesPanel';
import {
  ButtonsContainer,
  ButtonOriginPrimary
} from "App/_commons/elements/ButtonsFeature";

// Own Components
// Interfaces
import { panelsInterface } from "./interfaces/prospectoDetailInterface";
const {
  /*panelInfo,*/ panelInfoTabs: i_panelInfoTabs,
  panelGestion: i_panelGestion,
  panelGestionesHistory
} = panelsInterface;

// Commons
import Icon from "@material-ui/core/Icon";
import { TitlePanelContainerAlt } from "App/_commons/elements/PanelContainer";
const iconStyle = { marginRight: 20, position: "relative", top: 5 };
import DataCollectionPanel, {
  handleAttrChangeValue
} from "App/_commons/components/DataCollectionPanel";


// Agregando CSS 
import '../../_globals/css/Solicitudes.css';
// Template agregado 
import MoreInfoPanel_solicitud from './viewTemplates/MoreInfoPanel_solicitud';
import MoreInfoPanel_credito from './viewTemplates/MoreInfoPanel_credito';

class Captura extends Component {
  constructor(props) {
    super(props);
    // interface to validate
    this.state = {};
  }

  /*
   * React methods
   */
  componentDidMount() {
        this.setState({allData:{...this.props.initData}});
    
  }

  componentWillReceiveProps(nextProps) {}

  /*
   * Own methods
   */
  loadExtendData(session) {}

  handleAttrChangeValue(event, panelRelated = null) {}

  handleRowChange(event, rowId, whishPanel) {
    //console.log('handleRowChange in Captura :>', event.currentTaget, rowId, whishPanel);
  }

  handleMoreInfo(event, panelRelated) {}

  getDataFromPanelModal(data, stateRef) {
    this.setState({ [stateRef]: data });
  }

  handleAddNote(event, AddNoteComponent) {}

  handleOnSubmitNote(note) {
    console.log("handleOnSubmitNote>", note);
  }

  listSpreadBuilder(whishPanel, _i_iterator, _iterator) {}

  transformDataToPanelGestion(dataFromBuffer) {}

  handleGenerarGestionProspecto(event) {}

  handleError({ msg, inputList }) {
    this.props.setSnackbarNotification({
      opened: true,
      title: "Validación de campos",
      message: `${msg.errorMsg}. ${msg.inputListMissingMsg}`,
      type: "error"
    });
  }

  dinamicValidate(formToValidate) {
    if (
      formToValidate.respuesta === "CITA" ||
      formToValidate.respuesta === "LLDP"
    ) {
      return {
        ...this.generarGestionInterface.fields,
        scheduledDate: {
          ...this.generarGestionInterface.fields.scheduledDate,
          required: true
        }
      };
    }
    //
    return this.generarGestionInterface.fields;
  }

  //
  render() {
             console.log(this.props);
             // Accordion about
             // Gestion

             const {
               classes = { closeButton: "" },
               handleOnClose = e => console.log("Close icon"),
               submitDisabled = false
             } = this.props;
             const { allData } = this.state;

             const dataCollectionSolicitud = {
               classes,
               ...allData,
               title: null,
               handleOnChange: e =>
                 this.handleOnChangeInput(e, "allData"),
               viewTemplate: MoreInfoPanel_solicitud,
               intoPanelContainer: false
             };

             const dataCreditos = {
               classes,
               ...allData,
               title: null,
               handleOnChange: e =>
                 this.handleOnChangeInput(e, "allData"),
               viewTemplate: MoreInfoPanel_credito,
               intoPanelContainer: false
             };

             const accordionPanelSpread = {
               itemList: [
                 {
                   name: "datos_credito",
                   title: (
                     <Fragment>
                       <Icon style={iconStyle}>description</Icon>
                       <TitlePanelContainerAlt>
                         DATOS DE CRÉDITO
                       </TitlePanelContainerAlt>
                     </Fragment>
                   )
                 },
                 {
                   name: "integrantes",
                   title: (
                     <Fragment>
                       <Icon style={iconStyle}>group</Icon>
                       <TitlePanelContainerAlt>
                         INTEGRANTES
                       </TitlePanelContainerAlt>
                     </Fragment>
                   )
                 },
                 {
                   name: "referencias",
                   title: (
                     <Fragment>
                       <Icon style={iconStyle}>notes</Icon>
                       <TitlePanelContainerAlt>
                         REFERENCIAS
                       </TitlePanelContainerAlt>
                     </Fragment>
                   )
                 },
                 {
                   name: "seguros",
                   title: (
                     <Fragment>
                       <Icon style={iconStyle}>security</Icon>
                       <TitlePanelContainerAlt>
                         SEGUROS
                       </TitlePanelContainerAlt>
                     </Fragment>
                   )
                 },
                 {
                   name: "anexar_documentos",
                   title: (
                     <Fragment>
                       <Icon style={iconStyle}>scanner</Icon>
                       <TitlePanelContainerAlt>
                         ANEXAR DOCUMENTOS (OPCIONAL)
                       </TitlePanelContainerAlt>
                     </Fragment>
                   )
                 }
               ],
               contentList: [
                 <div>Esto es un test</div>,
                 <div>demop</div>,
                 <div>prueba</div>,
                 <div>seguros</div>,
                 <div>anexar documentos</div>
               ]
               //   spaceBetween: 30
             };

             // Render indeed
             return (
               <div>
                 <div className="left">
                   <p>
                     Captura toda la información requerida en las
                     distintas secciones. Hasta que selecciones todas
                     las acciones, prodrás enviar e imprimir la
                     solicitud
                   </p>
                   <Fragment>
                     <AccordionPanel {...accordionPanelSpread} />
                   </Fragment>
                   <ButtonsContainer style={{ margin: 0 }}>
                     <ButtonOriginPrimary
                       onClick={() => {}}
                       disabled={submitDisabled}
                     >
                       Guardar
                     </ButtonOriginPrimary>
                   </ButtonsContainer>
                 </div>
                 <div className="right">
                   <Fragment>
                     <DataCollectionPanel
                       {...dataCollectionSolicitud}
                     />
                   </Fragment>
                   <Fragment>
                     <DataCollectionPanel {...dataCreditos} />
                   </Fragment>
                 </div>
               </div>
             );
           }
}

const mapStateToProps = state => ({
  appBuffer: state.app.bufferState
});

export default connect(
  mapStateToProps,
  { ...appActions, ...catalogsCollectionActions, ...actions }
)(withStyles(styles)(Captura));
