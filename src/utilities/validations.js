export const isNumber = value => (
    value !== undefined && isNaN(Number(value)) && "El valor debe ser numérico"
);

export const validaRango = (min,max) => value => {
    let val;
    isNaN(value) ? 
      val = value && parseFloat(value.replace(/[^0-9-.]/g, '')) :
      val = value;
  return val && (val < min || val > max) ? `Error en rango` : undefined;
}

export const validaCorreo = value => 
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'dirección de correo no válida'
    : undefined;

export const esEntero = value => 
  value && !/^\+?\d+$/i.test(value)
    ? 'Sólo números'
    : undefined;

export const validaRequeridos = ( iformularios, formNamesArray, valuesForm, formName, validaForm ) => {
    const errors = {};
    const fieldsWithError = [];
    let payload;
    let iformRequeridos = iformularios.filter( 
        iform => formNamesArray.includes(iform.formulario) && !iform.atributo)
        .map(iform => iform.valorGenerico);
    iformRequeridos.forEach(field => {
      if (!valuesForm[field]) {
        errors[field] = 'Requerido';
        fieldsWithError.push(field);
      }
    });
    console.log('iformRequeridos',iformRequeridos);
    let iformRequeridosCondicion = iformularios.filter( 
      iform => formNamesArray.includes(iform.formulario) && iform.atributo);
    iformRequeridosCondicion.forEach(field => {      
      
      const cond = field.condicion.replace(/'/g,"");
      const exp = `'${valuesForm[field.atributo]}'${cond}'${field.valorCondicion}'`;
      console.log('exp', exp);
      /* if ('eval',eval(exp)) {
        if (!valuesForm[field.valor]) {
          errors[field.valor] = 'Requerido';
          fieldsWithError.push(field.valor);
        }
      } */
    });
    console.log('iformRequeridosCondicion',iformRequeridosCondicion);
    console.log('errors',errors);
    payload = {
      form: formName,
      errors: errors,
      fieldsWithError,
    };
    validaForm(payload);
    return errors;
}