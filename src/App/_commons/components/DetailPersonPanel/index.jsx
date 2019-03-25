import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

// Styles
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

// Commons
import PanelContainer from 'App/_commons/elements/PanelContainer';
import TextFieldDecored, { propsTextFieldBuilder } from 'App/_commons/elements/TextFieldDecored';
import CheckboxGroup from 'App/_commons/components/CheckboxGroup';

// Owns
import ViewTemplateError from './ViewTemplateError';
// Actions
//import * as actions from 'appActions';

const DetailPersonPanel = props => {
  const { classes } = props;
  const {
    handleOnChange = e => console.log('HANDLEONCHANGE DetailPersonPanel :>', e.target),
    handleMoreInfo = e => console.log('VER MÁS INFORMACIÓN DetailPersonPanel :>', e.target),
    handleOnChangeCheckbox = e => console.log('DETAILPERSONPANEL>:', e.target.checked, e.target.value),
    requiredList=null,
    checkboxList=null,
  } = props;

  let viewTemplatePropsDecored = null;
  if(props.viewTemplate) {
    if(typeof(props.viewTemplate.type) !== 'string'){
      return <ViewTemplateError classes={classes} />;
    }
    viewTemplatePropsDecored = props.viewTemplate.props &&
    {...props.viewTemplate.props}.children.map(i => {
      const inputProps = propsTextFieldBuilder({
        label: i.props.label || 'Default label',
        valuetext: i.props.valuetext || 'defaultValue',
        type: i.props.type,
        props,
      })
      return {...i, props:{...i.props, ...inputProps, classes:{...classes}}}
    })
  }

  const checkboxGroupSpread = {
    checkboxList: checkboxList.map(i => ({...i, checked: props[i.valuetext]})),
    handleOnChangeCheckbox,
  }

  // Render indeed
  return (<PanelContainer style={{padding: '14px'}}>
    <div>
      { props.viewTemplate ? viewTemplatePropsDecored.map(Itm => Itm) :
        <span>
          <TextFieldDecored {...propsTextFieldBuilder({
            label: 'Default label',
            valuetext: 'defaultValue',
            props,
          })} />
        </span>
      }
      <Button
        color="primary"
        className={classes.button}
        onClick={handleMoreInfo}
        children="VER MÁS INFORMACIÓN..." />
    </div>
    { checkboxList && <CheckboxGroup {...checkboxGroupSpread} /> }
  </PanelContainer>);
};

DetailPersonPanel.propTypes = {
  //
};

//export default connect(null, actions)(withStyles(styles)(DetailPersonPanel));
export default withStyles(styles)(DetailPersonPanel);
