import React, { Fragment } from 'react';

// Styles
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

// Commons
import PanelContainer, { TitlePanelContainer } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored, { propsTextFieldBuilder } from 'App/_commons/elements/TextFieldDecored';

// Owns
import { curryNodeTransformRules, handleAttrChangeValue as _handleAttrChangeValue } from './methodsImplement';

// utils
import { childrenIterator } from 'utils/misc';

//
const DataCollectionPanel = props => {
  //const { classes } = props;
  const {
    // eslint-disable-next-line
    handleOnChange = e => console.log('HANDLEONCHANGE DataCollectionPanel :>', e.target),
    // eslint-disable-next-line
    requiredList = [],
    // eslint-disable-next-line
    disabledList = [],
    title = null,
    intoPanelContainer = true,
    viewTemplate,
    children,
  } = props;
  const nodeTransformRules = curryNodeTransformRules(props);

  if(viewTemplate || children) {
    // eslint-disable-next-line
    const validChild = children && typeof(children.type) === 'function' && children.type() || children;
    const viewTemplatePropsDecored = children && React.isValidElement(validChild)
      ? childrenIterator(validChild.props.children, nodeTransformRules)
      : viewTemplate && React.isValidElement(viewTemplate()) &&
        childrenIterator(viewTemplate().props.children, nodeTransformRules);

    const innerRender = <Fragment>
      {title && <TitlePanelContainer>{title}</TitlePanelContainer>}
      { viewTemplatePropsDecored.map(Itm => Itm) }
    </Fragment>

    // Render
    if (intoPanelContainer)
      return <PanelContainer style={{padding: '14px'}}>{innerRender}</PanelContainer>
    //
    return innerRender;
  } else {
    // Demo Zone
    const innerRenderDemo = <Fragment>
      { title
        ? <TitlePanelContainer>{title}</TitlePanelContainer>
        : <TitlePanelContainer>DataCollectionPanel basic use</TitlePanelContainer>
      }
      <TextFieldDecored {...propsTextFieldBuilder({
        label: 'Default label',
        valuetext: 'defaultValue',
        props,
      })} />
    </Fragment>
    if (intoPanelContainer)
      return <PanelContainer>{innerRenderDemo}</PanelContainer>
    return innerRenderDemo;
  }
};

export default withStyles(styles)(DataCollectionPanel);

export const handleAttrChangeValue = _handleAttrChangeValue;
