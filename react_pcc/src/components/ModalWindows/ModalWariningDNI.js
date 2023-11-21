import React, {useState} from  'react';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWarningStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />
const warning = <FontAwesomeIcon icon={faExclamationCircle} style={{ color: '#ffffff' }} />


function ModalWarningDNI({estado1, cambiarEstado1, errorMessage }){

    return (
      estado1 && (
        <div className="OverlayRaisa">
          <div className="ContenedorModalRaisa">
            <div className="EncabezadoModal">
              <div className="Advertencia">

                <h1> {warning} Advertencia</h1>
              </div>
              <button
                onClick={() => cambiarEstado1(false)}
                className="BotonSalir"
              >
                {salir}
              </button>
            </div>
            <div className="contenedorMensaje">
              <p id="mensajeError">{errorMessage}</p>
            </div>
            <button className='registrar-team'>Registrar</button>
          </div>
        </div>
      )
    );
}

export default ModalWarningDNI; 