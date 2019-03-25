// Dependencies
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';

// Styles
import { styles } from './styles';

// utils
import { splitPropsFromValueText } from 'utils/misc';

const RadiobuttonGroupMain = props => {
  const { classes,
    label = null,
    name = "noName",
    radioList = [{label:'Inner label 1', valuetext: 'innerValue1'}, {label:'Inner label 2', valuetext: 'innerValue2'}],
    handleOnChange = e => console.log('RADIOGROUP>', e.target),
    value = null,
    //labelPlacement = null,
    color = null,
    style = null,
    suited = 'row',
    // flexbox
    justifyContent = null,
    // about Error validate
    texto = '',
    error = null,
    warning = "",
    // Redux form props
    //meta = {}
  } = props;

  const radioListRender = ({disabled, labelPlacement}) => radioList.map(i =>
    <FormControlLabel key={i.valuetext}
      disabled={disabled}
      label={i.label}
      value={i.valuetext}
      labelPlacement={labelPlacement || "end"}
      control={<Radio color={color || "default"} />}
    />);

  return (<FormControl className={classes.formControl} style={style} component="fieldset">
    { label && <FormLabel component="legend">{label}</FormLabel> }
    <RadioGroup aria-label={name} name={name}
      style={justifyContent && {display:'flex', justifyContent: justifyContent}}
      value={value}
      onChange={handleOnChange}
      children={radioListRender(props)} row={suited === 'row' || false}/>
    <FormHelperText style={{marginTop:'0px'}}>{texto}
      {error && <Icon style={{position: 'relative', fontSize:'13px', padding:'0 5px', top:'3px'/*, fontSize: '1.25em'*/}}>error</Icon>}
      {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
      {/*meta.touched && meta.error && <Icon style={{fontSize:'13px', marginRight:'5px'}}>error</Icon>*/}
      {/*meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))*/}
    </FormHelperText>
  </FormControl>);
}

export const propsRadiobuttonGroupBuilder = _props => ({
    label: _props.label,
    value: splitPropsFromValueText(_props) || "",
    handleOnChange: _props.props.handleOnChange,
    required: _props.props.requiredList && _props.props.requiredList[_props.valuetext] && _props.props.requiredList[_props.valuetext].required,
    InputLabelProps: {shrink:true},
    classes: _props.props.classes,
  })

const RGroup = withStyles(styles)(props => <RadiobuttonGroupMain {...props} />);
const RadiobuttonGroup = props => <RGroup {...props}/>;
export default RadiobuttonGroup;

RadiobuttonGroup.displayName = 'RadiobuttonGroup';
