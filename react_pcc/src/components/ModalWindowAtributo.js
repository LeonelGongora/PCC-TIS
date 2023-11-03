import React, {useState} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';



const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindowAtributo({estadoAtributo, cambiarEstadoModalAtributo, id_evento}){

    const [values, setValues] = useState({
        nombre_atributo : "",

    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_atributo.trim()){
            validationErrors.nombre_atributo = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,58}[A-Za-zÑñáéíóú]$/.test(values.nombre_atributo)){
            validationErrors.nombre_atributo = "Ingrese un nombre valido"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('nombre_atributo', values.nombre_atributo)
            data.append('event_id', id_evento)

            const res = await axios.post('http://127.0.0.1:8000/api/add-attribute', data);
            
            if(res.data.status === 200){
                console.log(res);
            }
        }
    }

    return (
        estadoAtributo && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Añadir Atributo a Evento</h1>
                  </div>
                  <button
                    onClick={() => cambiarEstadoModalAtributo(false)}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">

                        <input
                        type="text"
                        name="nombre_atributo"
                        className="inputEvento"
                        placeholder="Ingrese nombre"
                        onChange={handleInput}
                        />
                        {errors.nombre_atributo && (
                        <span className="span1Modal">{errors.nombre_atributo}</span>
                        )}

                    </form>
                    <button form="form1" type="submit" className="BotonRegistrar">
                        Registrar
                    </button>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalWindowAtributo; 