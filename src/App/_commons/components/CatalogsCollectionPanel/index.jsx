// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import * as actions from './redux-about/actions';

// fetch dependence
// CONSULTAR_CATALOGO_RELACIONES

// src/redux/actions/captura/catalogos.js

class CatalogsCollectionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({...this.props.catalogsCollection});

      // oficinas: //depend it empresas, this.props.loadOficinas({claveEmpresa: empresa['claveEmpresa']})
      // campanias: loadCampanias,
      // periodos: loadPeriodos,
      // destinos: loadDestinos,
      // gestores: loadGestores,
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.catalogsCollection !== nextProps.catalogsCollection){
      this.setState({...nextProps.catalogsCollection});
    }
  }

  //addToCatalog(itemList) {
  //  if(this.props.addToCatalog)
  //    this.props.addToCatalog(itemList)
  //}

  render() {
    console.log('catalogsCollection', this.state);
    return (
      <div>
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Conect to Store
export default connect(state => ({
  catalogsCollection: state.catalogsCollection,
}), actions)(CatalogsCollectionPanel);
