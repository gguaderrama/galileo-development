// Dependencies
import React, {Component} from 'react';
// INDEED
import DataCollectionPanel, { handleAttrChangeValue } from 'App/_commons/components/DataCollectionPanel';
import { ReferenciasTemplate } from './viewTemplates/ReferenciasTemplate';


export const Referencias = () => (
      <div style={{width:100+'%'}}>
          <DataCollectionPanel
            title={'Gestionar Integrantes'}
            intoPanelContainer={false} >
            <ReferenciasTemplate />
          </DataCollectionPanel>
      </div>
    );