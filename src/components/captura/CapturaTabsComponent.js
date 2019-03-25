import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import GroupIcon from '@material-ui/icons/Group';
import SecurityIcon from '@material-ui/icons/Security';
import PrintIcon from '@material-ui/icons/Print';
import ScannerIcon from '@material-ui/icons/Scanner';
import Typography from '@material-ui/core/Typography';
import TablaIntegrantes from './TablaIntegrantesComponent';
import ImprimirSolicitudComponent from './ImprimirSolicitudComponent';
import DigitalizacionComponent from './DigitalizacionComponent';
import ReferenciasContainer from '../../containers/captura/ReferenciasContainer';
import SegurosContainer from '../../containers/captura/SegurosContainer';
import DatosCreditoContainer from '../../containers/captura/DatosCreditoContainer';
import { validaRequeridos } from '../../utilities/validations';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class CapturaTabsComponent extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    let errors = {};
    switch (this.state.value) {
      case 0:
        errors = validaRequeridos(
          this.props.iformularios, 
          ['datoscreditoform','disposicionform','datoscomercialesform','funcionariospublicos'], 
          this.props.valuesDatosCredito,
          'DatosCredito',
          this.props.validaForm
          );
        !this.props.dirtyDatosCredito ? 
          this.setState({ value }) : 
          this.props.validDatosCredito && errors === {} && this.setState({ value });
        break;
      case 1:
        this.setState({ value });
        break;
      default:
        this.setState({ value });
    }    
  };

  handleSubmitDatosCredito = () => {
    console.log('handleSubmitDatosCredito');
  };

  render() {
    const { classes, 
      integrantes, 
      iformularios, 
      delIntegrante, 
      catalogoOficinas,
      valuesDatosPersonales, 
      valuesDatosEmpleo,
      validaForm, 
      handleClickCapturaParcial, } = this.props;
    const { value } = this.state;
    
    return (
      <div className={classes.root}>        
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              indicatorColor="secondary"
              textColor="secondary"
            >
              
              <Tab label="Datos Crédito" icon={<CreditCardIcon />} />
              <Tab label="Integrantes" icon={<PersonIcon />} />
              <Tab label="Referencias" icon={<GroupIcon />} />
              <Tab label="Seguros" icon={<SecurityIcon />} />
              <Tab label="Imprimir Solicitud" icon={<PrintIcon />} />
              <Tab label="Anexar Documentos (opcional)" icon={<ScannerIcon />} />            
            </Tabs>            
          </AppBar>
          {value === 0 && <TabContainer>
                            <DatosCreditoContainer catalogoOficinas={catalogoOficinas}/>
                          </TabContainer>}
          {value === 1 && <TabContainer><TablaIntegrantes 
            integrantes={integrantes} 
            delIntegrante={delIntegrante}
            iformularios={iformularios} 
            valuesDatosPersonales={valuesDatosPersonales}
            valuesDatosEmpleo={valuesDatosEmpleo}
            validaForm={validaForm}
            handleClickCapturaParcial={handleClickCapturaParcial}></TablaIntegrantes></TabContainer>}
          {value === 2 && <TabContainer><ReferenciasContainer></ReferenciasContainer></TabContainer>}
          {value === 3 && <TabContainer><SegurosContainer></SegurosContainer></TabContainer>}
          {value === 4 && <TabContainer><ImprimirSolicitudComponent></ImprimirSolicitudComponent></TabContainer>}
          {value === 5 && <TabContainer><DigitalizacionComponent></DigitalizacionComponent></TabContainer>}
      </div>
    );
  }
}

CapturaTabsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
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
  handleClickCapturaParcial: PropTypes.func.isRequired,
};

export default withStyles(styles)(CapturaTabsComponent);