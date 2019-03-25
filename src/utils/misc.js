import React from 'react';

// Change '_' symbol instead '/'
export function pathKeyNormalizer(pathKey) {
  return pathKey.substr(1).replace(new RegExp('/', 'g'), '_');
}

// Double slash issues
export function avoidDoubleSlash(str) {
  return str.replace(new RegExp('//', 'g'), '/');
}
export function avoidDoubleSlashAtEnd(str) {
  return /\/\/$/g.test(str) ? str.substr(0, str.length-1) : str;
}

// snake-case, camel-case & pascal-case converter
export function snakeToCamel(snake) {
  return snake.replace(new RegExp('[-][a-z]', 'g'), i => i.toUpperCase().substr(1));
}
export function snakeToPascal(snake) {
  return capitalizeWord(snake.replace(new RegExp('[-][a-z]', 'g'), i => i.toUpperCase().substr(1)));
}
export function camelToPascal(camel) {
  return capitalizeWord(camel);
}
export function camelToSake(camel) {
  return camel.replace(new RegExp('[A-Z]{1}', 'g'), i => `-${i.toLowerCase()}`);
}
export function pascalToCamel(pascal) {
  return uncapitalizeWord(pascal);
}
export function pascalToSnake(pascal) {
  return uncapitalizeWord(pascal).replace(new RegExp('[A-Z]{1}', 'g'), i => `-${i.toLowerCase()}`);
}


export function capitalizeWord(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function uncapitalizeWord(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// RegExp
export function contains(searchFor, str){
    var pattern = new RegExp(searchFor, 'gi');
    return pattern.test(str);
}

export function beginsWith(searchFor, str){
  // eslint-disable-next-line
  var pattern = new RegExp("\^" + searchFor, 'gi');
  return pattern.test(str);
}

export function endsWith(searchFor, str){
  // eslint-disable-next-line
  var pattern = new RegExp(searchFor + "\$", 'gi');
  return pattern.test(str);
}

// Decorate react node children
export function childrenIterator(_children, nodeTransformRules, getAllNodes = true) {
  return React.Children.map(_children, i => {
    if(!React.isValidElement(i))
      return getAllNodes ? i : null;
    if(i.props.children) {
      const { heritage = null } = i.props;
      const iPropsChildren = heritage
        ? Array.isArray(i.props.children)
          ? i.props.children.map(ii => ({...ii, props:{...ii.props, heritage}}))
          : React.isValidElement(i.props.children) ? {...i.props.children, props: {...i.props.children.props, heritage}} : i.props.children
        : i.props.children;
      return {...i, props:{...i.props, children:childrenIterator(iPropsChildren, nodeTransformRules, getAllNodes)}}
    }
    // Node Achived
    const nodeTransformed = nodeTransformRules(i);
    return {...i, props:nodeTransformed};
  });
}

export function splitPropsFromValueText(__props) {
  const checkPoint = (_pp, _n) => {
    if(!contains('\\.', _n))
      return _pp[_n];
    const _nSplit = _n.split('.');
    if(_nSplit.length === 2)
      return _pp[_nSplit[0]] ? _pp[_nSplit[0]][_nSplit[1]] : null;
    if(_nSplit.length === 3)
      return _pp[_nSplit[0]] ? _pp[_nSplit[0]][_nSplit[1]][_nSplit[2]] : null;
    if(_nSplit.length === 4)
      return _pp[_nSplit[0]] ? _pp[_nSplit[0]][_nSplit[1]][_nSplit[2]][_nSplit[3]] : null;
  }
  //
  const pieces = __props.valuetext.trim().split(' ');
  if(pieces.length > 1)
    return pieces.reduce((a,n) => a + ' ' + checkPoint(__props.props, n), '');
  //
  const checkPointValueText = checkPoint(__props.props, __props.valuetext);
  return checkPointValueText !== undefined && checkPointValueText !== null
    && String(checkPointValueText);
}
