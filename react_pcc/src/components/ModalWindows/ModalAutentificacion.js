import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUser } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalAutentificacion({estado1, cambiarEstado1, cambiarEstadoModalRegistroUsuario}){

    
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
    const [infoVisible, setInfoVisible] = useState(false);
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

    const prueba = (e) => {
      setInfoVisible(true);
    }

    const buscarContraseña = (e) => {
      const validationErrors = {};
      if(values.contraseña !== values.contraseña_encontrada){
        validationErrors.contraseña = "Contraseña incorrecta"
      }
      setErrors(validationErrors);

      if(Object.keys(validationErrors).length === 0){
        cambiarEstado1(false);
      }

    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.ci.trim()){
            validationErrors.ci = "Este campo es obligatorio"

        }else if(!/^(?!-)[1-9][0-9]{6,8}$/.test(values.ci)){
            validationErrors.ci = "Ingrese un documento de indentificacion valido"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

          let nuevo_ci = values.ci;
          let seEncontro = 0;
          for (let index = 0; index < usuarios.length; index++) {
    
            let ci = usuarios[index].ci
    
            if(ci == nuevo_ci){
              setInfoVisible(true);
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
            console.log("No se encontro")
            cookies.set('ci_nuevo_usuario', nuevo_ci, {path: "/"});
            cambiarEstadoModalRegistroUsuario(true);
            //cambiarEstado1(false);
          }
        }
    }

    const handleToggleVisibility = async () => {
     
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
              {dniVisible && <button form="form1" type="submit" onClick={prueba} className="BotonRegistrar">
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