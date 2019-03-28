// Dependencies
import React, { Fragment } from 'react';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';
import PanelContainer, { TitleMainHead, TitlePanelContainer } from 'App/_commons/elements/PanelContainer';
// Owns
import IntegrantesTableInterface from './interfaces/integrantesTableInterface';
import IntegrantesRowTemplate from './integrantes_row_template';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
class AcordionCredito extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchForm: null,
      disabledList: [],
      searchResult: {
        itemListResult: null
      }
    }
  }
  handleRowChange(){}
  render(){
    console.log(this.props.arrayIntegrantes.arrayIntegrantesTable)
    const resultTablePanelSpread = {
      title: null,
      columsData: IntegrantesTableInterface.colums,
      rowData: this.props.arrayIntegrantes.arrayIntegrantesTable,
      rowTemplate: IntegrantesRowTemplate,
      handleRowChange: this.handleRowChange,
      emptyRowDataMsg: 'Sin resultados, busca o registra un usuario.',
      initRowDataMsg: null,
      intoPanelContainer: false,
      classesOverride: {tableBody: {backgroundColor: "white"}}
    }
    return(
      <div className="integrantes">
        <h4>Gestionar integrantes</h4>
        <ResultTablePanel {...resultTablePanelSpread} />
      </div>
    )
  }
}
export default AcordionCredito;
