import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUser } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';
import {URL_API} from '../../const';

const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalAutentificacion({estado1, cambiarEstado1, cambiarEstadoModalRegistroUsuario}){

    
    const [values, setValues] = useState({
      ci : "",
      ci_encontrado: "",
      nombre_usuario: "",
      apellido_usuario: "",
      contraseña: "",
      contraseña_encontrada: "",
      id_usuario: "",
    });

    const [errors, setErrors] = useState({});
    const [usuarios, setUsuarios] = useState({});

    const [dniVisible, setDniVisible] = useState(true);
    const [contraVisible, setContraVisible] = useState(false);

    const [infoVisible, setInfoVisible] = useState(false);

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
      let url = `${URL_API}/get-user-information`
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
      console.log(values)

      if(Object.keys(validationErrors).length === 0){
        
        //let url = `http://127.0.0.1:8000/api/get-user-by-dni/${values.ci}`
        //const respuesta = await axios.get(url);
        //console.log(respuesta)
        //cambiarDatosCoach(respuesta.data.nombre_usuario, respuesta.data.apellido_usuario, values.ci);
        cookies.set('nombre_usuario',values.nombre_usuario, {path: "/"});
        cookies.set('apellido_usuario', values.apellido_usuario, {path: "/"});
        cookies.set('id_usuario', values.id_usuario, {path: "/"});
        cookies.set('ci_nuevo_usuario', values.ci, {path: "/"});
        cookies.set('se_Registro', true, {path: "/"});
        cambiarEstado1(false);
        window.location.reload();
      }
    }

    const handleToggleVisibility = async () => {

      const validationErrors = {};
        console.log("Prueba")

        if(!values.ci.trim()){
            validationErrors.ci = "Este campo es obligatorio"

        }else if (!/^[1-9][A-Za-z0-9.-]{4,14}$/.test(values.ci)) {
          validationErrors.ci ="Ingrese un documento de identificación válido";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
          let nuevo_ci = values.ci;
          let seEncontro = 0;
          for (let index = 0; index < usuarios.length; index++) {
    
            let ci = usuarios[index].ci
    
            if(ci == nuevo_ci){
              seEncontro = 1;
              let url = `${URL_API}/get-user-by-dni/${nuevo_ci}`
              const respuesta = await axios.get(url);

              setValues({
                ...values,
                nombre_usuario: respuesta.data.nombre_usuario,
                apellido_usuario: respuesta.data.apellido_usuario,
                ci_encontrado: nuevo_ci,
                contraseña_encontrada: respuesta.data.contraseña_usuario,
                id_usuario: respuesta.data.id_usuario
               });
              setDniVisible(!dniVisible);
              setContraVisible(!contraVisible);
              setInfoVisible(!contraVisible);
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
                    <form onSubmit={handleToggleVisibility} id="form1" className='formUserVerif'>

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
                    <span className="span1Modal">{errors.ci}</span>
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

              {dniVisible && <button type="button" onClick={handleToggleVisibility} className="BotonRegistrar">
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