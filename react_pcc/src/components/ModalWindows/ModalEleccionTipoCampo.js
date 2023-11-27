import React from  'react';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalEleccionTipoCampo({estadoEleccion, cambiarEstadoModalEleccion, 
    cambiarEstadoModalAtributo, 
    cambiarEstadoCampoNumerico,
    cambiarEstadoCampoFecha,
    cambiarEstadoCampoSeleccion,
    id_evento}){

    const salirVentanaModal = (e) => {
        cambiarEstadoModalEleccion(false);
    }

    return (
        estadoEleccion && (
          <div className="Overlay">
            <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Elegir tipo de Campo</h1>
                  </div>
                  <button
                    onClick={salirVentanaModal}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento">
              <button type="button" className="BotonRegistrar"
              onClick={() => { cambiarEstadoModalEleccion(false); cambiarEstadoCampoNumerico(true);}}>
                Campo Numerico
              </button>

              <button type="button" className="BotonRegistrar"
              onClick={() => { cambiarEstadoModalEleccion(false); cambiarEstadoModalAtributo(true);}}>
                Campo de texto
              </button>

              <button type="button" className="BotonRegistrar"
              onClick={() => { cambiarEstadoModalEleccion(false); cambiarEstadoCampoSeleccion(true);}}>
                Campo de opciones
              </button>

              <button type="button" className="BotonRegistrar"cambiarEstadoCampoSeleccion
              onClick={() => { cambiarEstadoModalEleccion(false); cambiarEstadoCampoFecha(true);}}>
                Campo de fecha
              </button>

              </div>
            </div>
          </div>
        )
    );
}

export default ModalEleccionTipoCampo; 