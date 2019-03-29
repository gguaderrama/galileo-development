/* eslint-disable import/first */
// Dependencies
import { handleActions } from "redux-actions";

const defaultState = {
  arrayIntegrantesTable: [
    {
      id: 1,
      nombre: "Maria Lopez",
      efectivo: "$3690",
      monto: "$2599",
      pago: "$3500",
      tipo_relacion: "Tia"
    },
    {
      id: 2,
      nombre: "Romina Perez",
      efectivo: "$3100",
      monto: "$2599",
      pago: "$3500",
      tipo_relacion: "Tio"
    },
    {
      id: 3,
      nombre: "Carlos Gonzalez",
      efectivo: "$1000",
      monto: "$2599",
      pago: "$3500",
      tipo_relacion: "Abuelo"
    }
  ],
  micronegocio: [
    { id: 1, name: "Micronegocio" },
    { id: 2, name: "two" },
    { id: 3, name: "three" }
  ],
  tipo_producto: [
    { id: 1, name: "Tradicional" },
    { id: 2, name: "two" },
    { id: 3, name: "three" }
  ],
  categoria: [
    { id: 1, name: "Micronegocio" },
    { id: 2, name: "two" },
    { id: 3, name: "three" }
  ],
  producto: [
    { id: 1, name: "Micronegocio" },
    { id: 2, name: "two" },
    { id: 3, name: "three" }
  ]
};
const capturaIntegrantes = handleActions(
  {
    ["TABLE_CAPTURA_INTEGRANTES"]: (state, action) => {
      return [{ id: 1, nombre: "Gloria" }];
    }
  },
  defaultState
);

export default capturaIntegrantes;
