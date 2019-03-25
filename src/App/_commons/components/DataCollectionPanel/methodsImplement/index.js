// Owns
import _inputPropsCustom from './inputPropsCustom';
import _inputPropsRaw from './inputPropsRaw';

export const curryNodeTransformRules = props => iNode => {
  const iNodeName = iNode.type && iNode.type.displayName;
  const iNodePropsTransform = iNode.props.heritage ? {...iNode.props.heritage, ...iNode.props} : iNode.props;

  // custom decored elements
  if(iNodeName) {
    const inputPropsCustom = _inputPropsCustom(props)(iNodeName, iNode, iNodePropsTransform);
    return {...iNodePropsTransform, ...inputPropsCustom, classes:{...props.classes}};
  }

  // raw elements
  if(typeof(iNode.type) === 'string') {
    const inputPropsRaw = _inputPropsRaw(props)(iNode);
    return {...iNodePropsTransform, ...inputPropsRaw};
  }

  // none match
  return {...iNode.props};
}

export const handleAttrChangeValue = function(prevState, props) {
  const { event, panelRelated = null } = props
  if(!event.target)
    return null;
  //
  if(!panelRelated)
    return {[event.target.name]:event.target.value};
  //
  return {[panelRelated]:{...prevState[panelRelated], [event.target.name]:event.target.value}};
}
