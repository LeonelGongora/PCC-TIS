import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home_Admin from "./pages/Home_Admin.js";
import Add_Event from "./pages/Add_Event.js";
import Home_Participant from "./pages/Home_Participant.js";
import Register_Event from "./pages/Register_Event.js";
import Register_Event_Admin from "./pages/Register_Event_Admin.js";

import ContenedorSliderAdmin from "./pages/ContenedorSliderAdmin.js";
import ContenedorSliderUser from "./components/ContenedorSliderUser.js";

import FormRegistroUsuario from "./components/FormRegistroUsuario.js";
import PaginaEditarEventos from "./pages/PaginaEditarEventos.js";
import EditarEvento from "./pages/EditarEvento.js";
import AcceptUserToEvent from "./pages/AcceptUserToEvent.js";


//import Home_Admin_Prueba from "./pages/Home_Admin_Prueba.js";

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home_Admin/>} />
      <Route path='/home-participant' element={<Home_Participant/>} />
      
        <Route path='/event-admin' element={<ContenedorSliderAdmin/>} />
        <Route path='/event-user' element={<ContenedorSliderUser/>} />

        <Route path='/register-to-event' element={<Register_Event/>}/>
            
        <Route path='/add-event' element={<Register_Event_Admin/>} />



        <Route path='/formUsuario' element={<FormRegistroUsuario/>} />
        <Route path='/paginaEditarEventos' element={<PaginaEditarEventos/>} />

        <Route path='/editar-evento' element={<EditarEvento/>} />


        <Route path='/acceptUser' element={<AcceptUserToEvent/>} />
        
            
      </Routes>
    </Router>
  );
}

export default App;

