import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home_Admin from "./pages/Home_Admin.js";
import Add_Event from "./pages/Add_Event.js";
import Add_Type_Event from "./pages/Add_Type_Evento.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home_Admin/>} />
        <Route path='/add-event' element={<Add_Event/>} />
        <Route path='/add-event/add-type-event' element={<Add_Type_Event/>} />
      </Routes>
    </Router>
  );
}

export default App;