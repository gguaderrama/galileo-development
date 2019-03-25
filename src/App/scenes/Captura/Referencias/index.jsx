// Dependencies
import React, {Component} from 'react';
// _commons
import PanelContainer from 'App/_commons/elements/PanelContainer';
// INDEED
import DataCollectionPanel, { handleAttrChangeValue } from 'App/_commons/components/DataCollectionPanel';


class Referencias extends Component {
  render(){
    return(
      <div>
        <PanelContainer>
          <DataCollectionPanel
            title={'Gestionar Integrantes'}
            intoPanelContainer={false}>
            
          </DataCollectionPanel>
        </PanelContainer>
      </div>
    );
  }
}

export default Referencias;