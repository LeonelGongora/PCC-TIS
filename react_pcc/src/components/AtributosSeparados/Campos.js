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
import ModalCampoInformacion from '../ModalWindows/ModalCampoInformacion';
import {URL_API} from '../../const';

const cookies = new Cookies();

function Campos({estadoCampos, cambiarEstadoCampos, atributosFormulario, atributosInformacion}){

    const id = cookies.get('ultimo_id_evento');
    const organizadores_agregar = cookies.get('organizadores_agregar');
    const organizadores_eliminar = cookies.get('organizadores_eliminar');
    //const atributos = [];

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;

    const [values, setValues] = useState({
      estadoModalEleccion:false,
      estadoCampoSeleccion: false, 
      estadoModalAtributo: false,
      estadoCampoNumerico: false,
      estadoCampoFecha: false,
      estadoCampoInformacion: false,

      estadoModal: true,
      estadoRegistroUsuario: false
    })

    const cambiarEstadoModalEleccion = (nuevoEstado) => {
      setValues({ estadoModalEleccion: nuevoEstado });
    }

    const cambiarEstadoCampoSeleccion = (nuevoEstado) => {
      setValues({ estadoCampoSeleccion: nuevoEstado });
    }

    const cambiarEstadoModalAtributo = (nuevoEstado) => {
      setValues({ estadoModalAtributo: nuevoEstado });
    }

    const cambiarEstadoCampoNumerico = (nuevoEstado) => {
      setValues({ estadoCampoNumerico: nuevoEstado });
    }

    const cambiarEstadoCampoFecha = (nuevoEstado) => {
      setValues({ estadoCampoFecha: nuevoEstado });
    }

    const cambiarEstadoCampoInformacion = (nuevoEstado) => {
      setValues({ estadoCampoInformacion: nuevoEstado });
    }

    const eliminarAtributo = (id) => {
      const url = `${URL_API}/delete-attribute/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
    }

    useEffect(()=>{

    }, []);
    
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
        estadoCampos && (
          <>
          <ModalEleccionTipoCampo
            estadoEleccion={values.estadoModalEleccion}
            cambiarEstadoModalEleccion={cambiarEstadoModalEleccion}
            cambiarEstadoModalAtributo = {cambiarEstadoModalAtributo}
            cambiarEstadoCampoNumerico = {cambiarEstadoCampoNumerico}
            cambiarEstadoCampoFecha = {cambiarEstadoCampoFecha}
            cambiarEstadoCampoSeleccion = {cambiarEstadoCampoSeleccion}
            id_evento={id}
          />
          
          <ModalCampoSeleccion
            estadoCampoSeleccion={values.estadoCampoSeleccion}
            cambiarEstadoCampoSeleccion={cambiarEstadoCampoSeleccion}
            id_evento={id}
            atributos={atributosFormulario} />

          <ModalWindowAtributo
            estadoAtributo={values.estadoModalAtributo}
            cambiarEstadoModalAtributo={cambiarEstadoModalAtributo}
            id_evento={id}
            atributos={atributosFormulario}
          />

          <ModalCampoNumerico
            estadoCampoNumerico={values.estadoCampoNumerico}
            cambiarEstadoCampoNumerico={cambiarEstadoCampoNumerico}
            id_evento={id}
            atributos={atributosFormulario}
          />
              
          <ModalCampoFecha
            estadoCampoFecha={values.estadoCampoFecha}
            cambiarEstadoCampoFecha={cambiarEstadoCampoFecha}
            id_evento={id}
            atributos={atributosFormulario}
          />

          <ModalCampoInformacion
            estadoCampoInformacion={values.estadoCampoInformacion}
            cambiarEstadoCampoInformacion={cambiarEstadoCampoInformacion}
            id_evento={id}
            atributos={atributosFormulario}
          />
              
          <div className='tituloCampos'>
            <h2>Campos adicionales al registro</h2>
            <div className='seccionCampo'>
              <div className='seccionesExtra'>
                 {atributosFormulario.map((atributo) => ( 
                <div className="campo-cont">
                  <div id="entradaEveNex">
                    <p id="textoCuadro">{atributo.nombre_atributo}</p>
                    <input
                      id="inputRegistro"
                      type={atributo.tipo_dato_atributo}
                      name="valor"
                      placeholder="Campo Adicional"
                      readOnly />
                  </div>
                  <button
                    className="botonEliminarCampo"
                    type="button"
                    onClick={() => eliminarAtributo(atributo.id)}
                  >
                    {cancelar}
                  </button>
                </div>
                 ))} 

                <div className='contenedorBotonCampo'>
                  <button
                    className="botonAgregarCampo"
                    type="button"
                    onClick={() => cambiarEstadoModalEleccion(!values.estadoModalEleccion)}
                  >
                    Agregar Campo Para Formulario +
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
          </>)

    );
}

export default Campos;