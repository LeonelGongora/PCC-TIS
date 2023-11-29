import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUser } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalAutentificacion({estado1, cambiarEstado1, cambiarEstadoModalRegistroUsuario,cambiarDatosCoach}){

    
    const [values, setValues] = useState({
      ci : "",
      nombre_usuario: "",
      apellido_usuario: "",
      ci_encontrado: "",
      contraseña: "",
      contraseña_encontrada: "",
    });

    const [errors, setErrors] = useState({});
    const [usuarios, setUsuarios] = useState({});

    const [dniVisible, setDniVisible] = useState(true);
    const [infoVisible, setInfoVisible] = useState(true);
    const [contraVisible, setContraVisible] = useState(false);
    const [confButVisible, setConfButVisible] = useState(true);

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
      setUsuarios(respuesta.data.usuarios);
    }

    const salirVentanaModal = (e) => {
      cambiarEstado1(false);
      setValues({
        nombre_tipo_evento : '',
      });
      setErrors({});
    }

    const buscarContraseña = async (e) => {

      const validationErrors = {};

      if(values.contraseña !== values.contraseña_encontrada){
        validationErrors.contraseña = "Contraseña incorrecta"
      }
      setErrors(validationErrors);

      if(Object.keys(validationErrors).length === 0){
        let url = `http://127.0.0.1:8000/api/get-user-by-dni/${values.ci}`
        const respuesta = await axios.get(url);
        console.log(respuesta)
        cambiarDatosCoach(respuesta.data.nombre_usuario, respuesta.data.apellido_usuario, values.ci);
        let datos_Coach = {}
        cookies.set('nombre_usuario', respuesta.data.nombre_usuario, {path: "/"});
        cookies.set('apellido_usuario', respuesta.data.apellido_usuario, {path: "/"});

        datos_Coach["nombre_coach"] = respuesta.data.nombre_usuario
        datos_Coach["apellido_coach"] = respuesta.data.apellido_usuario
        datos_Coach["dni_coach"] = values.ci
        cookies.set('id_usuario', respuesta.data.id_usuario, {path: "/"});
        cookies.set('se_Registro', true, {path: "/"});
        cookies.set('datos_Coach', datos_Coach, {path: "/"});
        cambiarEstado1(false);
      }
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        console.log("Prueba")

        if(!values.ci.trim()){
            validationErrors.ci = "Este campo es obligatorio"

        }else if (!/^[1-9][A-Za-z0-9.-]{4,14}$/.test(values.ci)) {
          validationErrors.ci =
            "Ingrese un documento de indentificación válido";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

          let nuevo_ci = values.ci;
          let seEncontro = 0;
          for (let index = 0; index < usuarios.length; index++) {
    
            let ci = usuarios[index].ci
    
            if(ci == nuevo_ci){
              seEncontro = 1;
              let url = `http://127.0.0.1:8000/api/get-user-by-dni/${nuevo_ci}`
              const respuesta = await axios.get(url);
              cookies.set('id_usuario', respuesta.data.id_usuario, {path: "/"});
              setValues({
                ...values,
                nombre_usuario: respuesta.data.nombre_usuario,
                apellido_usuario: respuesta.data.apellido_usuario,
                ci_encontrado: nuevo_ci,
                contraseña_encontrada: respuesta.data.contraseña_usuario,
               });
              break;
            }
          }
    
          if(seEncontro === 0){
            cookies.set('ci_nuevo_usuario', nuevo_ci, {path: "/"});
            setValues({
              ...values,
              nombre_usuario: "",
              apellido_usuario: "",
              ci_encontrado: "",
             });
            cambiarEstadoModalRegistroUsuario(true);
          }
        }
    }

    const handleToggleVisibility = async () => {

      const validationErrors = {};
        console.log("Prueba")

        if(!values.ci.trim()){
            validationErrors.ci = "Este campo es obligatorio"

        }else if (!/^[1-9][A-Za-z0-9.-]{4,14}$/.test(values.ci)) {
          validationErrors.ci =
            "Ingrese un documento de indentificacion valido";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
          let nuevo_ci = values.ci;
          let seEncontro = 0;
          for (let index = 0; index < usuarios.length; index++) {
    
            let ci = usuarios[index].ci
    
            if(ci == nuevo_ci){
              seEncontro = 1;
              let url = `http://127.0.0.1:8000/api/get-user-by-dni/${nuevo_ci}`
              const respuesta = await axios.get(url);
              cookies.set('id_usuario', respuesta.data.id_usuario, {path: "/"});
              cookies.set('nombre_usuario', respuesta.data.nombre_usuario, {path: "/"});
              cookies.set('apellido_usuario', respuesta.data.apellido_usuario, {path: "/"});
              setValues({
                ...values,
                nombre_usuario: respuesta.data.nombre_usuario,
                apellido_usuario: respuesta.data.apellido_usuario,
                ci_encontrado: nuevo_ci,
                contraseña_encontrada: respuesta.data.contraseña_usuario,
               });
              setDniVisible(!dniVisible);
              setContraVisible(!contraVisible);
              setConfButVisible(!confButVisible);
              break;
            }
          }
    
          if(seEncontro === 0){
            cookies.set('ci_nuevo_usuario', nuevo_ci, {path: "/"});
            
            cambiarEstadoModalRegistroUsuario(true);
          }
        }
      
    };

    return (
        estado1 && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Autentificación</h1>
                  </div>
                </div>
                <div className="registroTipoEvento">
                  <div  className='contentForm'>
                    <form onSubmit={saveTypeEvent} id="form1" className='formUserVerif'>

                    {dniVisible && <div><p id="textoCuadroAtributo">DNI</p>
                    <input
                    id="input"
                    className="inputEvento"
                    type="text"
                    name="ci"
                    placeholder="Ingrese su DNI"
                    onChange={handleInput}
                    />

                    {errors.ci && (
                    <span className="span1Modal">
                    {errors.ci}
                    </span>
                    )}
                    </div>
                    }
                    {infoVisible && <div className='contenUserVerif'>
                      <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                      <div className='infoUserVerif'>
                        <h3 className='nombreUserVerif'>{`${values.nombre_usuario} ${values.apellido_usuario}`}</h3>
                        <h4 className='dniUserVerif'>{values.ci_encontrado}</h4>
                      </div>
                    </div>
                    }
                    {contraVisible && <div>
                    <p id="textoCuadroAtributo">Contraseña</p>
                        <input
                        type="password"
                        name="contraseña"
                        className="inputEvento"
                        placeholder="Ingrese su contraseña"
                        onChange={handleInput}
                        />
                        </div>
                        }
                        </form>
                      </div>
                        {errors.contraseña && (
                        <span className="span1Modal">{errors.contraseña}</span>
                        )}
              {dniVisible && <button form="form1" type="submit" onClick={saveTypeEvent} className="BotonRegistrar">
                Buscar DNI
              </button>}
              {infoVisible && confButVisible && <button type="button" onClick={handleToggleVisibility} className="BotonRegistrar">
                Confirmar
              </button>}
              {contraVisible && <button form="form1" type="button" onClick={buscarContraseña} className="BotonRegistrar">
                Acceder
              </button>}
              </div>
              </div>
        </div>
        )
    );
}

export default ModalAutentificacion; 