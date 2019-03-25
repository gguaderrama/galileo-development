// _commons
import { propsTextFieldBuilder } from 'App/_commons/elements/TextFieldDecored';
import { propsRadiobuttonGroupBuilder } from 'App/_commons/components/RadiobuttonGroup';

const inputPropsCustom = props => (iNodeName, iNode, iNodePropsTransform) => {
  return iNodeName === 'TextFieldDecored'
    ? propsTextFieldBuilder({
        label: iNode.props.label || 'Default label',
        valuetext: iNode.props.valuetext || 'defaultValue',
        type: iNode.props.type,
        props,
      })
    : iNodeName === 'RadiobuttonGroup'
      ? propsRadiobuttonGroupBuilder({
          label: iNode.props.label || 'Default label',
          valuetext: iNode.props.valuetext || 'defaultValue',
          props,
        })
      : iNodeName === 'SelectDecored'
        ? {
            inputLabelTitle: iNode.props.label,
            selectValue: props[iNode.props.valuetext],
            renderValue: props[iNode.props.selectlist] &&
              props[iNode.props.selectlist]
              .find(i => i[iNode.props.keys.trim().split(' ')[0]] === props[iNode.props.valuetext])
                ? props[iNode.props.selectlist]
                  .find(i => i[iNode.props.keys.trim().split(' ')[0]] === props[iNode.props.valuetext])[iNode.props.keys.trim().split(' ')[1]]
                : '',
            inputProps: { name: iNode.props.valuetext, id: `${iNode.props.valuetext}-simple`, ...iNode.props.inputProps },
            handleOnChange: props.handleOnChange,
            itemList: props[iNode.props.selectlist] &&
              props[iNode.props.selectlist]
              .map(i => ({key:i[iNode.props.keys.trim().split(' ')[0]], name:i[iNode.props.keys.trim().split(' ')[1]]})),
            required: props.requiredList && props.requiredList[iNode.props.valuetext] && props.requiredList[iNode.props.valuetext].required,
            //disabled: iNodePropsTransform.disabled // TODO: Dont work this...
            //  ? iNodePropsTransform.disabled
            //  : null,//props.disabledList.find(i => i === iNode.props.selectlist) && true,
            InputLabelProps: {shrink:true},
            onEmptyMsg: props[iNode.props.onEmptyMsg] || 'itemList is empty',
            classes:props.classes
          }
        : iNodeName === 'DatePickerDecored'
          ? {
              label: iNode.props.label,
              value: props[iNode.props.valuetext],
              name: iNode.props.valuetext,
              inputProps: { name: iNode.props.valuetext, id: `${iNode.props.valuetext}-simple`, ...iNode.props.inputProps },
              handleOnChange: props.handleOnChange,
              required: props.requiredList && props.requiredList[iNode.props.valuetext] && props.requiredList[iNode.props.valuetext].required,
              disabled: iNodePropsTransform.disabled
                ? iNodePropsTransform.disabled
                : props.disabledList.find(i => i === iNode.props.selectlist) && true,
            }
          : null
  //
}

export default inputPropsCustom;
