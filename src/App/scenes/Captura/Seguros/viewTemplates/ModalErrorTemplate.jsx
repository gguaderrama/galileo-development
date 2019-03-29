import React from 'react';
import {connect} from 'react-redux';
import {Button, Icon} from '@material-ui/core';
// Actions
import * as appActions from 'redux/shared-reducers/app-actions';

const ModalErrorTemplate = (props) => (
  <div style={{width: 500 + 'px', paddingTop: 15+'px', paddingBottom:0+'px'}}>
    <div>
      <div style={{display:'flex', justifyContent: 'flex-start', padding:0+'px'}} >
        <Icon color="secondary" style={{marginTop:15+'px',marginRight:10+'px'}} >error_outline</Icon>
        <h3>Eliminar Integrante</h3>
      </div>
      <div style={{marginLeft:30+'px'}}>
        <p>¿Esta Seguro de querer eliminar al integrante?</p>
      </div>      
    </div>
    <div style={{display:'flex', justifyContent: 'flex-end'}}>                
      <Button
          value="cancelar"
          color="secondary"
          onClick={props.setDialogNotificationModalToInit}>Cancelar</Button>
      <Button
          value="aceptar"
          color="secondary"
          onClick={props.setDialogNotificationModalToInit}>Aceptar</Button>
    </div>
  </div>
)

export default connect(null,appActions)(ModalErrorTemplate);