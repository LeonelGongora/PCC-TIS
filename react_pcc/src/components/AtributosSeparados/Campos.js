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

const cookies = new Cookies();

function Campos({estadoCampos, cambiarEstadoCampos, atributosFormulario}){

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

    useEffect(()=>{

    }, [])

    const eliminarAtributo = (id) => {
      const url = `http://127.0.0.1:8000/api/delete-attribute/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
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
              
          <div className='tituloCampos'>
            <h2>Campos Adicionales</h2>
            <div className='seccionCampo'>
              <h3>Secciones de información</h3>
              <div className='seccionesExtra'>
                {/* {this.state.atributos.map((atributo) => ( */}
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
                {/* ))} */}
                <div className='contenedorBotonCampo'>
                  <button
                    className="botonAgregarCampo"
                    type="button"
                  >
                    Agregar Sección de información +
                  </button>
                </div>
              </div>
              <h3>Campos adicionales para el formulario de registro al evento</h3>
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
          </>)

    );
}

export default Campos;