import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
// Commons
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';
import DataCollectionPanel, { handleAttrChangeValue }  from 'App/_commons/components/DataCollectionPanel';
import { RowEditTemplate} from './RowTemplate';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
// Actions
import * as appActions from 'redux/shared-reducers/app-actions';
import { Button, Checkbox } from '@material-ui/core';

const colums = [{key:0,label:<Checkbox/>},
                {key:1,label:'Nombre(s)'},
                {key:2,label:'Apellido paterno'},
                {key:3,label:'Apellido materno'},
                {key:5,label:'Parentesco'},
                {key:5,label:'Teléfono particular'},
                {key:4,label:'Teléfono celular'},];
const infoDummy = [{'paterno':'Laboral','materno':'materno','nombre':'The Boss','particular':5578787878,'celular':5578787878,'parentesco':'El Padrino'},
{'paterno':'Casa','materno':'materno','nombre':'Jefret','particular':5567656543,'celular':5566778899,'parentesco':'Cousin'},
{'paterno':'Oficina','materno':'materno','nombre':'Chachis','particular':5590987876,'celular':5544332211,'parentesco':'Secretary'},];
const resultTablePanelSpread = {
    columsData: colums,
    rowData: infoDummy,
    rowTemplate: RowEditTemplate,
    emptyRowDataMsg: 'Sin resultados, no existen referencias.',
    rowClickDisabled:true,
    classesOverride: {tableBody: {backgroundColor: "white"}},
    title: 'Referencias',
    view:'editar',
}


class ModalTemplate extends Component{

  constructor(props){
    super(props);
    this.handleAttrChangeValue = this.handleAttrChangeValue.bind(this);
    this.state = {};
  }
  handleAttrChangeValue(event, panelRelated = null){
    this.setState(handleAttrChangeValue(this.state, {event, panelRelated}));
  }

  render(){
    return(
      <Fragment>
        <h3>Nueva Referencia</h3>
        <div style={{width:100+'%'}}>
          <DataCollectionPanel {...this.state.withTemplatePanel} 
            title={'Datos Referencia'}
            statusList={statusList}
            intoPanelContainer={true}
            handleOnChange={e => this.handleAttrChangeValue(e, 'withTemplatePanel')}>
            <div>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1, marginLeft:0}} valuetext="name" label="Nombre(s)"  />
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="lastnamefather" label="Apellido Paterno"  />
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="lnamemother" label="Apellido Materno"  />
                  <SelectDecored style={{margin:'0 10px', flexGrow:1,width: '16%'}} valuetext="familiar" label="Parentesco" selectlist="statusList" keys="theKey theName"  />              
              </div>
              <div>
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="phone" label="Teléfono particular (con lada)"  />
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="cellphone" label="Teléfono celular" />                
              </div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}>                
                <Button
                    value="limpiar"
                    color="primary"
                    onClick={this.props.setDialogNotificationModalToInit}>Limpiar</Button>
                <Button
                    value="agregar"
                    color="primary"
                    onClick={this.props.setDialogNotificationModalToInit}>Agregar</Button>
              </div>
            </div>
          </DataCollectionPanel>
          <DataCollectionPanel intoPanelContainer={true} >
            <div><ResultTablePanel {...resultTablePanelSpread} /> </div>
          </DataCollectionPanel>
        </div>
      </Fragment>
    )}
}


export default connect(null,appActions)(ModalTemplate);

export const statusList = [
  {theKey: 'E', theName: 'Esposo(a)'},
  {theKey: 'H', theName: 'Hijo(a)'},
  {theKey: 'C', theName: 'Conyuge'},
  {theKey: 'O', theName: 'Otro'},
];