export const getSolicitud = state => state.datosCaptura && state.datosCaptura.solicitud;
export const getDescripcionCatalogos = state => state.datosCaptura && state.datosCaptura.descripcionCatalogos;
export const getDescripcionCodigo = codigo => state =>  
    state.datosCaptura.descripcionCatalogos && 
    state.datosCaptura.descripcionCatalogos.find(desc => desc.codigo === codigo);
export const getPrimaSeguros = state => state.datosCaptura && state.datosCaptura.primaSeguros;
export const getProductos = state => state.datosCaptura && state.datosCaptura.productos;
export const getContratoAnterior = state => state.datosCaptura && state.datosCaptura.contratoAnterior;

export const getCatalogoproductos = state => {
    let catalogoProductos = [];	
    if ( state.datosCaptura && state.datosCaptura.productos && state.datosCaptura.productos instanceof Array && state.datosCaptura.descripcionCatalogos) {
        state.datosCaptura.productos.forEach(
            producto => {
                if (!catalogoProductos.find(
                    item => item.codigo === producto.producto 
                ))
                    catalogoProductos.push(getDescripcionCodigo(producto.producto)(state) || null)
            }
        );
    }
    return catalogoProductos;
};

export const getCatalogoFrecuencias = state => {
    let catalogoFrecuencias = [];
	if ( state.datosCaptura && state.datosCaptura.productos && state.datosCaptura.productos instanceof Array && state.datosCaptura.descripcionCatalogos) {
        state.datosCaptura.productos.forEach(
            producto => {
                if (!catalogoFrecuencias.find(
                    item => item.codigo === producto.frecuencia 
                ))
                catalogoFrecuencias.push(getDescripcionCodigo(producto.frecuencia)(state) || null)
            }
        );
    }
    return catalogoFrecuencias;
};
export const getSegmento = state => 
    state.datosCaptura && 
    state.datosCaptura.solicitud && 
    state.datosCaptura.solicitud.segmento;

export const getMontoPago = state =>
    state.datosCaptura &&
    state.datosCaptura.montoPago &&
    state.datosCaptura.montoPago.montoPago;