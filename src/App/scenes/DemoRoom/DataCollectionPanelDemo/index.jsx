// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions
import * as appActions from 'redux/shared-reducers/app-actions';

// _commons
import { SpanBlue, CodePanel } from 'App/_commons/elements/usefulSnippets';
import PanelContainer from 'App/_commons/elements/PanelContainer';
// INDEED
import DataCollectionPanel, { handleAttrChangeValue } from 'App/_commons/components/DataCollectionPanel';

// Owns
//import HowUsed from './components/HowUsed';
import DemoTemplate, { statusList } from './viewTemplates/DemoTemplate';

const naves = [
  {value:'vocho', text:'Vocho'},
  {value:'fierrari', text:'Fierrari'},
  {value:'rognol', text:'Roñol'},
]

class DataCollectionPanelDemo extends Component {
  constructor(props){
    super(props);
    // methods
    this.handleAttrChangeValue = this.handleAttrChangeValue.bind(this);
    // state
    this.state = {};
  }

  // React methods
  componentDidMount() {
    this.props.breadcrumbsShow('DataCollectionPanel Demo');
  }

  handleAttrChangeValue(event, panelRelated = null){
    this.setState(handleAttrChangeValue(this.state, {event, panelRelated}));
  }

  //
  render() {
    //console.log(this.state);
    return (<Fragment>
      {/*
        Docs about it
        */}
      {/*<HowUsed /> //TODO: '<h6> cannot appear as a descendant of <p>' issue  */}

      {/*
        Basic use
        */}
      <PanelContainer>
        <DataCollectionPanel {...this.state} handleOnChange={this.handleAttrChangeValue} />
        <CodePanel>
          this.state = {JSON.stringify(this.state)}
        </CodePanel>
      </PanelContainer>

      {/*
        Use state slot and set it out of container
        */}
      <PanelContainer>
        <DataCollectionPanel
          {...this.state.someStatePanel}
          title=<span>DataCollectionPanel using a state slot and <SpanBlue>intoPanelContainer = false</SpanBlue></span>
          intoPanelContainer={false}
          handleOnChange={e => this.handleAttrChangeValue(e, 'someStatePanel')} />
        <CodePanel>
          this.state = {'{'}"someStatePanel":{JSON.stringify(this.state.someStatePanel)}{'}'}
        </CodePanel>
      </PanelContainer>

      {/*
        Template use
        */}
      <PanelContainer>
        <DataCollectionPanel
          {...this.state.withTemplatePanel}
          statusList={statusList}
          naves={naves}
          title=<span>DataCollectionPanel, template (<SpanBlue>viewTemplate</SpanBlue>) use</span>
          intoPanelContainer={false}
          handleOnChange={e => this.handleAttrChangeValue(e, 'withTemplatePanel')}
          viewTemplate={DemoTemplate} />
        <CodePanel>
          this.state = {'{'}"withTemplatePanel":{JSON.stringify(this.state.withTemplatePanel)}{'}'}
        </CodePanel>
      </PanelContainer>

      {/*
        Children use
        */}
      <PanelContainer>
        <DataCollectionPanel
          {...this.state.withChildrenPanel}
          statusList={statusList}
          naves={naves}
          title=<span>DataCollectionPanel, <SpanBlue>children</SpanBlue> use</span>
          intoPanelContainer={false}
          handleOnChange={e => this.handleAttrChangeValue(e, 'withChildrenPanel')}>
            <DemoTemplate />
          </DataCollectionPanel>
        <CodePanel>
          this.state = {'{'}"withChildrenPanel":{JSON.stringify(this.state.withChildrenPanel)}{'}'}
        </CodePanel>
      </PanelContainer>

    </Fragment>)

  }
}

export default connect(null, appActions)(DataCollectionPanelDemo);
