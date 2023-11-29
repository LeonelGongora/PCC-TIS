import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUser } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalContraseñas({estadoContraseña, cambiarEstadoContraseña}){

    const contraseñas_generadas = cookies.get('contraseñas_generadas');

    const [values, setValues] = useState({
      ci : "",
      nombre_usuario: "",
      apellido_usuario: "",
      ci_encontrado: "",
      contraseña: "",
      contraseña_encontrada: "",
    });

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
      //setUsuarios(respuesta.data.usuarios);
    }

    const salirVentanaModal = (e) => {
      cambiarEstadoContraseña(false);
      setValues({
        nombre_tipo_evento : '',
      });
      //setErrors({});
    }

    const buscarContraseña = async (e) => {
        console.log(contraseñas_generadas)
    }

    return (
        estadoContraseña && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Autentificación</h1>
                  </div>
                </div>
                <div className="registroTipoEvento">
                  <div  className='contentForm'>
                    <form onSubmit={buscarContraseña} id="form1" className='formUserVerif'>

                    <div className='contenUserVerif'>
                      <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                      <div className='infoUserVerif'>
                        <h3 className='nombreUserVerif'></h3>
                        <h4 className='dniUserVerif'></h4>
                      </div>
                    </div>
                    <button form="form1" type="button" onClick={buscarContraseña} className="BotonRegistrar">
                        Acceder
                    </button>
                </form>
                      </div>
              </div>
              </div>
        </div>
        )
    );
}

export default ModalContraseñas; 