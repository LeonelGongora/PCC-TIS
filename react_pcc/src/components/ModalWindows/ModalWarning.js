import React, {useState} from  'react';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWarningStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />
const warning = <FontAwesomeIcon icon={faExclamationCircle} style={{ color: '#ffffff' }} />


function ModalWarning({estado1, cambiarEstado1, errorMessage }){

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
              <p className="mensajeError">{errorMessage}</p>
            </div>
          </div>
        </div>
      )
    );
}

export default ModalWarning; 