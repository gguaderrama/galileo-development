import React, { Fragment } from 'react';
// _commons
//import { propsTextFieldBuilder } from 'App/_commons/elements/TextFieldDecored';
//import { propsRadiobuttonGroupBuilder } from 'App/_commons/components/RadiobuttonGroup';

const inputPropsRaw = props => iNode => {
  console.log('inputPropsRaw->', iNode);
  const arraySelectList = Array.isArray(iNode.props.selectlist)
    ? iNode.props.selectlist
    : props[iNode.props.selectlist] || [];
  //
  return iNode.type === 'input' // TODO: input.type = 'radio' missing
    ? {
        value: props[iNode.props.valuetext],
        onChange: props.handleOnChange,
      }
    : iNode.type === 'select'
      ? {
          value: props[iNode.props.valuetext],
          onChange: props.handleOnChange,
          children: <Fragment>
            <option value={null} />
            { arraySelectList.map((i,k) => <option key={k} value={i.value} selected={i.selected || false}>{i.text}</option>) }
          </Fragment>
        }
      : iNode.type === 'textarea'
        ? {
            value: props[iNode.props.valuetext],
            onChange: props.handleOnChange,
          }
        : null  // TODO: Missing 'checkbox' as well
  //
}

export default inputPropsRaw;
