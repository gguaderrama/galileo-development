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

/* Template Added */
import MoreInfoPanel from './detalle/MoreInfoPanel';
class AcordionCredito extends React.Component{
  constructor(props){
    super(props)
    this.handleRowChange = this.handleRowChange.bind(this);
    this.state = {
      modalProps: this.props,
      searchForm: null,
      disabledList: [],
      searchResult: {
        itemListResult: null
      }
    }
  }
  handleRowChange(event,  whishPanel) {
    this.props.setDialogNotificationModal({
      content: <MoreInfoPanel
        initData={this.state.panelInfo}
        setDataToParent={this.getDataFromPanelModal}
        handleOnClose={this.props.setDialogNotificationModalToInit} />,
      opened: true,
      buttonsHidden: true,
    });
    //console.log('handleRowChange in ProspectoDetail :>', event.currentTaget, rowId, whishPanel);
    // switch (whishPanel) {
    //   case 'simulador':
    //     this.props.setDialogNotificationModal({
    //       content: <SimulatorPanel
    //         //initData={this.state.panelInfoMore}
    //         //setDataToParent={this.getDataFromPanelModal}
    //         handleOnClose={this.props.setDialogNotificationModalToInit} />,
    //       opened: true,
    //       buttonsHidden: true,
    //     });
    //     break;
    //   default:

    // }
  }
  render(){
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
        <ResultTablePanel {...resultTablePanelSpread}  />
      </div>
    )
  }
}
export default AcordionCredito;