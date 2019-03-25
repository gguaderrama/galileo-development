import moment from 'moment';

export const convierteFechasPersona = xmlInterface => {
    if(xmlInterface.integrantes && xmlInterface.integrantes[0]) {
        let persona = xmlInterface.integrantes[0].persona;
        let fechaNacimiento = moment(persona.fechaNacimiento, 'DD-MM-YYYY').format('YYYY-MM-DD');
        persona.fechaNacimiento = fechaNacimiento;

        let fechaIngresoEmpresa = moment(persona.fechaIngresoEmpresa, 'DD-MM-YYYY').format('YYYY-MM-DD');
        persona.fechaIngresoEmpresa = fechaIngresoEmpresa;

        xmlInterface.integrantes[0].persona = persona;
        return xmlInterface;
    }
    return xmlInterface;
}