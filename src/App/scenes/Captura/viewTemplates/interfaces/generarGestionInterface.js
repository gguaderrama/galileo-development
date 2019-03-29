export default Object.freeze({
  fields : {
    medio:          {onEmpty: "0", required: true},
    respuesta:      {onEmpty: "0", required: true},
    contacto:       {onEmpty: "0", required: true},
    scheduledDate:  {onEmpty: "", required: false},
    comentario:     {onEmpty: "", required: true},
  }
});

// ifRequired:'rfc'
