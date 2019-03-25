// Dependencies
import React from 'react';

// Commons
import PanelContainer, { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';
import SelectDecored from 'App/_commons/elements/SelectDecored';
import RadiobuttonGroup from 'App/_commons/components/RadiobuttonGroup';

const MoreInfoPanel_empleo = props => <div>
  <PanelContainer heritage={{disabled: true}}>
  <TitlePanelContainerAlt>Datos empleo</TitlePanelContainerAlt>
  <div>
    <SelectDecored valuetext="codigoPuestoOcupacion" selectlist="ocupacionesList" keys="llave nombre" label="Ocupación" />
    <TextFieldDecored valuetext="puesto" label="Puesto" />
    <TextFieldDecored valuetext="nombreEmpresa" label="Empresa" />
    <TextFieldDecored valuetext="fechaIngresoEmpresa" label="Antigüedad en el empleo" />
  </div>
  <div>
    <TextFieldDecored valuetext="fechaIngresoEmpresa" label="Fecha de ingreso" />
    <TextFieldDecored valuetext="horarioTrabajo" label="Horario de trabajo" />
    <TextFieldDecored valuetext="ingresos" label="Sueldo fijo mensual" />
    <SelectDecored valuetext="formaPago" selectlist="formaPagoList" keys="llave nombre" label="Forma de pago" />
  </div>
  <div>
    <TextFieldDecored valuetext="telefonoEmpresa" label="Teléfono de empresa (incluir lada)" />
    <TextFieldDecored valuetext="extension" label="Extensión" />
    <TextFieldDecored valuetext="otrosIngresos" label="Monto otros ingresos" />
    <TextFieldDecored valuetext="egresos" label="Monto pagos/ gastos al mes" />
    <TextFieldDecored valuetext="fenteOtrosIngresos" label="Fuente de ingresos" />
  </div>
  <hr />
  <TitlePanelContainerAlt>Datos empresa</TitlePanelContainerAlt>
  <div>
    <TextFieldDecored valuetext="codigoGiroEmpresa" label="Giro de la empresa" />
    <TextFieldDecored valuetext="domiciliosEmpleo" label="Domicilio laboral" />
    <TextFieldDecored valuetext="domiciliosEmpleo.cp" label="C.P." />
    <TextFieldDecored valuetext="domiciliosEmpleo.estado" label="Estado" />
  </div>
  <div>
    <TextFieldDecored valuetext="codigoGiroEmpresa.pais" label="País" />
    <TextFieldDecored valuetext="domiciliosEmpleo.municipio" label="Alcaldía/Municipio" />
    <TextFieldDecored valuetext="nombreJefe" label="Nombre completo del jefe inmediato" style={{width: '48%'}} />
  </div>
  <TitlePanelContainerAlt>Empleo asalariado</TitlePanelContainerAlt>
  <div>
    <TextFieldDecored valuetext="codigoGiroEmpresa" label="Área en la que labora" />
    <TextFieldDecored valuetext="puesto" label="Puesto" />
    <TextFieldDecored valuetext="nss" label="No. De seguridad social" />
  </div>
  <div><RadiobuttonGroup valuetext="tipoCotizacion" name="tipoCotizacion" label="Cotiza para"
    style={{width: '50%'}}
    radioList={[
      {label:'IMSS', valuetext: 'M'},
      {label:'ISSTE', valuetext: 'S'},
      {label:'PEMEX', valuetext: 'P'},
      {label:'OTRO', valuetext: 'O'}]} /><br /></div>
  </PanelContainer>
</div>

export default MoreInfoPanel_empleo;
