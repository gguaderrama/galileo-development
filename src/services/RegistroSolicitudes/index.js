import { NO_EXISTE_PERSONA } from './../../constants/RegistroSolicitud/registroSolicitud';


export const consultaPersonas = (url, obj, funcClose, errorNotification) => () => fetch(`${url}?_dc=1537980677589&persona=${encodeURIComponent(obj)}`).then(response => {
    return new Promise((resolve, reject) => {
        if (response.status === 500) {
            NO_EXISTE_PERSONA.subcontent = response.text();
            errorNotification(NO_EXISTE_PERSONA);
            return reject('rejected');
        }
        if ((response.status >= 200 && response.status < 300) || response.status === 400) {
            response.text().then(json => {
                if (JSON.stringify(json).substring(9, 14) === 'ERROR') {
                    NO_EXISTE_PERSONA.subcontent = 'Hay más de 25 resultados similares, afine su busqueda empleando más datos como lo son fecha de nacimiento y/o rfc';
                    errorNotification(NO_EXISTE_PERSONA);
                } else {
                    funcClose();
                    return resolve(JSON.parse(json));
                }
            });
        }
    })
});

export const consultaProductosGeneric = (url, obj, funcClose) => () => fetch(`${url}${encodeURIComponent(obj)}`).then(response => response.json().then(r => {
    funcClose();
    return r;
}));



export const apiPost = (url, solicitud, persona) => () =>
    fetch(`${url}`, {
        method: 'POST',
        body: `persona=${encodeURIComponent(persona)}&solicitud=${encodeURIComponent(solicitud)}` ,
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }).then(r => {
       
        return r;
    });


