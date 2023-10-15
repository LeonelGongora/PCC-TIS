import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home_Admin from "./pages/Home_Admin.js";
import Add_Event from "./pages/Add_Event.js";
import Add_Type_Event from "./pages/Add_Type_Evento.js";
import Home_Participant from "./pages/Home_Participant.js";
import Register_Event from "./pages/Register_Event.js";
import Register_Event_Admin from "./pages/Register_Event_Admin.js";

import ContenedorSliderAdmin from "./pages/ContenedorSliderAdmin.js";
import ContenedorSliderUser from "./components/ContenedorSliderUser.js";


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
            
        <Route path='/add-event' element={<Add_Event/>} />
        <Route path='/prueba' element={<Register_Event_Admin/>} />
        
            <Route path='/add-event/add-type-event' element={<Add_Type_Event/>} />
      </Routes>
    </Router>
  );
}

export default App;