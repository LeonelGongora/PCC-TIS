import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
import EditarInformacionDeEventosNext from "./components/EditarInformacionDeEventosNext.js";

import VisualizarParticipantes from "./pages/VisualizarParticipantes.js";
import VisualizarEquipos from "./pages/VisualizarEquipos.js";
import DarBajaEvento from "./pages/DarBajaEvento_User.js";

import Homepage from "./pages/Homepage.js";
import Login from "./pages/Login.js";
import Register_Event_Admin_NextAlt from "./pages/Register_Event_Admin_NextAlt.js";

import Reportes_Pagina from "./pages/Reportes_Pagina.js";
import EmailPrueba from "./pages/EmailPrueba.js";


function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/home-admin' element={<Home_Admin/>} />
      <Route path='/home-participant' element={<Home_Participant/>} />
      
        <Route path='/event-admin' element={<ContenedorSliderAdmin/>} />

        <Route path='/register-to-event' element={<Register_to_Event/>}/>
        <Route path='/register-to-event-teams' element={<Register_to_Event_Teams/>}/>
            
        <Route path='/add-event' element={<Register_Event_Admin/>} />
        <Route path='/add-event-next' element={<Register_Event_Admin_Next/>} />
        <Route path='/add-event-next-alt' element={<Register_Event_Admin_NextAlt/>} />

        <Route path='/paginaRegistrarseEventos' element={<PaginaRegistrarseEventos/>} />
        <Route path='/paginaVisualizarParticipantes' element={<PaginaVisualizarParticipantes/>} />
        <Route path='/paginaEditarEventos' element={<PaginaEditarEventos/>} />

        
        <Route path='/editar-evento' element={<EditarEvento/>} />
        <Route path='/editar-evento-next' element={<EditarInformacionDeEventosNext/>} />

        <Route path='/acceptUser' element={<AcceptUserToEvent/>} />
        <Route path='/acceptTeam' element={<AcceptTeamToEvent/>} />
        
        <Route path='/eventacceptUser' element={<PaginaAdministrarSolicitudes/>} />

        <Route path='/participantes' element={<VisualizarParticipantes/>} />
        <Route path='/equipos' element={<VisualizarEquipos />} />
        <Route path='/darBajaEvento' element={< DarBajaEvento />} />

        <Route path='/home' element={<Homepage/>} />
        <Route path='/login' element={<Login/>} />

        <Route path='/reportes' element={< Reportes_Pagina />} />
        <Route path='/emailPrueba' element={< EmailPrueba />} />
        
      </Routes>
    </Router>
  );
}

export default App;

