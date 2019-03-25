// Dependencies
import React from 'react';

// Commons elements
import SelectDecored from 'App/_commons/elements/SelectDecored';
import TextFieldDecored from 'App/_commons/elements/TextFieldDecored';

const SearchPanelTemplate = props => <div>
  <div>
    <SelectDecored valuetext="empresas" label="Empresa" />
    {/*<SelectDecored valuetext="oficinas" label="Oficina" />
    <SelectDecored valuetext="campania" label="Campaña" />
    <SelectDecored valuetext="statuses" label="Status" />*/}
  </div>
  <div>
    <TextFieldDecored valuetext="nombre" label="Nombre" />
    <TextFieldDecored valuetext="apellidoPaterno" label="Apellido Paterno" />
    <TextFieldDecored valuetext="apellidoMaterno" label="Apellido Materno" />
    <TextFieldDecored valuetext="rfc" label="RFC" />
    <TextFieldDecored valuetext="fechaNacimiento" label="Fecha Nacimiento" />
    <TextFieldDecored valuetext="persona" label="Persona" />
    <TextFieldDecored valuetext="contrato" label="Contrato" />
  </div>
</div>

export default SearchPanelTemplate;
