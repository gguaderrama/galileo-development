// Dependencies
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';

// Commons
import CheckboxDecored, { propsCheckboxBuilder } from 'App/_commons/elements/CheckboxDecored';

// Styles
import { styles } from './styles';

const CheckboxGroup = props => {
  const { classes,
    checkboxList=[{label:'Inner label', valuetext: 'innerValue'}],
    suited='row' } = props;

  const checkboxListRender = checkboxList.map(i =>
    <CheckboxDecored key={i.valuetext} {...propsCheckboxBuilder({
      label: i.label,
      valuetext: i.valuetext,
      checked: i.checked,
      props
    })} />);
  //
  if(suited === 'row')
    return <FormGroup className={classes.checkBoxGroup} row>
      { checkboxListRender }
    </FormGroup>

  return <FormGroup className={classes.checkBoxGroup} column="true">
      { checkboxListRender }
    </FormGroup>
}

export default withStyles(styles)(CheckboxGroup);
