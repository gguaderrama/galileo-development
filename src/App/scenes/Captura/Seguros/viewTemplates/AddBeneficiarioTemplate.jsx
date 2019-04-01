import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import DataCollectionPanel, { handleAttrChangeValue }   from 'App/_commons/components/DataCollectionPanel';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';
import { Button } from '@material-ui/core';
// Actions
import * as appActions from 'redux/shared-reducers/app-actions';

class AddBeneficiarioTemplate extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  handleAttrChangeValue(event, panelRelated = null){
    this.setState(handleAttrChangeValue(this.state, {event, panelRelated}));
  }

  render(){
    return(
      <Fragment>
        <DataCollectionPanel
          typeList={typeList}
          title={"Nuevo beneficiario"}
          intoPanelContainer={false}
          handleOnChange={e => this.handleAttrChangeValue(e, 'withTemplatePanel')}>
          <div>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
              <TextFieldDecored style={{margin:'0 10px', flexGrow:1, marginLeft:0}} valuetext="name" label="Nombre(s)"  />
              <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="lastname" label="Apellido paterno*"  />
              <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="lastnamemother" label="Apellido materno*"  />             
            </div>
            <div>
              <SelectDecored style={{margin:'0 10px', flexGrow:1,width: '30%'}} valuetext="type" label="Relacion" selectlist="typeList" keys="theKey theName"  /> 
              <TextFieldDecored style={{margin:'0 10px', flexGrow:1}} valuetext="porcent" label="Porcentaje asegurado"  />             
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
      </Fragment>
    );
  }
}

export default connect(null,appActions)(AddBeneficiarioTemplate);

export const typeList = [
  {theKey: 'V', theName: 'Vida'},
  {theKey: 'F', theName: 'Funerario'},
  {theKey: 'D', theName: 'Desempleo'},
  {theKey: 'O', theName: 'Otro'},
];