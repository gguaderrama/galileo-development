/* eslint-disable import/first */
// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Constants
import { CATALOGO_EMPRESAS, DIALOGO_NOTIFICACION_PARAMETROS_SESION_INCORRECTOS } from 'constants/Generic';

// Styles
import { styles } from './styles';

// Utils
import { formValidator, isEmpty, formCleaner } from 'utils/form-utils';
import { pathKeyNormalizer, avoidDoubleSlash } from 'utils/misc';
import { getAccessFromUrl, stringAccessToObject, getUrlParams } from 'utilities/session';

// Redux
import { getCatalogos } from 'redux/selectors/Catalogos/catalogos';
// Actions
import * as appActions from 'redux/shared-reducers/app-actions';
import * as searchPanelActions from 'App/_commons/components/SearchPanel/redux-about/actions';
import * as sessionActions from 'redux/actions/Session/session';
import * as ownActions from './redux-about/actions';

// Common Components
import SearchPanel from 'App/_commons/components/SearchPanel';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
import { ButtonsContainer, ButtonOriginPrimary } from 'App/_commons/elements/ButtonsFeature';
import PanelContainer, { TitleMainHead, TitlePanelContainer } from 'App/_commons/elements/PanelContainer';

// Own Components
import SearchPanelTemplate from './viewTemplates/SearchPanelTemplate';
import TableRowTemplate from './viewTemplates/TableRowTemplate';

// Interfaces
import formInterface from './interfaces/formInterface';
import resultTableInterface from './interfaces/resultTableInterface';

// Class
class Prospectos extends Component {
  constructor(props){
    super(props);
    // Methods
    this.handleAttrChangeValue = this.handleAttrChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClean = this.handleClean.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleUserRegister = this.handleUserRegister.bind(this);

    // interface to validate
    this.formInterface = formInterface || null;
    this.resultTableInterface = resultTableInterface || null;

    // form state & result state
    this.state = {
      searchForm: null,
      disabledList: [],
      searchResult: {
        itemListResult: null
      }
    };
  }

  // TODO: Refactorize this!!! Put into own reducer
  receivedParamsAreEncrypted = (encrypted = false) => {
      if (encrypted) {
          const access = getAccessFromUrl(true);
          this.props.getAccess(encodeURIComponent(access));
      }
      return encrypted ? stringAccessToObject(this.props.sessionRegistro.access) : getUrlParams(true);
  }

  /*
   * React methods
   */
  componentWillMount() {
    const sessionParams = this.receivedParamsAreEncrypted();
    if (sessionParams['claveEmpresa'] && sessionParams['oficina'] && sessionParams['usuario'] && sessionParams['nombre']) {
      // Set empresa
      const empresa = CATALOGO_EMPRESAS.find(empresa => parseInt(empresa.codigoEmpresa) === parseInt(sessionParams['claveEmpresa']));

      // Without dependencies
      this.props.loadEmpresasNoFetch(CATALOGO_EMPRESAS);
      this.props.loadEstatusesNoFetch(this.props.catalogos.statuses);
      // Init rules - Session handle
      // TODO: Check if 'empresa' & 'oficinas' are valid AND handle session in diferent way
      if(empresa){
        this.props.loadOficinas({claveEmpresa: empresa['claveEmpresa']})
          .then(r => {
            //const oficinaSession = r.value.find(o => o.oficina == sessionParams['oficina']);
            const oficinaSession = r.payload.find(o => parseInt(o.oficina) === parseInt(sessionParams['oficina']));
            this.props.setSession({
              empresa,
              oficina: { oficina: oficinaSession.oficina, nombre: oficinaSession.nombre },
              usuario: { claveUsuario: sessionParams['usuario'], nombreUsuario: sessionParams['nombre'] }
            });
            this.setState({
              disabledList: Number.parseInt(sessionParams['oficina']) !== 0 ? ['empresas', 'empresa'] : [],
              searchForm:{empresa: empresa['claveEmpresa']},
              session: {
                empresa,
                oficina: { oficina: oficinaSession.oficina, nombre: oficinaSession.nombre },
                usuario: { claveUsuario: sessionParams['usuario'], nombreUsuario: sessionParams['nombre'] }
              }
            });
            this.props.changeZeroKeyAppBuffer();
          })
          .catch(err => {
            console.log('"oficina" no found!', err);
          })
      } else {
        this.setState({searchForm:{}});
      }
    } else {
      this.props.setDialogNotificationModal(DIALOGO_NOTIFICACION_PARAMETROS_SESION_INCORRECTOS);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.appBuffer !== nextProps.appBuffer){
      const pathKey = pathKeyNormalizer(this.props.location.pathname);
      if (nextProps.appBuffer && nextProps.appBuffer[pathKey]){
        return this.setState({...nextProps.appBuffer[pathKey], session: this.props.session});
      }
      return null; //this.setState({searchForm:{}});
    }

    if(this.props.searchPanel.result !== nextProps.searchPanel.result) {
      this.setState({searchResult:{...this.state.searchResult, itemListResult:nextProps.searchPanel.result}});
    }
  }

  /*
   * Own methods
   */
  // SearchPanel
  handleAttrChangeValue(event){
    this.setState({
      searchForm:{...this.state.searchForm, [event.target.name]:event.target.value}
    });
  }

  handleSubmit(event) {
    const isValid = formValidator(this.state.searchForm, this.dinamicValidate(this.state.searchForm), 'Campos marcados con * son requeridos');
    //
    switch (isValid.status) {
      case true:
        const avoidEmpties = Object.keys(this.state.searchForm)
          .filter(i => this.state.searchForm[i] !== this.formInterface.fields[i].onEmpty)
          .reduce((acumulator, next) => ({...acumulator, [next]: this.state.searchForm[next]}), {});
        //
        this.props.loadPersonasByAnalisisCliente(avoidEmpties)
          .then(r => {
            const _jsonError = r.payload.replace(new RegExp('"', 'g'), '')
              // eslint-disable-next-line
              .replace(new RegExp('\'', 'g'), '\"')
              .replace(new RegExp('clave', 'g'), '"clave"')
              .replace(new RegExp('descripcion', 'g'), '"descripcion"');
            try {
              const jsonError = JSON.parse(_jsonError);
              if (jsonError.clave === 'ERROR')
              this.props.setDialogNotificationModal({
                opened:true,
                iconColor: 'error',
                icon: 'error',
                content: <div style={{width:600, fontSize:'1.25em'}}>{jsonError.descripcion}</div>,
                handleClose: this.props.setDialogNotificationModalToInit,
              })
            } catch (e) {};
          });
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

  handleClean(which) {
    this.props.emptyResult();
    const formInterfaceFieldsFiltered = Object.keys(this.formInterface.fields)
      .filter(i => !this.state.disabledList.find(ii => ii === i))
      .reduce((acumulator, next) => ({...acumulator, [next]:this.formInterface.fields[next]}), {});
    const cleanState = formCleaner(this.state.searchForm, which, formInterfaceFieldsFiltered);
    this.setState({searchForm:{...this.state.searchForm, ...cleanState}});

    // Clear AppBuffer & Cache
    const buildBufferKey = {
      [pathKeyNormalizer(this.props.location.pathname)]:{
        searchForm: {...this.state.searchForm, ...cleanState},
        searchResult: {itemListResult: null}
      }
    };
    this.props.fillAppBuffer(buildBufferKey);
    this.props.fillAppCache();

    //
    if (!Array.isArray(which)){
      if(this.state.disabledList.length > 0)
        return null;
      //this.props.cleanOutCatalog(["oficinas", "campanias"/*, "periodos"*/]);
    }
  }

  dinamicValidate(searchForm) {
    // eslint-disable-next-line
    if(searchForm.rfc && searchForm.rfc.length > 1 || searchForm.persona && searchForm.persona.length > 1 || searchForm.contrato && searchForm.contrato.length > 1)
      return {
        ...this.formInterface.fields,
        rfc: {...this.formInterface.fields.rfc, required: searchForm.rfc && searchForm.rfc.length > 1},
        persona: {...this.formInterface.fields.persona, required: searchForm.persona && searchForm.persona.length > 1},
        contrato: {...this.formInterface.fields.contrato, required: searchForm.contrato && searchForm.contrato.length > 1},
        nombre: {...this.formInterface.fields.nombre, required: false},
        apellidoPaterno: {...this.formInterface.fields.apellidoPaterno, required: false},
      };
    //
    return this.formInterface.fields;
  }

  // ResultTable
  handleRowChange(id) {
    console.log('CHECK ISSUE', this.props.location.pathname, avoidDoubleSlash(`${this.props.location.pathname}/${id}`));
    const prospecto = this.state.searchResult.itemListResult.find(i => i.persona === id);
    const buildBufferKey = {
      [pathKeyNormalizer(this.props.location.pathname)]:this.state,
      [pathKeyNormalizer(avoidDoubleSlash(`${this.props.location.pathname}/${id}`))]:{panelInfo:prospecto, session:this.props.session},
    };
    this.props.fillAppBuffer(buildBufferKey);
    this.props.history.push(`/prospectos/${id}`);
  }

  // Buttons below
  handleUserRegister(event) {
    const buildBufferKey = {
      [pathKeyNormalizer(this.props.location.pathname)]:this.state,
      [pathKeyNormalizer(avoidDoubleSlash(`${this.props.location.pathname}/registrar-usuario`))]:{prospecto:this.state.searchForm, session:this.props.session},
    };
    this.props.fillAppBuffer(buildBufferKey);
    this.props.history.push(`/prospectos/registrar-usuario`);
  }

  // RENDER //
  render() {
    const { classes } = this.props;
    const { empresas } = this.props.searchPanel.inputSelectData;
    const { searchResult, searchForm, disabledList } = this.state;
    const registrarUsuarioDisabled = searchResult.itemListResult ? searchResult.itemListResult.length > 0 ? true : false : true;

    if (!searchForm || !empresas)
      return null;

    const isEmptySearchForm = Object.keys(searchForm)
      .filter(i => !this.state.disabledList.find(ii => ii === i))
      .filter(i => searchForm[i] !== this.formInterface.fields[i].onEmpty)
      .reduce((acm, nxt) => ({...acm, [nxt]:searchForm[nxt]}), {});

    const SearchPanelProspectosSpread = {
      classes,
      disabledList,
      requiredList: this.dinamicValidate(searchForm) || null,
      title: "Busqueda cliente",
      handleOnChange: this.handleAttrChangeValue,
      onSearch: this.handleSubmit,
      onClean: this.handleClean,
      submitDisabled: isEmpty(isEmptySearchForm),
    }

    const resultTablePanelSpread = {
      title: <TitlePanelContainer style={{margin:'25px 25px 0'}}>Resultado de la busqueda</TitlePanelContainer>,
      columsData: this.resultTableInterface.colums,
      rowData: this.state.searchResult.itemListResult,
      rowTemplate: TableRowTemplate,
      handleRowChange: this.handleRowChange,
      emptyRowDataMsg: 'Sin resultados, busca o registra un usuario.',
      initRowDataMsg: 'Realiza una busqueda...',
      intoPanelContainer: false
    }

    // Render indeed
    return <Fragment>
      <TitleMainHead>Análisis cliente</TitleMainHead>
      <SearchPanel
        {...this.state.searchForm}
        {...SearchPanelProspectosSpread} >
        <SearchPanelTemplate />
      </SearchPanel>

      <PanelContainer style={{padding:0}}>
        <ResultTablePanel {...resultTablePanelSpread} />
        <ButtonsContainer>
          <ButtonOriginPrimary
            onClick={this.handleUserRegister}
            disabled={registrarUsuarioDisabled}
            children={"REGISTRAR USUARIO"}/>
        </ButtonsContainer>
      </PanelContainer>
    </Fragment>;
  }
}

const mapStateToProps = state => ({
  searchPanel: state.searchPanel,
  appBuffer: state.app.bufferState,
  catalogos: getCatalogos(state),
  session: state.sessionRegistro.sessionParams,
});

export default connect(mapStateToProps,{
  ...searchPanelActions,
  ...appActions,
  ...sessionActions,
  ...ownActions,
})(withStyles(styles)(Prospectos));
