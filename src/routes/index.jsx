/* eslint-disable import/first */
// Dependencies
import React from 'react';

// utils
import { snakeToPascal } from 'utils/misc';

// Features sections
// import CapturaContainer from 'containers/captura/CapturaContainer';
import CapturaContainer from 'App/scenes/Captura';
import GestionAsignacionProspectosContainer from 'containers/GestionAsignacionProspectos/GestionAsignacionProspectosContainer';
import StepperContainer from 'containers/Generic/StepperContainer';

// Prospectos
import Prospectos from "App/scenes/Prospectos";
import ProspectoRegister from "App/scenes/Prospectos/ProspectoRegister";
import ProspectoDetail from "App/scenes/Prospectos/ProspectoDetail";

// test
const RenderHome = () => <h2>Home...</h2>;

// DemoRoom
import DemoRoom from 'App/scenes/DemoRoom';
import DemoRoomTopic from 'App/scenes/DemoRoom/DemoRoomTopic';


const indexRoutes = [
  { path: "/", render: props => <RenderHome routeTitle="home"/> },

  // Captura
  { path: "/captura/:noSolicitud/:cliente",
    routeTitle: "Captura cliente",
    render: props => <CapturaContainer
      noSolicitud={props.match.params.noSolicitud}
      cliente={props.match.params.cliente}
      {...props} /> },

  // Registro solicitud
  { path: "/registroSolicitud", component: StepperContainer, routeTitle: "Registro solicitud", viewWidthExpanded: true },

  // Prospectos
  { path: "/GestionAsignacionProspectos", component: GestionAsignacionProspectosContainer, routeTitle: "Gestión asignación prospectos", viewWidthExpanded: true },
  { path: "/prospectos", component: Prospectos, routeTitle: "Análisis cliente" },
  { path: "/prospectos/registrar-usuario", component: ProspectoRegister, routeTitle: "Registro de usuario" },
  { path: "/prospectos/:prospectoDetailUID", component: ProspectoDetail, routeTitle: "Información de cliente" },

  // Demo Room
  { path: "/demo-room/", component: DemoRoom, routeTitle: "Demo Room" },
  { path: "/demo-room/:topic",
    routeTitle: `CustomComponent Demo`,
    render: props => <DemoRoomTopic
      whichTopic = {snakeToPascal(props.match.params.topic)}
      {...props} />
  },
];

export default indexRoutes;
