import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';
import ModalWindowRequisito from '../ModalWindows/ModalWindowRequisito';
import {URL_API} from '../../const';

const cookies = new Cookies();

function Requisitos({estadoRequisitos, cambiarEstadoRequisitos, requisitos}){

  const id = cookies.get('ultimo_id_evento');

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;

    const [values, setValues] = useState({
      estadoModalRequisito: false,

      estadoModal: true,
      estadoRegistroUsuario: false
    })
    
    const cambiarEstadoModalRequisito = (nuevoEstado) => {
      setValues({ estadoModalRequisito: nuevoEstado });
    }

    const eliminarRequisito = (id) => {
      console.log(id)
      const url = `${URL_API}/delete-attribute/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
    }

    return (
      
        estadoRequisitos && (
          <>
          <ModalWindowRequisito
            estadoAtributo={values.estadoModalRequisito}
            cambiarEstadoModalAtributo={cambiarEstadoModalRequisito}
            id_evento={id} 
          />
          
          <div className='tituloCampos'>
            <h2>Requisitos</h2>
            <div className='seccionCampo'>
              <div className='seccionesExtra'>
                 {requisitos.map((requisito) => ( 
                <div className="campo-cont requisito-cont">
                  <div id="entradaEveNex">
                    <p id="textoCuadro" className='cuadroRequisito'>Requisito 1</p>
                    <textarea
                      name="contenido_anuncio"
                      className="inputRequisitoOp"
                      rows={2}
                      cols={20}
                      placeholder={requisito.contenido_requisito}
                      readOnly />
                  </div>
                  <button
                    className="botonEliminarCampo"
                    type="button"
                    onClick={() => eliminarRequisito(requisito.id)}
                  >
                    {cancelar}
                  </button>
                </div>
                ))} 
                <div className='contenedorBotonCampo'>
                  <button
                    className="botonAgregarCampo"
                    type="button"
                    onClick={() =>
                      cambiarEstadoModalRequisito(!values.estadoModalRequisito)
                    }
                  >
                    Agregar Requisito +
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
          </>)

    );
}

export default Requisitos;