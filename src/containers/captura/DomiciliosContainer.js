import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isValid, isDirty, formValueSelector, change } from 'redux-form';
import isEmpty from 'lodash.isempty';
import TablaDomicilios from '../../components/captura/TablaDomicilios';
import FormDomicilios from '../../components/captura/FormDomicilios';
import { addDomicilio, delDomicilio, loadDomicilio, guardaDomicilio } from '../../redux/actions/captura/xmlInterfaces';
import { getListaCatalogos, getCatalogoEstados, getCatalogoColonias } from '../../redux/selectors/captura/catalogos';
import { fetchCatalogoColonias } from '../../redux/actions/captura/catalogos';
import { getDomicilios } from '../../redux/selectors/captura/xmlInterfaces';
import { validaForm } from '../../redux/actions/captura/validaForm';
import { getIformularios } from '../../redux/selectors/captura/iformularios';
import { validaRequeridos } from '../../utilities/validations';


class DomiciliosContainer extends Component {

    state = {
        selected: [],
    };

    static propTypes = {
        pantalla: PropTypes.bool,
        domicilios: PropTypes.array,
    }

    handleOnChangeEstado = event => {
        const {valuesDomicilioForm} = this.props;
        if (event.target.value && valuesDomicilioForm.cp && valuesDomicilioForm.cp.length === 5) {
            this.cargarColonias(this.obtenerIdEstado(event.target.value),valuesDomicilioForm.cp);
        }
    }

    cargarColonias = (idEstado, cp) => {
        let asentamiento = {
            "idEstado": idEstado,
            "cp": cp
        };
        this.props.fetchCatalogoColonias(asentamiento, () => {});
    }
    
    handleOnChangeColonia = event => {
        const {valuesDomicilioForm, catalogoColonias, change} = this.props;
        const colonia = catalogoColonias.find(colonia => colonia.asentamiento === event.target.value);
        if (valuesDomicilioForm.municipioDelegacion !== colonia.municipio){
            change('Domicilios', 'municipioDelegacion', colonia.municipio)
        }
        if (valuesDomicilioForm.ciudad !== colonia.ciudad){
            change('Domicilios', 'ciudad', colonia.ciudad)
        }
    }
    
    obtenerIdEstado = claveEstado => {
        return this.props.catalogoEstados.find(estado => estado.codigoEstado === claveEstado).idEstado;
    }

    handleOnChangeCP = event => {
        const { valuesDomicilioForm } = this.props;
        if (event.target.value.length === 5 && valuesDomicilioForm.codigoEstado) {
            this.cargarColonias(this.obtenerIdEstado(valuesDomicilioForm.codigoEstado),event.target.value);
        }
    }

    handleAddDomicilio = () => {
        const { valuesDomicilioForm, 
            iformularios, 
            validaForm, 
            dirtyDomicilios, 
            validDomicilios, 
            addDomicilio, 
            loadDomicilio } = this.props;
        let formularios;
        if (valuesDomicilioForm.tipoDomicilio === 'CASA'){
            formularios = ['domiciliosparticulareslist'];
        } else if (valuesDomicilioForm.tipoDomicilio === 'CASA'){
            formularios = ['domiciliosempleolist'];
        }
        let errors = {};
        errors = validaRequeridos(
          iformularios, 
          formularios, 
          valuesDomicilioForm,
          'Domicilios',
          validaForm
          );
        if (dirtyDomicilios && validDomicilios && isEmpty(errors)) {
            addDomicilio(valuesDomicilioForm);
            loadDomicilio({'calle':'',
                'noExterior':'',
                'cp':'',
                'colonia':'',
                'tipoDomicilio':'',
                'entreCalles':'',
                'noInterior':'',
                'ciudad':'',
                'pais':'',
                'tipoVivienda':'',
                'codigoEstado':'',
                'consecutivo':'',
                'municipioDelegacion':'',
                'anioAntiguedad':'',
                'mesAntiguedad':''});
        }
    };

    handleSaveDomicilio = () => {
        const { valuesDomicilioForm } = this.props;
        const payload = {domicilio: valuesDomicilioForm, domicilioAnterior: this.state.domicilioAEditar}
        this.props.guardaDomicilio(payload);
        this.setState({ edicion: false, domicilioAEditar: null });
    };

    handleClick = (event, domicilio) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(domicilio);
        let newSelected = [];
        
        if (selectedIndex === -1) {
            newSelected = newSelected.concat([], domicilio);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleClickDelete = () => {
        this.props.delDomicilio(this.state.selected);
        this.setState({ selected: [] });
    }

    handleClickEdit = domicilioSelected => {
        this.props.loadDomicilio(domicilioSelected);
        domicilioSelected.codigoEstado && domicilioSelected.cp && this.cargarColonias(this.obtenerIdEstado(domicilioSelected.codigoEstado),domicilioSelected.cp);
        this.setState({ selected: [], edicion: true, domicilioAEditar: domicilioSelected });
    }

    render() {
        const {
            domicilios,
            listaCatalogos,
            catalogoEstados,
            catalogoColonias } = this.props;
        const { selected, edicion } = this.state;
        return (
            <div>
                <FormDomicilios
                    handleAddDomicilio={this.handleAddDomicilio}
                    listaCatalogos={listaCatalogos}
                    catalogoEstados={catalogoEstados}
                    catalogoColonias={catalogoColonias}
                    handleOnChangeEstado={this.handleOnChangeEstado}
                    handleOnChangeCP={this.handleOnChangeCP}
                    handleOnChangeColonia={this.handleOnChangeColonia}
                    handleSaveDomicilio={this.handleSaveDomicilio}
                    edicion={edicion}></FormDomicilios>
                <TablaDomicilios
                    domicilios={domicilios}
                    handleClick={this.handleClick}
                    handleClickEdit={this.handleClickEdit}
                    handleClickDelete={this.handleClickDelete}
                    selected={selected}></TablaDomicilios>
            </div>
        )
    }
}

const selector = formValueSelector('Domicilios');

const mapStateToProps = state => {    
    const valuesDomicilioForm = selector(state, 'calle',
            'noExterior',
            'cp',
            'colonia',
            'tipoDomicilio',
            'entreCalles',
            'noInterior',
            'ciudad',
            'pais',
            'tipoVivienda',
            'codigoEstado',
            'municipioDelegacion',
            'anioAntiguedad',
            'mesAntiguedad');
    return {
        valuesDomicilioForm,
        listaCatalogos: getListaCatalogos(state),
        catalogoEstados: getCatalogoEstados(state),
        catalogoColonias: getCatalogoColonias(state),
        domicilios: getDomicilios(state),
        iformularios: getIformularios(state),
        dirtyDomicilios: isDirty('Domicilios')(state),
        validDomicilios: isValid('Domicilios')(state),
    }
};

export default connect(mapStateToProps, { addDomicilio, delDomicilio, fetchCatalogoColonias, loadDomicilio, guardaDomicilio, validaForm, change })(DomiciliosContainer);