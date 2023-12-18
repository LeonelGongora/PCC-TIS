import React , { useState} from 'react';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalEleccionTipoCampo({estadoEleccion, cambiarEstadoModalEleccion, 
    cambiarEstadoModalAtributo, 
    cambiarEstadoCampoNumerico,
    cambiarEstadoCampoFecha,
    cambiarEstadoCampoSeleccion,
    id_evento}){

    const id_evento_Aux = cookies.get('id_evento');
    const participantes_Evento = cookies.get('participantes_Evento');
    const [errors, setErrors] = useState({});

    const salirVentanaModal = (e) => {
        cambiarEstadoModalEleccion(false);
        cookies.remove("participantes_Evento");
        setErrors({})
    }

    return (
      estadoEleccion && (
        <div className="Overlay">
          <div className="ContenedorModal">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Elegir tipo de Campo</h1>
              </div>
              <button onClick={salirVentanaModal} className="BotonSalir">
                {salir}
              </button>
            </div>

            <div className="registroTipoEvento">

              <button
                type="button"
                className="BotonRegistrar BotonElegirCampo"
                onClick={() => {
                  console.log(participantes_Evento)
                  if (participantes_Evento.length > 0) {
                    const validationErrors = {};
                    validationErrors.error_eleccion = "No se puede configurar un formulario de un evento que ya cuenta con participantes"
                    setErrors(validationErrors);
                  } else {
                    cambiarEstadoModalEleccion(false);
                    cambiarEstadoCampoNumerico(true);
                  }
                }}
              >
                Campo Numérico
              </button>

              <button
                type="button"
                className="BotonRegistrar BotonElegirCampo"
                onClick={() => {
                  if (participantes_Evento.length > 0) {
                    const validationErrors = {};
                    validationErrors.error_eleccion = "No se puede configurar un formulario de un evento que ya cuenta con participantes"
                    setErrors(validationErrors);
                  } else {
                    cambiarEstadoModalEleccion(false);
                    cambiarEstadoModalAtributo(true);
                  }
                }}
              >
                Campo de texto
              </button>

              <button
                type="button"
                className="BotonRegistrar BotonElegirCampo"
                onClick={() => {
                  if (participantes_Evento.length > 0) {
                    const validationErrors = {};
                    validationErrors.error_eleccion = "No se puede configurar un formulario de un evento que ya cuenta con participantes"
                    setErrors(validationErrors);
                  } else {
                    cambiarEstadoModalEleccion(false);
                    cambiarEstadoCampoSeleccion(true);
                  }
                }}
              >
                Campo de opciones
              </button>

              <button
                type="button"
                className="BotonRegistrar BotonElegirCampo"
                cambiarEstadoCampoSeleccion
                onClick={() => {
                  if (participantes_Evento.length > 0) {
                    const validationErrors = {};
                    validationErrors.error_eleccion = "No se puede configurar un formulario de un evento que ya cuenta con participantes"
                    setErrors(validationErrors);
                  } else {
                    cambiarEstadoModalEleccion(false);
                    cambiarEstadoCampoFecha(true);
                  }
                }}
              >
                Campo de fecha
              </button>
            </div>
            {errors.error_eleccion && (
              <div className='contAnuncioEditCampos'>
                <span className="anuncioNoEditCampos">{errors.error_eleccion}</span>
              </div>
              )}
          </div>
        </div>
      )
    );
}

export default ModalEleccionTipoCampo; 