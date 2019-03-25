export function formValidator(dataToValidate, interfaceToValidate, errorMsg='Error on data submit') {
  const fieldsToValidate = Object.keys(interfaceToValidate).filter(i => interfaceToValidate[i].required);
  let inputListMissing = [];
  let inputListMissingMsg = '';
  const compareThem = fieldsToValidate.reduce((buffer, next) =>{
    // if required and empty
    const vs = Object.keys(dataToValidate).find(i => i === next && dataToValidate[i] !== interfaceToValidate[i].onEmpty);
    if (vs)
      // if required and match with pattern
      if(interfaceToValidate[vs].ifRequired) {
        if(dataFixValidate[interfaceToValidate[vs].ifRequired].vs.test(dataToValidate[vs]))
          return `${buffer}1`;
        inputListMissingMsg = `${inputListMissingMsg} ${dataFixValidate[interfaceToValidate[vs].ifRequired].msg}`;
      } else {
        return `${buffer}1`;
      }
    //
    inputListMissing.push(next);
    return `${buffer}0`;
  }, "");

  if(compareThem.indexOf("0") >= 0)
    return {
      status: false,
      error: {
        msg: {errorMsg, inputListMissingMsg},
        inputList: inputListMissing
      }
    }

  return {
    status: true,
    error: null
  }
};

export function isEmpty(obj) {
  if(!obj)
    return true;

  if(Object.keys(obj).length === 0)
    return true;

  return !Object.values(obj).reduce((acumulator, currentValue) => {
    return Boolean(acumulator) || Boolean(currentValue);
  }, false);
};

export function formCleaner(stateSearchForm, which, interfaceIields = null) {
  const theArray = !Array.isArray(which) ? Object.keys(stateSearchForm) : which;
  // eslint-disable-next-line
  const preCheck = theArray.filter(i => {if(Object.keys(interfaceIields).find(e => e === i)) return i});
  return preCheck
    .reduce((accumulator, currentValue) => (
      {...accumulator, [currentValue]: interfaceIields ? interfaceIields[currentValue].onEmpty : ''}
    ), {});
};

export const dataFixValidate = Object.freeze({
  rfc: {vs: /^[A-Z]{4}[0-9]{6}/, msg:"Formato 'RFC' inválido"},
  persona: {vs: /^[0-9]{9,12}$/, msg:"Formato 'Persona' inválido"},
  contrato: {vs: /^[0-9]{8,12}$/, msg:"Formato 'Contrato' inválido"},
});
