import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';
import ModalCampoSeleccion from '../ModalWindows/ModalCampoSeleccion';
import ModalEleccionTipoCampo from '../ModalWindows/ModalEleccionTipoCampo';
import ModalCampoFecha from '../ModalWindows/ModalCampoFecha';
import ModalCampoNumerico from '../ModalWindows/ModalCampoNumerico';
import ModalWindowAtributo from '../ModalWindows/ModalWindowAtributo';
import {URL_API} from '../../const';

const cookies = new Cookies();

function Secciones({estadoSecciones, cambiarEstadoSecciones}){

    const id = cookies.get('ultimo_id_evento');
    //const atributos = [];

    const [atributos, setAtributos] = useState ( [] );

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;

    const [values, setValues] = useState({
      estadoModalEleccion:false,
      estadoCampoSeleccion: false, 
      estadoModalAtributo: false,
      estadoCampoNumerico: false,
      estadoCampoFecha: false,

      estadoModal: true,
      estadoRegistroUsuario: false
    })



    return (
      
        estadoSecciones && (
              <>
          <div className='tituloCampos'>
            <h2>Secciones de información</h2>
            <div className='seccionCampo'>
              <div className='seccionesExtra'>
                {/* {this.state.atributos.map((atributo) => (  */}
                <div className="campo-cont">
                  <div id="entradaEveNex">
                    <p id="textoCuadro">Seccion extra 1*</p>
                    <input
                      id="inputRegistro"
                      //   type={atributo.tipo_dato_atributo}
                      name="valor"
                      placeholder="Campo Adicional"
                      readOnly />
                  </div>
                  <button
                    className="botonEliminarCampo"
                    type="button"
                  >
                    {cancelar}
                  </button>
                </div>
                 {/* ))}  */}
                <div className='contenedorBotonCampo'>
                  <button
                    className="botonAgregarCampo"
                    type="button"
                  >
                    Agregar Sección de información +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='contBotonRegist'>
                <button className='botonesCambiar'>
                Terminar Registro
                </button>
            </div>
            </>
          )

    );
}

export default Secciones;