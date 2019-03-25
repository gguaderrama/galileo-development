import React from 'react';
import NumberFormat from 'react-number-format';

export const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;
  if (other.value) {
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        fixedDecimalScale
        decimalScale={2}
        prefix="$"
      />
    );
  }else {
    return null;
  }
}

export const NumberFormatCustomRF = (props) => {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(_, e) => onChange(e)}
        thousandSeparator
        fixedDecimalScale
        decimalScale={2}
        prefix="$"
      />
    );
  }
