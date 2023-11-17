import "../stylesheets/RegisterEventStyles.css";
import FormRegistroEvento from '../components/FormRegistroEvento';

import React , { useState, useEffect } from 'react';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import NavbarUser from "../components/NavBars/NavbarUser";


const Eventos_Api_Url = configApi.EVENTOC_API_URL;

const cookies = new Cookies();

function Register_to_Event() {

  const [event, setEvent] = useState ( [] );
  
  const idevento = cookies.get('idauxiliar');

  useEffect(()=>{
    getEvent()
  }, [])

  const getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${idevento}`;
      const response = await axios.get(url)
      setEvent(response.data)
      // console.log(response.data);
  }

  return (

    <div className="App-Register-Event">
      <NavbarUser/>
      <div className="background-image-Register-Event"></div> 
      <div className="content-Register-Event">
      
      <div className="contenedorRaisa">

          <h1 className="title-Register-Event">{event.nombre_evento}</h1>
          <div className="formulario">
            <FormRegistroEvento/>
          </div>
      </div>
    </div>
    </div>
  );
}

export default Register_to_Event;