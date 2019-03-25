import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContactsIcon from '@material-ui/icons/Contacts';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';
import SecurityIcon from '@material-ui/icons/Security';
//import PrintIcon from '@material-ui/icons/Print';
import ScannerIcon from '@material-ui/icons/Scanner';
import Typography from '@material-ui/core/Typography';
import TablaIntegrantes from './TablaIntegrantesComponent';
//import ImprimirSolicitudComponent from './ImprimirSolicitudComponent';
import DigitalizacionComponent from './DigitalizacionComponent';
import ReferenciasContainer from '../../containers/captura/ReferenciasContainer';
import SegurosContainer from '../../containers/captura/SegurosContainer';
import DatosCreditoContainer from '../../containers/captura/DatosCreditoContainer';
//import { validaRequeridos } from '../../utilities/validations';
import { ExpansionPanelCaptura, ExpansionPanelSummary, ExpansionPanelDetails } from '../RegistroSolicitudes/Panels';


class CapturaExpansionComponent extends React.Component {
  state = {
    expanded: '',
  };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

//   handleChange = (event, value) => {
//     let errors = {};
//     switch (this.state.value) {
//       case 0:
//         errors = validaRequeridos(
//           this.props.iformularios, 
//           ['datoscreditoform','disposicionform','datoscomercialesform','funcionariospublicos'], 
//           this.props.valuesDatosCredito,
//           'DatosCredito',
//           this.props.validaForm
//           );
//         !this.props.dirtyDatosCredito ? 
//           this.setState({ value }) : 
//           this.props.validDatosCredito && errors === {} && this.setState({ value });
//         break;
//       case 1:
//         this.setState({ value });
//         break;
//       default:
//         this.setState({ value });
//     }    
//   };

  render() {
    const { 
        //classes, 
      integrantes, 
      iformularios, 
      delIntegrante, 
      catalogoOficinas,
      valuesDatosPersonales, 
      valuesDatosEmpleo,
      validaForm, 
      fetchValidarZonaAutorizada, 
      getEvaluacionReferencias,
      consultarRfcCalculado,
      referenciasSeleccionadas,
      solicitud,
      rutaValijaLiberacion,
      closeDialog,
      openDialog
       } = this.props;
    const { expanded } = this.state;
    
    return (
      <div>        
        <ExpansionPanelCaptura expanded={expanded === 'Credito'} onChange={this.handleChange('Credito')} width={'928px'}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <DescriptionIcon color={expanded === 'Credito' ? "primary" : "action"} />
                <Typography color={expanded === 'Credito' ? "primary" : "default"}>DATOS DE CRÉDITO</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <DatosCreditoContainer catalogoOficinas={catalogoOficinas}/>
            </ExpansionPanelDetails>
        </ExpansionPanelCaptura>
        <ExpansionPanelCaptura expanded={expanded === 'Integrantes'} onChange={this.handleChange('Integrantes')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <GroupIcon color={expanded === 'Integrantes' ? "primary" : "action"} />
                <Typography color={expanded === 'Integrantes' ? "primary" : "default"}>INTEGRANTES</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TablaIntegrantes 
                    integrantes={integrantes} 
                    delIntegrante={delIntegrante}
                    iformularios={iformularios} 
                    valuesDatosPersonales={valuesDatosPersonales}
                    valuesDatosEmpleo={valuesDatosEmpleo}
                    validaForm={validaForm}
                    fetchValidarZonaAutorizada={fetchValidarZonaAutorizada}
                    getEvaluacionReferencias={getEvaluacionReferencias}
                    consultarRfcCalculado={consultarRfcCalculado}
                    numeroReferencias={referenciasSeleccionadas.length}
                     />
            </ExpansionPanelDetails>
        </ExpansionPanelCaptura>
        <ExpansionPanelCaptura expanded={expanded === 'Referencias'} onChange={this.handleChange('Referencias')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ContactsIcon color={expanded === 'Referencias' ? "primary" : "action"} />
                <Typography color={expanded === 'Referencias' ? "primary" : "default"}>REFERENCIAS</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ReferenciasContainer></ReferenciasContainer>
            </ExpansionPanelDetails>
        </ExpansionPanelCaptura>
        <ExpansionPanelCaptura expanded={expanded === 'Seguros'} onChange={this.handleChange('Seguros')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <SecurityIcon color={expanded === 'Seguros' ? "primary" : "action"} />
                <Typography color={expanded === 'Seguros' ? "primary" : "default"}>SEGUROS</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <SegurosContainer></SegurosContainer>
            </ExpansionPanelDetails>
        </ExpansionPanelCaptura>
        <ExpansionPanelCaptura expanded={expanded === 'Digitalizacion'} onChange={this.handleChange('Digitalizacion')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ScannerIcon color={expanded === 'Digitalizacion' ? "primary" : "action"} />
                <Typography color={expanded === 'Digitalizacion' ? "primary" : "default"}>ANEXAR DOCUMENTOS (OPCIONAL)</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <DigitalizacionComponent
                  empresa={solicitud.claveEmpresa}
                  oficina={solicitud.oficina.oficina}
                  solicitud={solicitud.solicitud}
                  codigoProducto={solicitud.codigoProducto}
                  noIntegrante={solicitud.numeroIntegrantes}
                  noCliente={solicitud.cliente} 
                  rutaValijaLiberacion={rutaValijaLiberacion}
                  closeDialog={closeDialog}
                  openDialog={openDialog} ></DigitalizacionComponent>
            </ExpansionPanelDetails>
        </ExpansionPanelCaptura>
      </div>
    );
  }
}

CapturaExpansionComponent.propTypes = {
  solicitud: PropTypes.object,
  iformularios: PropTypes.array,
  delIntegrante: PropTypes.func.isRequired,
  listaCatalogos: PropTypes.array,
  catalogoOficinas: PropTypes.array,
  integrantes: PropTypes.array,
  primaSeguros: PropTypes.array,
  seguros: PropTypes.array,
  listaClientes: PropTypes.array,
  catalogoProductos: PropTypes.array,
  catalogoFrecuencias: PropTypes.array,
  valuesDatosPersonales: PropTypes.object,
  valuesDatosEmpleo: PropTypes.object,
  fetchValidarZonaAutorizada: PropTypes.func.isRequired,
  getEvaluacionReferencias: PropTypes.func.isRequired,
  consultarRfcCalculado: PropTypes.func.isRequired,
  numeroReferencias: PropTypes.number,
  referenciasSeleccionadas: PropTypes.array.isRequired,
  rutaValijaLiberacion: PropTypes.string,
  closeDialog: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};

export default CapturaExpansionComponent;