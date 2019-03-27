// Solved error
/* eslint-disable import/first */

// Dependencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

// Actions
import * as actions from "./redux-about/actions";
import * as catalogsCollectionActions from "App/_commons/components/CatalogsCollectionPanel/redux-about/actions";
import * as appActions from "redux/shared-reducers/app-actions";
// Common Components
import AccordionPanel from "App/_commons/components/AccordionPanel";
import {
  ButtonsContainer,
  ButtonOriginPrimary
} from "App/_commons/elements/ButtonsFeature";
// Commons
import Icon from "@material-ui/core/Icon";
import { TitlePanelContainerAlt } from "App/_commons/elements/PanelContainer";
import DataCollectionPanel, {
  handleAttrChangeValue
} from "App/_commons/components/DataCollectionPanel";
// Agregando CSS 
import './css/captura_solicitud_pannels.css';
import { styles } from "./styles";
// Template agregado 
import MoreInfoPanel_solicitud from './viewTemplates/MoreInfoPanel_solicitud';
import MoreInfoPanel_credito from './viewTemplates/MoreInfoPanel_credito';
import DatosCredito from './viewTemplates/datos_credito';
import Integrantes from './viewTemplates/integrantes';
class Captura extends Component {
  constructor(props) {
    super(props);
    // interface to validate
    this.state = {};
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
  }
  /*
   * React methods
   */

  handleOnChangeInput(event, panel) {
    //this.setState({[panel]: {...this.state[panel], [event.target.name]: event.target.value}});
  }
  componentDidMount() {
        this.setState({allData:{...this.props.initData}});
    
  }
  //
  render() {
    console.log(this.props)
            const {
               classes = { closeButton: "" },
               handleOnClose = e => console.log("Close icon"),
               submitDisabled = false
             } = this.props;
             const { allData } = this.state;

             const dataCapturaSolicitud = {
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
                       <Icon className={classes.iconStyle}>description</Icon>
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
                       <Icon className={classes.iconStyle}>group</Icon>
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
                       <Icon className={classes.iconStyle}>notes</Icon>
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
                       <Icon className={classes.iconStyle}>security</Icon>
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
                       <Icon className={classes.iconStyle}>scanner</Icon>
                       <TitlePanelContainerAlt>
                         ANEXAR DOCUMENTOS (OPCIONAL)
                       </TitlePanelContainerAlt>
                     </Fragment>
                   )
                 }
               ],
               contentList: [
                 <div style={{ 'width': '100%'}}> 
                    <DatosCredito></DatosCredito>
                 </div>,
                 <div style={{ 'width': '100%'}}> 
                    <Integrantes></Integrantes>
                 </div>,
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
                       {...dataCapturaSolicitud}
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
