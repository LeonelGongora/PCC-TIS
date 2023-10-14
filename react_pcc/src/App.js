import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home_Admin from "./pages/Home_Admin.js";
import Add_Event from "./pages/Add_Event.js";
import Add_Type_Event from "./pages/Add_Type_Evento.js";
import FormRegistroEvento from "./components/FormRegistroEvento.js";

import './App.css';
import ContenedorSliderAdmin from './pages/ContenedorSliderAdmin';
import ContenedorSliderUser from './pages/ContenedorSliderUser';
import AppRaisa from "./AppRaisa.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home_Admin/>} /> */}
        <Route path='/' element={<Home_Admin/>} />

        <Route path='/add-event' element={<Add_Event/>} />
        <Route path='/add-event/add-type-event' element={<Add_Type_Event/>} />
        <Route path='/ContenedorUser' element={<ContenedorSliderUser/>} />
        <Route path='/ContenedorAdmin' element={<ContenedorSliderAdmin/>} />
        <Route path='/RegistrarseEvento' element={<AppRaisa/>} />

      </Routes>
    </Router>
    // <div className="App">
    //   {/* <Home_Admin/> */}
      
    // </div>
  );
}

export default App;