var jsonServer = require('json-server');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var server = jsonServer.create();
const adapter = new FileSync('db-watched.json');
const db = low(adapter);

// Add custom routes before JSON Server router
server.get('/ProspectosWEB/services/ProspectosService/:attrReq', function (req, res) {
  console.log('attrReq >', req.params.attrReq);
  //if (req.method === 'POST') {
  //  // Converts POST to GET and move payload to query params
  //  // This way it will make JSON Server that it's GET request
  //  req.method = 'GET'
  //  req.query = req.body
  //}

  const matches = {
    "obtenerOficinas": "oficinas",
    "consultaCampanias": "campanias",
    "consultaCampaniasPeriodo": "periodos",
    "consultaProspectos": "prospectos",
    "consultaPersona": "personas",

    "consultaProspectos_empty": "prospectos_empty",
    //
    "consultaVendedoresOficina": "gestores",
    "obtenerEmpresas": "empresas",
    "obtenerStatuses": "statuses",
    "obtenerDestinos": "destinos",
    "mediosGestion": "mediosGestion",
    "respuestasGestion": "respuestasGestion",
  };
  var dbResponse=db.get(matches[req.params.attrReq])
    //.find({id:sessionId})
    //.get("anotherKey")
    //.find({voterName})
    .value();

  console.log('dbResponse....', dbResponse);

  if (dbResponse) {
    //res.header('Content-Type', 'application/json')
    res.jsonp(dbResponse)
  } else {
    res.sendStatus(404)
  }
})

server.get('/ProspectosWEB/services/ProspectosService/detalle/:attrReq', function (req, res) {
  console.log('attrReq >', req.params.attrReq);
  const matches = {
    "000000000123": "prospecto_0123",
  };
  var dbResponse=db.get(matches[req.params.attrReq])
    //.find({id:sessionId})
    //.get("anotherKey")
    //.find({voterName})
    .value();

  console.log('dbResponse....', dbResponse);

  if (dbResponse) {
    //res.header('Content-Type', 'application/json')
    res.jsonp(dbResponse)
  } else {
    res.sendStatus(404)
  }
})

server.get('/:attrReq', function (req, res) {
  console.log('attrReq >', req.params.attrReq);
  const matches = {
    "demo": "demo",
    "opciones": "opciones",
    "clientes": "clientes",
    "stepsCaptura": "stepsCaptura"
  };
  var dbResponse=db.get(matches[req.params.attrReq]).value();

  console.log('dbResponse....', dbResponse);

  if (dbResponse) {
    res.jsonp(dbResponse)
  } else {
    res.sendStatus(404)
  }
})

server.post('/post-test', function (req, res) {
  
})

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
// server.use(router)
server.listen(3001, function () {
  console.log('JSON Server is running')
});
