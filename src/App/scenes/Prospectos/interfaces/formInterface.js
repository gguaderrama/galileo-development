export default Object.freeze({
  fields : {
    empresa:         {onEmpty: "0", required: true},
    nombre:          {onEmpty: "", required: true},
    apellidoPaterno: {onEmpty: "", required: true},
    apellidoMaterno: {onEmpty: "", required: false},
    rfc:             {onEmpty: "", required: false, ifRequired:'rfc'},
    fechaNacimiento: {onEmpty: "", required: false},
    persona:         {onEmpty: "", required: false, ifRequired:'persona'},
    contrato:        {onEmpty: "", required: false, ifRequired:'contrato'}
  }
});
