import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { RowTemplate} from './RowTemplate';
import { Grid, IconButton, Icon } from '@material-ui/core';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
// Actions
import * as appActions from 'redux/shared-reducers/app-actions';
import ModalTemplate from './ModalTemplate';


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
    intoPanelContainer: false
  }

class ReferenciasTemplate extends Component{
  
  constructor(props){
    super(props);
    this.handleIconOnClick = this.handleIconOnClick.bind(this);
  }

  handleIconOnClick() {
   this.props.setDialogNotificationModal({
      content: <ModalTemplate />,
      opened: true,
      handleClose: this.props.setDialogNotificationModalToInit,
      buttonsHidden: false,
      flag: true
    })
  }
render(){
  return(
    <Fragment>
      <Grid container justify={'space-between'}>
        <Grid item xs={11}>
          <h3>Gestionar Integrantes</h3>
          <p>Agregue las referencias necesarias, tiene un máximo de cuatro.</p>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={this.handleIconOnClick} ><Icon>add</Icon></IconButton>
        </Grid>
      </Grid>
      <hr />
      <ResultTablePanel {...resultTablePanelSpread} />
    </Fragment>
  )}
}

export default connect (null,appActions)(ReferenciasTemplate);