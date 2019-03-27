import React, { Component,Fragment } from 'react';
import {connect} from 'react-redux';
// Commons
import { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';
import PanelContainer from 'App/_commons/elements/PanelContainer';
import DataCollectionPanel, { handleAttrChangeValue }  from 'App/_commons/components/DataCollectionPanel'
import { RowTemplate} from './RowTemplate';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
// Actions
import * as appActions from 'redux/shared-reducers/app-actions';
import { Button } from '@material-ui/core';

const colums = [{key:1,label:'Tipo de Referencia'},
                {key:2,label:'Nombre'},
                {key:3,label:'Teléfono particular'},
                {key:4,label:'Teléfono celular'},
                {key:5,label:'Parentesco'}];
const infoDummy = [{'referencia':'Laboral','nombre':'The Boss','particular':5578787878,'celular':5578787878,'parentesco':'El Padrino'},
{'referencia':'Casa','nombre':'Jefret','particular':5567656543,'celular':5566778899,'parentesco':'Cousin'},
{'referencia':'Oficina','nombre':'Chachis','particular':5590987876,'celular':5544332211,'parentesco':'Secretary'},
{'referencia':'Laboral','nombre':'Peter','particular':5543212345,'celular':5566112299,'parentesco':'Partner'},];
const resultTablePanelSpread = {
    columsData: colums,
    rowData: infoDummy,
    rowTemplate: RowTemplate,
    emptyRowDataMsg: 'Sin resultados, no existen referencias.',
    rowClickDisabled:true,
    classesOverride: {tableBody: {backgroundColor: "white"}},
    intoPanelContainer: true,
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
          <DataCollectionPanel {...this.state.withTemplatePanel} 
            title={'Datos Referencia'}
            handleOnChange={e => this.handleAttrChangeValue(e, 'withTemplatePanel')}>
            <div>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1, marginLeft:0}} valuetext="name" label="Nombre(s)"  />
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="lastnamefather" label="Apellido Paterno"  />
                  <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="lnamemother" label="Apellido Materno"  />
                  <SelectDecored style={{margin:'0 10px', flexGrow:1}} valuetext="familiar" label="Parentesco" selectlist="statusList" keys="theKey theName"  />              
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
      </Fragment>
    )}
}


export default connect(null,appActions)(ModalTemplate);