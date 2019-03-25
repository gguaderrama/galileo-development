import React, { Fragment } from 'react';
//
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Commons
import { TitlePanelContainerAlt } from 'App/_commons/elements/PanelContainer';

const iconStyle = {marginRight: 20, position: 'relative', top: 5};

export const panelsInterface = Object.freeze({
  panelInfo: {
    fields : {
      // textField
      persona:           {onEmpty: "", required: false},
      nombre:            {onEmpty: "", required: false},
      contrato:          {onEmpty: "", required: false},
      calificacion:      {onEmpty: "", required: false},
      ultimaDisposicion: {onEmpty: "", required: false},
      ultimoMovimiento:  {onEmpty: "", required: false},
      diaPago:           {onEmpty: "", required: false},

      // checkBox
      //planCelular:       {onEmpty: false, required: false},
      //descuentoRegalos:  {onEmpty: false, required: false},
    }
  },
  panelInfoTabs: {
    tabs : [
      {
        key: 0,
        label: 'OFERTAS',
        icon: 'local_offer',
        disabled: false,
        visible: true,
        colums : [
          { key: 'segmento', label: 'Segmento'},
          { key: 'producto', label: 'Producto'},
          { key: 'mensaje', label: 'Nombre'},
          { key: 'montoMin', label: 'Monto mínimo'},
          { key: 'montoMax', label: 'Monto máximo'},
          { key: 'plazoMin', label: 'Plazo mínimo'},
          { key: 'plazoMax', label: 'Plazo máximo'},
          { key: 'tasaMin', label: 'Taza mínima'},
          { key: 'tasaMax', label: 'Taza máxima'},
          { key: 'frecuencia', label: 'Frecuencia'},
          { key: 'tipoAnalisis', label: 'Análisis'},
          { key: 'anticipada', label: 'Anticipada'},
          { key: 'simulador', label: 'Simulador',
            component: props => <TableCell className={props.classes && props.classes.tableCell}>
              <Tooltip title="Simulador">
                <IconButton color="primary" onClick={e => props.handleRowChange(e, props.rowId, 'simulador')} >
                  <Icon>create</Icon>
                </IconButton>
              </Tooltip>
            </TableCell>
          },
        ]
      },
      {
        key: 1,
        label: 'SOLICITUDES',
        icon: 'receipt',
        disabled: false,
        visible: true,
        colums : [
          { key: 'solicitud', label: 'Solicitud'},
          { key: 'status', label: 'Status'},
          { key: 'fechaSolicitud', label: 'Fecha solicitud'},
          { key: 'montoPago', label: 'Monto pagado'},
          { key: 'frecuenciaPago', label: 'Frecuencia pago'},
          { key: 'codigoProducto', label: 'Producto'},
          { key: 'contrato', label: 'Contrato'},
          { key: 'efectivoOtorgado', label: 'Efectivo otorgado'},
          { key: 'oficina', label: 'Oficina'},
          { key: 'tipoProducto', label: 'Tipo de producto'},
          { key: 'segmento', label: 'Segmento'},
        ]
      },
      {
        key: 2,
        label: 'CONTRATOS',
        icon: 'assignment',
        disabled: false,
        visible: true,
        colums : [
          { key: 'codigoProducto', label: 'Producto'},
          { key: 'contrato', label: 'Contrato'},
          { key: 'monto', label: 'Monto'},
          { key: 'montoPago', label: 'Monto pago'},
          { key: 'efectivo', label: 'Efectivo'},
          { key: 'numPagos', label: 'Num. Pagos'},
          { key: 'tipoCredito', label: 'Tipo credito'},
          { key: 'fechaContrato', label: 'Fecha contrato'},
          { key: 'fechaDisposicion', label: 'Fecha disposición'},
          { key: 'fechaImpresion', label: 'fecha impresión'},
          { key: 'fechaUltimoMovimiento', label: 'Fecha último movimiento'},
          { key: 'reportes', label: 'Reportes',
            component: props => <TableCell className={props.classes && props.classes.tableCell}>
              <Tooltip title="Reportes">
                <IconButton color="primary" onClick={e => props.handleRowChange(e, props.rowId, 'reportes')} >
                  <Icon>description</Icon>
                </IconButton>
              </Tooltip>
            </TableCell>
          },
          { key: 'edoCta', label: 'Estado de cuenta',
            component: props => <TableCell className={props.classes && props.classes.tableCell}>
              <Tooltip title="Estado de cuenta">
                <IconButton color="primary" onClick={e => props.handleRowChange(e, props.rowId, 'edoCta')} >
                  <Icon>assignment</Icon>
                </IconButton>
              </Tooltip>
            </TableCell>
          },
        ]
      }
    ],
  },
  panelGestion: {
    itemList: [
      {name: 'gestion', title: <Fragment><Icon style={iconStyle}>settings</Icon><TitlePanelContainerAlt>Gestión de persona</TitlePanelContainerAlt></Fragment>, content: 'Text or Component',
        contendExtend: {
          tabs : [
            {
              key: 0,
              label: 'CONTACTO',
              icon: 'contact_phone',
              disabled: false,
              visible: true,
              colums : [
                { key: 'persona', label: 'Nombre'},
                { key: 'telefono', label: 'Contacto'},
                { key: 'tipoTelefono', label: 'Tipo'},
                { key: 'consecutivo', label: 'Consecutivo'},
                { key: 'fechaUltimaModificacion', label: 'Última notificación'},
              ]
            },
            {
              key: 1,
              label: 'GESTIÓN',
              icon: 'phone_forwarded',
              disabled: false,
              visible: true,
            }
          ],
        }
      },
      //{name: 'notas', title: <Fragment><Icon style={iconStyle}>notes</Icon><TitlePanelContainerAlt>Notas</TitlePanelContainerAlt></Fragment>}
    ]
  },
  panelGestionesHistory: {
    itemList: [
      {name: 'gestionesHistory', title: <Fragment><Icon style={iconStyle}>history</Icon><TitlePanelContainerAlt>Historial de gestiones</TitlePanelContainerAlt></Fragment>,
        contendExtend: {
          colums : [
            { key: 'idGestion', label: 'Id Gestion'},
            { key: 'periodo', label: 'Periodo'},
            { key: 'codigoCampania', label: 'Campaña'},
            { key: 'fechaGestion', label: 'Fecha Gestion'},
            { key: 'gestor', label: 'Gestor'},
            { key: 'codigoContacto', label: 'Tipo Gestion'},
            { key: 'codigoResultado', label: 'Respuesta'},
            { key: 'comentarios', label: 'Comentarios'},
          ]
        }
      }
    ]
  }
});
