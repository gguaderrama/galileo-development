// export const getPersona = state => {
//     return state.persona && state.persona.integrantes[0].persona
// };
export const getReferencias = state => []//state.xmlInterfaces && state.xmlInterfaces.integrantes[0].persona.referencias ? state.xmlInterfaces.integrantes[0].persona.referencias : [];
export const getIntegrantes = state => state.xmlInterfaces && state.xmlInterfaces.integrantes;
export const getXmlInterfaces = state => state.xmlInterfaces;
export const getTelefonos = state => state.xmlInterfaces &&
    state.xmlInterfaces.integrantes[0].persona.telefonosParticulares &&
    state.xmlInterfaces.integrantes[0].persona.telefonosEmpleo ?
    [...state.xmlInterfaces.integrantes[0].persona.telefonosParticulares, ...state.xmlInterfaces.integrantes[0].persona.telefonosEmpleo] :
    state.xmlInterfaces &&
    state.xmlInterfaces.integrantes[0].persona.telefonosParticulares ?
    [...state.xmlInterfaces.integrantes[0].persona.telefonosParticulares] :
    state.xmlInterfaces &&
    state.xmlInterfaces.integrantes[0].persona.telefonosEmpleo ?
    [...state.xmlInterfaces.integrantes[0].persona.telefonosEmpleo] :
    []
    ;
export const getDomicilios = state => state.xmlInterfaces && [...state.xmlInterfaces.integrantes[0].persona.domiciliosParticulares, ...state.xmlInterfaces.integrantes[0].persona.domiciliosEmpleo];
export const getCorreo = state => state.xmlInterfaces &&
    state.xmlInterfaces.integrantes &&
    state.xmlInterfaces.integrantes[0].persona.redesSocialesParticulares &&
    state.xmlInterfaces.integrantes[0].persona.redesSocialesParticulares.find(redSocial => redSocial.tipoRedSocial === 'CORREO').direccionElectronica;
export const getListaClientes = state =>
    state.xmlInterfaces &&
    state.xmlInterfaces.integrantes &&
    state.xmlInterfaces.integrantes.map(inte => ({nombre: `${inte.persona.nombre} ${inte.persona.apellidoPaterno} ${inte.persona.apellidoMaterno}`, cliente: inte.persona.persona}));
export const getSeguros = state =>
    state.xmlInterfaces &&
    state.xmlInterfaces.integrantes &&
    state.xmlInterfaces.integrantes[0].seguros;
