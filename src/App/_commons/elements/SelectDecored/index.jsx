// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
// material
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';

// utils
//import { splitPropsFromValueText } from 'utils/misc';

const SelectDecored = props => {
  // Herited styles
  const { classes={divContainer:'', formControl:''} } = props;
  const {
    style,
    inputLabelTitle,
    selectValue='_',
    handleOnChange,
    inputProps = {id:'demo', name:'demo'},
    itemList,
    renderValue,
    disabled=false,
    onEmptyMsg='Empty select...',
    // about Error validate
    texto='',
    error=null,
    warning="",
    // Redux form props
    //meta={},
  } = props;
  //
  return (
    <FormControl className={classes.formControl} error={error} style={style}>
      { inputLabelTitle && <InputLabel htmlFor={inputProps.id}>{inputLabelTitle}</InputLabel> }
      <Select
        value={selectValue}
        renderValue={()=> {
          if (!itemList)
            return onEmptyMsg
          return renderValue
        }}
        onChange={handleOnChange}
        inputProps={inputProps}
        children={
          itemList && itemList.map(item => item && <MenuItem key={item.key} value={item.key}>{item.name}</MenuItem>)
        }
        disabled={!Boolean(itemList) || disabled} />
        <FormHelperText style={{marginTop:'0px'}}>{texto}
          {error && <Icon style={{position: 'relative', fontSize:'13px', padding:'0 5px', top:'3px'/*, fontSize: '1.25em'*/}}>error</Icon>}
          {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
          {/*meta.touched && meta.error && <Icon style={{fontSize:'13px', marginRight:'5px'}}>error</Icon>*/}
          {/*meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))*/}
        </FormHelperText>
    </FormControl>
  );
}

SelectDecored.displayName = 'SelectDecored';

export default SelectDecored;

SelectDecored.propTypes = {
  inputLabelTitle: PropTypes.string,
  selectValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  renderValue: PropTypes.string,
  handleOnChange: PropTypes.func,
  itemList: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    name: PropTypes.string.isRequired,
   })),
  inputProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onEmptyMsg: PropTypes.string
};
