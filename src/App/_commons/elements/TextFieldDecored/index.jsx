// Dependencies
import React from 'react';
// material
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';

// Styles
import { styles } from './styles';

// utils
import { splitPropsFromValueText } from 'utils/misc';

const TextFieldDecoredMain = props => {
  // Herited styles
  const { classes={formControl:''} } = props;
  const {
    variant = "standard",
    multiline = false,
    disabled = false,
    required = false,
    label = "Name label",
    value = "Value",
    handleOnChange = e=>console.log('TextFieldDecored:>',e),
    inputProps = {},
    InputLabelProps = {},
    type = null,
    placeholder = null,
    // about Error validate
    texto = '',
    error = null,
    warning = "",
    // Redux form props
    //meta = {},
    style
  } = props
  //

  return (
    <FormControl className={classes.formControl} error={error} style={style}>
      <TextField
        disabled={disabled}
        className={variant === 'filled' ? classes.textFieldFilled : classes.textField}
        type={!type ? "search" : type}
        placeholder={placeholder}
        required={required}
        label={label}
        value={value}
        onChange={handleOnChange}
        InputProps={{
            disableUnderline: variant === 'filled' && true,
            classes: {
              root: classes.root,
              disabled: classes.disabled,
            }, ...inputProps}}            
        InputLabelProps={{
        style: { color: '#000000' },
        FormLabelClasses: {
          style: { color: '#000000' }
          },
        }}
        variant={variant}
        multiline={multiline}
        margin="normal" />
      <FormHelperText style={{marginTop:'0px'}}>{texto}
        {error && <Icon style={{position: 'relative', fontSize:'13px', padding:'0 5px', top:'3px'/*, fontSize: '1.25em'*/}}>error</Icon>}
        {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
        {/*meta.touched && meta.error && <Icon style={{fontSize:'13px', marginRight:'5px'}}>error</Icon>*/}
        {/*meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))*/}
      </FormHelperText>
    </FormControl>
  );
}

const TFDecored = withStyles(styles)(props => <TextFieldDecoredMain {...props} />);
const TextFieldDecored = props => <TFDecored {...props}/>;
export default TextFieldDecored;

TextFieldDecored.displayName = 'TextFieldDecored';

/*
  Extras
  */
export const propsTextFieldBuilder = _props => ({
    label: _props.label,
    value: splitPropsFromValueText(_props) || "",
    handleOnChange: _props.props.handleOnChange,
    inputProps: { name: _props.valuetext, id: `${_props.valuetext}-simple`, type: _props.type || null, ..._props.inputProps },
    required: _props.props.requiredList && _props.props.requiredList[_props.valuetext] && _props.props.requiredList[_props.valuetext].required,
    InputLabelProps: {shrink:true},
    classes: _props.props.classes
  })

TextFieldDecored.propTypes = {
};
