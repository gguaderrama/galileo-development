// Dependencies
import React, { Fragment } from 'react';
// material
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { InlineDateTimePicker } from 'material-ui-pickers';
import { InputAdornment } from '@material-ui/core';

// utils
//import { splitPropsFromValueText } from 'utils/misc';

const DatePickerDecored = props => {
  const {
    classes,
    style,
    label = 'Fecha/Hora',
    value = null, //Date.now()
    name = 'name',
    //disabled = false,
    required = false,
    handleOnChange = e => console.log('DataPickerDecored:>', e),
    inputProps = {},

    // about Error validate
    texto='',
    error=null,
    warning="",

    // Redux form props
    //meta={},
  } = props;

  const _handleOnChange = e => {
    if(handleOnChange) {
      handleOnChange({
        target:{name, value: e.toDate()},
        raw: e
      })
    }
  }
  //
  return (
    <FormControl className={classes.formControl} error={error} style={style}>
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={{es: 'es'}}>
        <Fragment>
          <InlineDateTimePicker
            //className={classes.formControl}
            disablePast={true}
            required={required}
            label={label}
            invalidLabel='No'
            value={value}
            onChange={_handleOnChange}
            format='DD/MM/YYYY hh:mm:ss a'
            InputProps={{
              endAdornment: <InputAdornment position='end'>
                <Icon color='primary'>date_range</Icon>
              </InputAdornment>,
              ...inputProps
            }}
          />
        </Fragment>
      </MuiPickersUtilsProvider>
      <FormHelperText style={{marginTop:'0px'}}>{texto}
        {error && <Icon style={{position: 'relative', fontSize:'13px', padding:'0 5px', top:'3px'/*, fontSize: '1.25em'*/}}>error</Icon>}
        {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
        {/*meta.touched && meta.error && <Icon style={{fontSize:'13px', marginRight:'5px'}}>error</Icon>*/}
        {/*meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))*/}
      </FormHelperText>
    </FormControl>
  );
}

export default DatePickerDecored;

DatePickerDecored.displayName = 'DatePickerDecored';
