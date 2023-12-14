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

function Secciones({estadoSecciones, cambiarEstadoSecciones, atributosInformacion}){

    const id = cookies.get('ultimo_id_evento');
    const organizadores_agregar = cookies.get('organizadores_agregar');
    const organizadores_eliminar = cookies.get('organizadores_eliminar');
    //const atributos = [];

    const [atributos, setAtributos] = useState ( [] );

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;

    const [values, setValues] = useState({
      estadoModalInformacion: false,

      estadoModal: true,
      estadoRegistroUsuario: false
    })

    const cambiarEstadoModalInformacion = (nuevoEstado) => {
      setValues({ estadoModalInformacion: nuevoEstado });
    }

    const eliminarInformacion = (id) => {
      console.log(id)
      /* 
      console.log(id)
      const url = `http://127.0.0.1:8000/api/delete-attribute/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
      */
    }

    const terminarRegistro = () => {

      //console.log(organizadores_agregar)
      //console.log(organizadores_eliminar)

      if(organizadores_agregar){
        const url_Organizador_agregar = `${URL_API}/add-event_organizer`; 
        
        for (let index = 0; index < organizadores_agregar.length; index++) {
          const data = new FormData();
          let organizador = organizadores_agregar[index];
          data.append("organizador", organizador);
          data.append("evento", id);

          axios.post(url_Organizador_agregar, data).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
            }
          });
        }

        cookies.remove("organizadores_agregar");
        
      }

      if(organizadores_eliminar){
        const url_Organizador_eliminar = `${URL_API}/delete-event_organizer`;

        for (let index = 0;index < organizadores_eliminar.length; index++) {
          const data = new FormData();
          let organizador = organizadores_eliminar[index];
          data.append("organizador", organizador);
          data.append("evento", id);

          axios.post(url_Organizador_eliminar, data).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              }
            });
        }
        cookies.remove("organizadores_eliminar");
      }

      window.location.href = "./home-admin";

    }

    return (
      
        estadoSecciones && (
              <>
          <div className='tituloCampos'>
            <h2>Secciones de información</h2>
            <div className='seccionCampo'>
              <div className='seccionesExtra'>
                {atributosInformacion.map((seccion) => (  
                <div className="campo-cont">
                  <div id="entradaEveNex">
                    <p id="textoCuadro">{seccion.nombre_informacion}</p>
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
                ))}  
                <div className='contenedorBotonCampo'>
                  <button
                    className="botonAgregarCampo"
                    type="button"
                    onClick={() => cambiarEstadoModalInformacion(!values.estadoModalInformacion)}
                  >
                    Agregar Sección de información +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='contBotonRegist'>
                <button className='botonesCambiar'
                onClick={terminarRegistro}
                >
                Terminar Registro
                </button>
            </div>
            </>
          )
    );
}

export default Secciones;