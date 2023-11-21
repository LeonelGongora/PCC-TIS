import React, {useState, useEffect} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalAutentificacion({estado1, cambiarEstado1}){

    
    const [values, setValues] = useState({
      ci : "",
    });

    const [errors, setErrors] = useState({});
    const [usuarios, setUsuarios] = useState({})

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
    }

    useEffect(()=>{
      getUsuarios();
    }, []);

    const getUsuarios=async()=>{
      let url = "http://127.0.0.1:8000/api/get-user-information"
      //get-user-information
      const respuesta = await axios.get(url);
      console.log(respuesta)
      setUsuarios(respuesta.data.usuarios);
    }

    const salirVentanaModal = (e) => {
      cambiarEstado1(false);
      setValues({
        nombre_tipo_evento : '',
      });
      setErrors({});
  }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.ci.trim()){
            validationErrors.ci = "Este campo es obligatorio"

        }else if(!/^(?!-)[1-9][0-9]{6,8}$/.test(values.ci)){
            validationErrors.ci = "Ingrese un nombre valido"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

          let nuevo_ci = values.ci;
          let seEncontro = 0;
          for (let index = 0; index < usuarios.length; index++) {
    
            let ci = usuarios[index].ci
    
            if(ci == nuevo_ci){
              
              cambiarEstado1(false)
              seEncontro = 1;
              break;
            }
          }
    
          if(seEncontro === 0){
            cookies.set('ci_nuevo_usuario', nuevo_ci, {path: "/"});
            window.location.href='./formUsuario';
          }
        }
    }

    return (
        estado1 && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Autentificacion</h1>
                  </div>
                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">

                    <p id="textoCuadro">CI</p>
                    <input
                    id="input"
                    className="inputEvento"
                    type="text"
                    name="ci"
                    placeholder="Ingrese su CI"
                    onChange={handleInput}
                    />

                    {errors.ci && (
                    <span className="advertencia">
                    {errors.ci}
                    </span>
                    )}

                    <p id="textoCuadroAtributo">Contraseña*</p>
                        <input
                        type="text"
                        name="nombre_tipo_evento"
                        className="inputEvento"
                        placeholder="Ingrese su contraseña"
                        onChange={handleInput}
                        />
                        </form>
                        {errors.nombre_tipo_evento && (
                    <span className="span1Modal">{errors.nombre_tipo_evento}</span>
                    )}
              <button form="form1" type="submit" className="BotonRegistrar">
                Registrar
              </button>
              </div>
              </div>
        </div>
        )
    );
}

export default ModalAutentificacion; 