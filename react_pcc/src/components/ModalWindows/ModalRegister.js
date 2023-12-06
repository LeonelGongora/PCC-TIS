import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import FormRegistroUsuario from "../FormRegistroUsuario";


const salir = <FontAwesomeIcon icon={faCircleXmark} />



function ModalRegister({estadoRegister, cambiarEstadoModalRegister, id_evento}){

    
    const [errors, setErrors] = useState({});

    const salirVentanaModal = (e) => {
        cambiarEstadoModalRegister(false);
        setErrors({});
    }

    

    return (
        estadoRegister && (
            <div className="Overlay">
              <div className="ContenedorModal contReg">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Registro de Participante</h1>
                  </div>
                  <button
                    onClick={salirVentanaModal}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento reqCont">
                    <FormRegistroUsuario/>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalRegister;