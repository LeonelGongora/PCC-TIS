import "../stylesheets/RegisterEventStyles.css";
//import NavbarUser from './components/NavBarCreateEvent';
import FormRegistroEvento from '../components/FormRegistroEvento';

<<<<<<< Updated upstream
=======
import React , { useState, useEffect } from 'react';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import NavbarUser from '../components/NavbarUser';

>>>>>>> Stashed changes


function Register_Event() {

  return (

    <div className="App-Register-Event">
      <NavbarUser/>
      <div className="background-image-Register-Event"></div> 
      <div className="content-Register-Event">
<<<<<<< Updated upstream
        
        <div class="contenedor">
          <h1 className="title-Register-Event">Taller sobre capacitación sobre el lenguaje c#</h1>
          <div class="formulario">
=======
      
      <div className="contenedorRaisa">

          <h1 className="title-Register-Event">{event.nombre_evento}</h1>
          <div className="formulario">
>>>>>>> Stashed changes
            <FormRegistroEvento/>
          </div>
      </div>
    </div>

    </div>
  );
}

export default Register_Event;