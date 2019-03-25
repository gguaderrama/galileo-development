// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Actions
import * as actions from './redux-about/actions';

const businessWrapper = AttrComponent => {

  const InnerComponent = props => {
    // Get data from Store-FetchApi
    const { empresas, oficinas, campanias, statuses, periodos, destinos, gestores } = props.searchPanel.inputSelectData;

    const { title = "Busqueda", requiredList = null, disabledList = [] } = props

    // Herited styles
    const { classes={divContainer:'', formControl:''} } = props;

    // Event handlers
    const {
      handleOnChange = e => console.log('HANDLEONCHANGE :>', e.currentTarget),
      onSearch = e => console.log('ONSEARCH:>', e.currentTarget),
      onClean = e => console.log('ONCLEAN:>', e.currentTarget),
      submitDisabled = false,
    } = props;

    /*
     * Select data
     */
    // Empresas
    const { empresa="0" } = props;
    const empresasSpread = {
      inputLabelTitle: 'Empresa',
      selectValue: empresa,
      renderValue: empresas && empresas.find(i => i.claveEmpresa === empresa)
        ? empresas.find(i => i.claveEmpresa === empresa).nombreEmpresa : '',
      inputProps: { name: 'empresa', id: 'empresa-simple' },
      handleOnChange: handleOnChange,
      itemList: empresas && empresas.map(i => ({key:i.claveEmpresa, name:i.nombreEmpresa})),
      //onEmptyMsg: 'Selecciona una empresa',
      required: requiredList && requiredList.empresa && requiredList.empresa.required,
      disabled: disabledList.find(i => i === 'empresas') && true,
      classes
    }

    // Oficinas
    const { oficina="0" } = props;
    const oficinasSpread = {
      inputLabelTitle: 'Oficina',
      selectValue: oficina,
      renderValue: oficinas && oficinas.find(i => i.oficina === oficina)
        ? oficinas.find(i => i.oficina === oficina).nombre : '',
      inputProps: { name: 'oficina', id: 'oficina-simple' },
      handleOnChange: handleOnChange,
      itemList: oficinas && oficinas.map(i => ({key:i.oficina, name:i.nombre})),
      required: requiredList && requiredList.oficina && requiredList.oficina.required,
      disabled: disabledList.find(i => i === 'oficinas') && true,
      onEmptyMsg: '↤ Selecciona empresa',
      classes
    }

    // Campanias
    const { campania="0" } = props;
    const campaniasSpread = {
      inputLabelTitle: 'Campaña',
      selectValue: campania,
      renderValue: campanias && campanias.find(i => i.codigoCampania === campania)
        ? campanias.find(i => i.codigoCampania === campania).descripcion : '',
      inputProps: { name: 'campania', id: 'campania-simple' },
      handleOnChange: handleOnChange,
      itemList: campanias && campanias.map(i => ({key:i.codigoCampania, name:i.descripcion})),
      required: requiredList && requiredList.campania && requiredList.campania.required,
      disabled: disabledList.find(i => i === 'campanias') && true,
      onEmptyMsg: '↤ Selecciona oficina',
      classes
    }

    // Periodo
    const { periodo="0" } = props;
    const periodosSpread = {
      inputLabelTitle: 'Periodo',
      selectValue: periodo,
      renderValue: periodos && periodos.find(i => i.periodo === periodo)
        ? periodos.find(i => i.periodo === periodo).periodo : '',
      inputProps: { name: 'periodo', id: 'periodo-simple' },
      handleOnChange: handleOnChange,
      itemList: periodos && periodos.map(i => ({key:i.periodo, name:i.periodo})),
      required: requiredList && requiredList.periodo && requiredList.periodo.required,
      disabled: disabledList.find(i => i === 'periodos') && true,
      onEmptyMsg: '↤ Selecciona campaña',
      classes
    }

    // Statuses
    const { status="0" } = props;
    const statusesSpread = {
      inputLabelTitle: 'Status',
      selectValue: status,
      renderValue: statuses && statuses.find(i => i.claveStatus === status)
        ? statuses.find(i => i.claveStatus === status).nombreStatus : '',
      inputProps: { name: 'status', id: 'status-simple' },
      handleOnChange: handleOnChange,
      itemList: statuses && statuses.map(i => ({key:i.claveStatus, name:i.nombreStatus})),
      required: requiredList && requiredList.status && requiredList.status.required,
      disabled: disabledList.find(i => i === 'statuses') && true,
      classes
    }

    // Destino
    const { destino="0" } = props;
    const destinosSpread = {
      inputLabelTitle: 'Destino',
      selectValue: destino,
      renderValue: destinos && destinos.find(i => i.claveDestino === destino)
        ? destinos.find(i => i.claveDestino === destino).nombreDestino : '',
      inputProps: { name: 'destino', id: 'destino-simple' },
      handleOnChange: handleOnChange,
      itemList: destinos && destinos.map(i => ({key:i.claveDestino, name:i.nombreDestino})),
      required: requiredList && requiredList.destino && requiredList.destino.required,
      disabled: disabledList.find(i => i === 'destinos') && true,
      classes
    }

    // Gestor
    const { gestor="0" } = props;
    const gestorRenderValue = gestores && gestores.find(i => i.persona === gestor)
      ? gestores.find(i => i.persona === gestor)
      : {nombre: '', apellidoPat: '', apellidoMat: ''};
    const gestoresSpread = {
      inputLabelTitle: 'Gestor',
      selectValue: gestor,
      renderValue: `${ gestorRenderValue.nombre} ${gestorRenderValue.apellidoPat} ${gestorRenderValue.apellidoMat}`,
      inputProps: { name: 'gestor', id: 'gestor-simple' },
      handleOnChange: handleOnChange,
      itemList: gestores && gestores.map(i => ({key:i.persona, name:`${ i.nombre} ${i.apellidoPat} ${i.apellidoMat}`})),
      onEmptyMsg: '↤ Selecciona destino',
      required: requiredList && requiredList.gestor && requiredList.gestor.required,
      disabled: disabledList.find(i => i === 'gestores') && true,
      classes
    }

    /*
     * Input[text] data
     */
    // Nombre
    const { nombre="" } = props;
    const nombreSpread = {
      label: "Nombre",
      value: nombre,
      handleOnChange: handleOnChange,
      required: requiredList && requiredList.nombre && requiredList.nombre.required,
      inputProps: { name: 'nombre', id: 'nombre-simple', disabled: disabledList.find(i => i === 'nombre') && true },
      classes
    }

    // Apellido Paterno
    const { apellidoPaterno="" } = props;
    const apellidoPaternoSpread = {
      label: "Apellido Paterno",
      value: apellidoPaterno,
      handleOnChange: handleOnChange,
      required: requiredList && requiredList.apellidoPaterno && requiredList.apellidoPaterno.required,
      inputProps: { name: 'apellidoPaterno', id: 'apellidoPaterno-simple', disabled: disabledList.find(i => i === 'apellidoPaterno') && true },
      classes
    }

    // Apellido Materno
    const { apellidoMaterno="" } = props;
    const apellidoMaternoSpread = {
      label: "Apellido Materno",
      value: apellidoMaterno,
      handleOnChange: handleOnChange,
      required: requiredList && requiredList.apellidoMaterno && requiredList.apellidoMaterno.required,
      inputProps: { name: 'apellidoMaterno', id: 'apellidoMaterno-simple', disabled: disabledList.find(i => i === 'apellidoMaterno') && true },
      classes
    }

    // RFC
    const { rfc="" } = props;
    const rfcSpread = {
      label: "RFC",
      value: rfc,
      handleOnChange: handleOnChange,
      required: requiredList && requiredList.rfc && requiredList.rfc.required,
      inputProps: { name: 'rfc', id: 'rfc-simple', disabled: disabledList.find(i => i === 'rfc') && true },
      classes
    }

    // Fecha Nacimiento
    const { fechaNacimiento="" } = props;
    const fechaNacimientoSpread = {
      label: "Fecha Nacimiento",
      value: fechaNacimiento,
      handleOnChange: handleOnChange,
      required: requiredList && requiredList.fechaNacimiento && requiredList.fechaNacimiento.required,
      inputProps: { name: 'fechaNacimiento', id: 'fechaNacimiento-simple', type: 'date', disabled: disabledList.find(i => i === 'fechaNacimiento') && true },
      InputLabelProps: {shrink: true},
      classes
    }

    // Persona
    const { persona="" } = props;
    const personaSpread = {
      label: "Persona",
      value: persona,
      handleOnChange: handleOnChange,
      inputProps: { name: 'persona', id: 'persona-simple', disabled: disabledList.find(i => i === 'persona') && true },
      required: requiredList && requiredList.persona && requiredList.persona.required,
      classes
    }

    // Contrato
    const { contrato="" } = props;
    const contratoSpread = {
      label: "Contrato",
      value: contrato,
      handleOnChange: handleOnChange,
      required: requiredList && requiredList.contrato && requiredList.contrato.required,
      inputProps: { name: 'contrato', id: 'contrato-simple', disabled: disabledList.find(i => i === 'contrato') && true },
      classes
    }

    // Alltogether to Component
    const pipeProps = {
      children: props.children,
      intoPanelContainer: props.intoPanelContainer,
      title,
      classes,
      onSearch,
      onClean,
      submitDisabled,

      // Input settings
      inputsSetting: {
        empresasSpread,
        oficinasSpread,
        campaniasSpread,
        periodosSpread,
        statusesSpread,
        destinosSpread,
        gestoresSpread,
        nombreSpread,
        apellidoPaternoSpread,
        apellidoMaternoSpread,
        rfcSpread,
        fechaNacimientoSpread,
        personaSpread,
        contratoSpread,
      }
    }

    return <AttrComponent {...pipeProps} />
  }

  // Conect to Store
  return connect(state => ({
    searchPanel: state.searchPanel,
  }), actions)(InnerComponent);

}

export default businessWrapper;
