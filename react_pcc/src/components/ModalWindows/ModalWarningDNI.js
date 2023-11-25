import React, {useState} from  'react';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWarningStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const salir = <FontAwesomeIcon icon={faCircleXmark} />
const warning = <FontAwesomeIcon icon={faExclamationCircle} style={{ color: '#ffffff' }} />


function ModalWarningDNI({estadoWarningDNI, cambiarEstadoWarningDNI, cambiarEstadoModalEquipos}){
  const dni_no_registrados = cookies.get('dni_no_registrados');
  const indice_dni_no_registrados = cookies.get('indice_dni_no_registrados');

    return (
      estadoWarningDNI && (
        <div className="OverlayRaisa">
          <div className="ContenedorModalRaisa">
            <div className="EncabezadoModal">
              <div className="Advertencia">

                <h1> {warning} Advertencia</h1>
              </div>
            </div>
            <div className="contenedorMensaje">
              <p id="mensajeError">El DNI {dni_no_registrados[indice_dni_no_registrados]} no se encuentra registrado</p>
            </div>
            <button className='registrar-team' 
            onClick={() => { cambiarEstadoWarningDNI(false); cambiarEstadoModalEquipos(true);}}>Registrar</button>
          </div>
        </div>
      )
    );
}

export default ModalWarningDNI; 