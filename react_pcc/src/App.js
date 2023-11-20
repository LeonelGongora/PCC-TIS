import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home_Admin from "./pages/Home_Admin.js";
import Home_Participant from "./pages/Home_Participant.js";
import Register_to_Event from "./pages/Register_to_Event.js";
import Register_to_Event_Teams from "./pages/Register_to_Event_Teams.js";
import Register_Event_Admin from "./pages/Register_Event_Admin.js";
import Register_Event_Admin_Next from "./pages/Register_Event_Admin_Next.js";

import ContenedorSliderAdmin from "./pages/ContenedorSliderAdmin.js";

import FormRegisterUser from "./pages/FormRegisterUser.js";
import PaginaEditarEventos from "./pages/PaginaEditarEventos.js";
import EditarEvento from "./pages/EditarEvento.js";
import AcceptUserToEvent from "./pages/AcceptUserToEvent.js";
import AcceptTeamToEvent from "./pages/AcceptTeamToEvent.js";
import PaginaRegistrarseEventos from "./pages/PaginaRegistrarseEventos.js";
import VisualizarEventoAccepUserToEvent from "./pages/VisualizarEventoAccepUserToEvent.js";
import EditarInformacionDeEventosNext from "./components/EditarInformacionDeEventosNext.js";
import Home_User_Dinamico from "./pages/Home_User_Dinamico.js";
import LoginProvisional from "./components/LoginProvisional.jsx";
import FormRegistroUsuarioDinamico from "./components/FormRegistroUsuarioDinamico.js";
import FormRegistroTipoUser from "./components/FormRegistroTipoUser.js";
import Register_to_Event_Team_Req from "./pages/Register_to_Event_Team_Req.js";
//import Home_Admin_Prueba from "./pages/Home_Admin_Prueba.js";

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home_Admin/>} />
      <Route path='/home-participant' element={<Home_Participant/>} />
      <Route path='/home' element={<Home_User_Dinamico/>} />
      
        <Route path='/event-admin' element={<ContenedorSliderAdmin/>} />

        <Route path='/register-to-event' element={<Register_to_Event/>}/>
        <Route path='/register-to-event-teams' element={<Register_to_Event_Teams/>}/>
        <Route path='/register-to-event-teams_req' element={<Register_to_Event_Team_Req/>}/>
            
        <Route path='/add-event' element={<Register_Event_Admin/>} />
        <Route path='/add-event-next' element={<Register_Event_Admin_Next/>} />

        <Route path='/paginaRegistrarseEventos' element={<PaginaRegistrarseEventos/>} />

        <Route path='/formUsuario' element={<FormRegisterUser/>} />
        <Route path='/paginaEditarEventos' element={<PaginaEditarEventos/>} />

        <Route path='/editar-evento' element={<EditarEvento/>} />
        <Route path='/editar-evento-next' element={<EditarInformacionDeEventosNext/>} />

        <Route path='/acceptUser' element={<AcceptUserToEvent/>} />
        <Route path='/acceptTeam' element={<AcceptTeamToEvent/>} />
        
        <Route path='/eventacceptUser' element={<VisualizarEventoAccepUserToEvent/>} />

        <Route path='/login' element={<LoginProvisional/>} />
        <Route path='/add-user-dinamico' element={<FormRegistroUsuarioDinamico/>} />
        <Route path='/add-tipo-user' element={<FormRegistroTipoUser/>} />

      </Routes>
    </Router>
  );
}

export default App;

