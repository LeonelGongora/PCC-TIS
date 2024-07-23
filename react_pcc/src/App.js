import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

import Home_Admin from "./pages/Home_Admin.js";
import Home_Participant from "./pages/Home_Participant.js";

import Register_to_Event from "./pages/Register_to_Event.js";
import Register_to_Event_Teams from "./pages/Register_to_Event_Teams.js";

import Register_Event_Admin from "./pages/Register_Event_Admin.js";
import Register_Event_Admin_Next from "./pages/Register_Event_Admin_Next.js";

import ContenedorSliderAdmin from "./pages/ContenedorSliderAdmin.js";

import PaginaEditarEventos from "./pages/PaginaEditarEventos.js";
import EditarEvento from "./pages/EditarEvento.js";

import AcceptUserToEvent from "./pages/AcceptUserToEvent.js";
import AcceptTeamToEvent from "./pages/AcceptTeamToEvent.js";

import PaginaRegistrarseEventos from "./pages/PaginaRegistrarseEventos.js";
import PaginaAdministrarSolicitudes from "./pages/PaginaAdministrarSolicitudes.js";
import PaginaVisualizarParticipantes from "./pages/PaginaVisualizarParticipantes.js";
import PaginaRegistrarActividad from "./pages/PaginaRegistrarActividad.js";
import PaginaEliminarActividad from "./pages/PaginaEliminarActividad.js";
import PaginaConfigurarFormulario from "./pages/PaginaConfigurarFormulario.js";

import VisualizarParticipantes from "./pages/VisualizarParticipantes.js";
import VisualizarEquipos from "./pages/VisualizarEquipos.js";
import DarBajaEvento from "./pages/DarBajaEvento_User.js";
import DarBajaEquipo from "./pages/DarBajaEquipo_User.js";

import Homepage from "./pages/Homepage.js";
import Login from "./pages/Login.js";
import Unauthorized from './Unauthorized.js';
import Register_Event_Admin_NextAlt from "./pages/Register_Event_Admin_NextAlt.js";

import Reportes from "./components/Reportes.js";

import FormRegistroUsuarioDinamico from "./pages/FormRegistroUsuarioDinamico.js";
import FormRegistroTipoUser from "./pages/FormRegistroTipoUser.js";

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/home-admin' element={<ProtectedRoute element={Home_Admin} requiredPermissionIndexes={[0,1,2,3,4,5,6,7,8,9,10,11,12]} adminOnly />} />
      <Route path='/home-participant' element={<Home_Participant/>} />
      <Route path='/unauthorized' element={<Unauthorized />} />
      
        <Route path='/event-admin' element={<ProtectedRoute element={ContenedorSliderAdmin} requiredPermissionIndexes={[3]} adminOnly/>} />

        <Route path='/register-to-event' element={<Register_to_Event />} />
        <Route path='/register-to-event-teams' element={<Register_to_Event_Teams />} />

        <Route path='/add-event' element={<ProtectedRoute element={Register_Event_Admin } requiredPermissionIndexes={[0]} adminOnly/>} />
        {/* <Route path='/add-event-next' element={<Register_Event_Admin_Next />} /> */}
        <Route path='/add-event-next-alt' element={<ProtectedRoute element={Register_Event_Admin_NextAlt} requiredPermissionIndexes={[0]} adminOnly/>} />

        <Route path='/paginaRegistrarseEventos' element={<PaginaRegistrarseEventos />} />
        <Route path='/paginaVisualizarParticipantes' element={<ProtectedRoute element={PaginaVisualizarParticipantes} requiredPermissionIndexes={[4]} adminOnly/>} />
        <Route path='/paginaEditarEventos' element={<ProtectedRoute element={PaginaEditarEventos} requiredPermissionIndexes={[1]} adminOnly/>} />
        <Route path='/paginaRegistrarActividad' element={<ProtectedRoute element={PaginaRegistrarActividad} requiredPermissionIndexes={[5]} adminOnly/>} />
        <Route path='/paginaEliminarActividad' element={<ProtectedRoute element={PaginaEliminarActividad} requiredPermissionIndexes={[6]} adminOnly/>} />
        <Route path='/paginaConfigurarFormulario' element={<ProtectedRoute element={PaginaConfigurarFormulario} requiredPermissionIndexes={[7]} adminOnly/>} />

        <Route path='/editar-evento' element={<ProtectedRoute element={EditarEvento} requiredPermissionIndexes={[1]} adminOnly/>} />

        <Route path='/acceptUser' element={<ProtectedRoute element={AcceptUserToEvent} requiredPermissionIndexes={[10]} adminOnly/>} />
        <Route path='/acceptTeam' element={<ProtectedRoute element={AcceptTeamToEvent} requiredPermissionIndexes={[10]} adminOnly/>} />

        <Route path='/eventacceptUser' element={<ProtectedRoute element={PaginaAdministrarSolicitudes} requiredPermissionIndexes={[10]} adminOnly/>} />

        <Route path='/participantes' element={<ProtectedRoute element={VisualizarParticipantes} requiredPermissionIndexes={[4]} adminOnly/>} />
        <Route path='/equipos' element={<ProtectedRoute element={VisualizarEquipos} requiredPermissionIndexes={[4]} adminOnly/>} />
        <Route path='/darBajaEvento' element={< DarBajaEvento />} />
        <Route path='/darBajaEquipo' element={< DarBajaEquipo />} />

        <Route path='/home' element={<Homepage />} />
        <Route path='/login' element={<Login />} />

        <Route path='/reportes' element={<ProtectedRoute element={Reportes} requiredPermissionIndexes={[12]} adminOnly/>} />

        <Route path='/FormRegistroUsuarioDinamico' element={<ProtectedRoute element={FormRegistroUsuarioDinamico} adminOnly/>} />
        <Route path='/FormRegistroTipoUser' element={<ProtectedRoute element={FormRegistroTipoUser} adminOnly/>} />

      </Routes>
    </Router>
  );
}

export default App;

