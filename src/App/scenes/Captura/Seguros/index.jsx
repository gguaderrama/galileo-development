import React, {Component } from 'react';
import DataCollectionPanel from 'App/_commons/components/DataCollectionPanel';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import { Grid, IconButton, Icon } from '@material-ui/core';
import AddSeguroTemplate from './viewTemplates/AddSeguroTemplate';

class Seguros extends Component{
  constructor(props){
    super(props);
    this.state = {
      showAdd: true,
      showDataInsurance: true,
    }
  }

  addInsurance = () =>{
    let {showDataInsurance} = !this.state;
    this.setState({showDataInsurance})
  }

  render(){
    let {showAdd, showDataInsurance} = this.state;
    return (
      <div style={{width:100+'%'}}>
        <DataCollectionPanel intoPanelContainer={false}>
          <div>
            <RadiobuttonGroup style={{margin:'0 10px', flexShrink:1, marginRight:0}} valuetext="seguro" label="Incluye Seguro ?"
            radioList={[{label:'Si', valuetext: 'S'}, {label:'No', valuetext: 'N'}]}  />            
          </div>
        </DataCollectionPanel>
        {showAdd ?
          <DataCollectionPanel>
            <div>
              <Grid container justify={'space-between'}>
                <Grid item xs={11}>
                  <p>Seguro de Vida</p>
                </Grid>
                <Grid item xs={1}>
                  <IconButton><Icon>add</Icon></IconButton>
                </Grid>
              </Grid>
              {showDataInsurance ?
                <Grid container justify={'space-between'}>
                  <Grid item xs={12}>
                    <AddSeguroTemplate/>
                    </Grid>    
                </Grid>
                : null
              }
              
            </div>
          </DataCollectionPanel>   
          : null
        }
      </div>
    );
  }

}
export default Seguros;