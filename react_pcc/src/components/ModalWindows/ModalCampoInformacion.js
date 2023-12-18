import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {URL_API} from '../../const';

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalCampoInformacion({estadoCampoInformacion, cambiarEstadoCampoInformacion, id_evento, atributos}){

    const [values, setValues] = useState({
        nombre_informacion : "",
        contenido_informacion : "",

    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value,
        });
    }

    const salirVentanaModal = (e) => {
        cambiarEstadoCampoInformacion(false);
        setValues({
            nombre_informacion : '',
            contenido_informacion : "",
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_informacion.trim()){
            validationErrors.nombre_informacion = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(values.nombre_informacion)){
            validationErrors.nombre_informacion = "Ingrese un nombre valido"
        }else{/* 
            for (let index = 0; index < atributos.length; index++) {

                let atributo = atributos[index].nombre_atributo.trim()
                let nuevo_atributo = values.nombre_atributo.trim()

                if(atributo === nuevo_atributo){
                    validationErrors.nombre_atributo = "Ya existe un atributo con este nombre"
                    break;
                }
            }
            */
        }

        if(!values.contenido_informacion.trim()){
            validationErrors.contenido_informacion = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(values.contenido_informacion)){
            validationErrors.contenido_informacion = "Ingrese un nombre valido"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('nombre_informacion', values.nombre_informacion)
            data.append('contenido_informacion', values.contenido_informacion)
            data.append('event_id', id_evento)

            const res = await axios.post(`${URL_API}/add-information`, data);
            
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    nombre_informacion : '',
                    contenido_informacion : "",
                });
                window.location.reload();
            }
        }
    }

    return (
        estadoCampoInformacion && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Añadir campo de información</h1>
                  </div>
                  <button
                    onClick={salirVentanaModal}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">
                        <p id="textoCuadroAtributo">Nombre*</p>
                        <input
                            type="text"
                            name="nombre_informacion"
                            className="inputEvento"
                            placeholder="Ingrese un nombre"
                            onChange={handleInput}
                        />
                        {errors.nombre_informacion && (
                        <span className="span1Modal">{errors.nombre_informacion}</span>
                        )}

                        <p id="textoCuadroAtributo"></p>
                        <textarea
                            type="text"
                            name="contenido_informacion"
                            className="inputEvento"
                            placeholder="Ingrese el contenido"
                            onChange={handleInput}
                        />
                        {errors.contenido_informacion && (
                        <span className="span1Modal">{errors.contenido_informacion}</span>
                        )}

                    </form>
                    <button form="form1" type="submit" className="BotonRegistrar">
                        Agregar
                    </button>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalCampoInformacion; 