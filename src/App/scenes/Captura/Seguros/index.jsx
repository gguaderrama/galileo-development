import React, {Component } from 'react';
import { Grid, IconButton, Icon } from '@material-ui/core';
import AddSeguroTemplate from './viewTemplates/AddSeguroTemplate';
import PanelContainer from 'App/_commons/elements/PanelContainer';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';

class Seguros extends Component{
  constructor(props){
    super(props);
    this.state = {
      showAdd: false,
      showDataInsurance: false, }
  }

  addInsurance = (e) =>{
    let {showAdd} = this.state;
    if(e.target.value === 'S') showAdd = true;
    else showAdd = false;
    this.setState({showAdd})
  }

  addData = () =>{
    let {showDataInsurance} = this.state;
    showDataInsurance = true;
    this.setState({showDataInsurance})
  }

  render(){
    let {showAdd, showDataInsurance} = this.state;
    return (
      <div style={{width:100+'%'}}>
        <div>
          <RadiobuttonGroup handleOnChange={this.addInsurance} style={{margin:'0 10px', flexShrink:1, marginRight:0}} valuetext="seguro" name="confirm" label="Incluye Seguro ?"
          radioList={[{label:'Si', valuetext: 'S'}, {label:'No', valuetext: 'N'}]}  />            
        </div>
        {showAdd ?
          <PanelContainer>
            <Grid container justify={'space-between'}>
              <Grid item xs={11}>
                <p>Seguro de Vida</p>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={this.addData} ><Icon>add</Icon></IconButton>
              </Grid>
            </Grid>
          </PanelContainer>: null
        }
        {showDataInsurance ?
          <PanelContainer>
            <div>
              <Grid container justify={'space-between'}>
                <Grid item xs={12}>
                  <AddSeguroTemplate/>
                </Grid>    
              </Grid>
            </div>
          </PanelContainer>   
          : null
        }
      </div>
    );
  }
}
export default Seguros;