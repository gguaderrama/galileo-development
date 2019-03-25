import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';

export const renderField = ({ classes, texto, input, label, type, meta, placeholder, ...custom }) => {
    return (
        <FormControl error >
            <TextField type={!type ? "search" : type} label={label}
                {...input}
                {...custom}
                placeholder={placeholder}
            />
            <FormHelperText style={{ marginLeft: '30px' }}>{texto}
                {meta.touched && meta.error && <Icon style={{ fontSize: '13px', marginRight: '5px' }}>error</Icon>}
                {meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
            </FormHelperText>
        </FormControl>
    )
}

export const toUpper = value => value && value.toUpperCase();

export const renderSelectField = ({ padding, selected, disabled, error, required, value, input, label, meta, children, texto, ...custom }) => {
    return (
        <FormControl required={required} error={error ? error : !!meta.error}>
            <InputLabel disabled={disabled} style={{ paddingTop: 10, paddingLeft: padding }}>{label}</InputLabel>
            <Select
                {...input}
                children={children}
                {...custom}
                style={{
                    paddingTop: "5px",
                }}
                disabled={disabled}>
            </Select>
            {texto &&
                <FormHelperText style={{ marginLeft: '60px' }}>{texto}
                    {meta.touched && meta.error && <Icon style={{ fontSize: '13px', marginRight: '5px' }}>error</Icon>}
                    {meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
                </FormHelperText>}
        </FormControl>

    )
}


export const renderRadioGroup = ({ marginLeft, value, input, label, ...rest }) => (
    <FormControl component="fieldset">
        <FormLabel style={{ marginLeft: marginLeft }} component="legend">{label}</FormLabel>
        <RadioGroup
            value={value}
            {...input}
            {...rest}
            aria-label={label}
            name="conyuge"
            onChange={(event, value) => input.onChange(value)}
        >
        </RadioGroup>
    </FormControl>
)

export const renderCheckbox = ({ input, label, color, disabled }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                    color={color}
                    disabled={disabled}
                />
            }
            label={label}
        />
    </div>
)
