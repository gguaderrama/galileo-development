import React, {Fragment} from 'react';
import ResultTablePanel from 'App/_commons/components/ResultTablePanel';
import { RowTemplate} from './RowTemplate';

const colums = [{key:1,label:'Tipo de Referencia'},
                {key:2,label:'Nombre'},
                {key:3,label:'Teléfono particular'},
                {key:4,label:'Teléfono celular'},
                {key:5,label:'Parentesco'}];

const infoDummy = [{'referencia':'Laboral','nombre':'The Boss','particular':5578787878,'celular':5578787878,'parentesco':'El Padrino'},
{'referencia':'Casa','nombre':'Jefret','particular':5567656543,'celular':5566778899,'parentesco':'Cousin'},
{'referencia':'Oficina','nombre':'Chachis','particular':5590987876,'celular':5544332211,'parentesco':'Secretary'},
{'referencia':'Laboral','nombre':'Peter','particular':5543212345,'celular':5566112299,'parentesco':'Parner'},];


const resultTablePanelSpread = {
    columsData: colums,
    rowData: infoDummy,
    rowTemplate: RowTemplate,
    emptyRowDataMsg: 'Sin resultados, busca o registra un usuario.',
    rowClickDisabled:true,
    intoPanelContainer: false
  }

export const ReferenciasTemplate = () => (
    <div>
        <p>Agregue las referencias necesarias, tiene un máximo de cuatro.</p>
        <hr />
        <ResultTablePanel {... resultTablePanelSpread} />
    </div>
    )