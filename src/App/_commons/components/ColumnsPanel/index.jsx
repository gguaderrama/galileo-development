import React from 'react';
//import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

// Styles
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import SelectDecored from 'App/_commons/elements/SelectDecored';
//import TextFieldDecored, { propsTextFieldBuilder } from 'TextFieldDecored';

// Owns
//import ViewTemplateError from './ViewTemplateError';

// Actions
//import * as actions from 'appActions';

const columsDemo = [
  {title: "One", content: <SelectDecored inputLabelTitle="Imput select demo"/>},
  {title: "Two"},
  {title: "Three"},
]

const ColumnsPanel = props => {
  const { classes } = props;
  const {
    //handleOnChange = e => console.log('HANDLEONCHANGE DataCollectionPanel :>', e.target),
    //handleMoreInfo = e => console.log('VER MÁS INFORMACIÓN DataCollectionPanel :>', e.target),
    //handleOnChangeCheckbox = e => console.log('DETAILPERSONPANEL>:', e.target.checked, e.target.value),
    //requiredList=null,
    //checkboxList=null,
    columns = columsDemo
  } = props;

  //let viewTemplatePropsDecored = null;
    //if(props.viewTemplate) {
    //  if(typeof(props.viewTemplate.type) !== 'string'){
    //    return <ViewTemplateError classes={classes} />;
    //  }
    //  viewTemplatePropsDecored = props.viewTemplate.props &&
    //  {...props.viewTemplate.props}.children.map(i => {
    //    const inputProps = propsTextFieldBuilder({
    //      label: i.props.label || 'Default label',
    //      valuetext: i.props.valuetext || 'defaultValue',
    //      type: i.props.type,
    //      props,
    //    })
    //    return {...i, props:{...i.props, ...inputProps}}
    //  })
  //}

  //const checkboxGroupSpread = {
    //  checkboxList: checkboxList.map(i => ({...i, checked: props[i.valuetext]})),
    //  handleOnChangeCheckbox,
  //}

  // Render indeed
  return (<PanelContainer style={{padding: '14px'}}>
      <Row>
        { columns.map((colum, idx) => <Col key={idx} xs className={classes.cols}>
          <PanelContainer>
            <TitlePanelContainerAlt>{colum.title}</TitlePanelContainerAlt>
            { colum.content }
          </PanelContainer>
        </Col>) }
      </Row>

      {/* props.viewTemplate ? viewTemplatePropsDecored.map(Itm => Itm) :
        <span>
          <TextFieldDecored {...propsTextFieldBuilder({
            label: 'Default label',
            valuetext: 'defaultValue',
            props,
          })} />
        </span>
      */}
  </PanelContainer>);
};

ColumnsPanel.propTypes = {
  //
};

export default withStyles(styles)(ColumnsPanel);
