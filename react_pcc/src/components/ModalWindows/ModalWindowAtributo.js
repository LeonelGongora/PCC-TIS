import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {URL_API} from '../../const';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindowAtributo({estadoAtributo, cambiarEstadoModalAtributo, id_evento, atributos}){

    const id_evento_Aux = cookies.get('id_evento');

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

    const salirVentanaModal = (e) => {
        cambiarEstadoModalAtributo(false);
        setValues({
            nombre_atributo : '',
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        console.log(atributos);
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_atributo.trim()){
            validationErrors.nombre_atributo = "Este campo es obligatorio"

        } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(values.nombre_atributo)){
            validationErrors.nombre_atributo = "Ingrese un nombre valido"
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

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('nombre_atributo', values.nombre_atributo)
            data.append('tipo_dato_atributo', "text")
            
            if(id_evento_Aux){
                data.append('event_id', id_evento_Aux)
                cookies.remove('id_evento');
            }else{
                data.append('event_id', id_evento)
            }  

            const res = await axios.post(`${URL_API}/add-attribute`, data);
            
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    nombre_atributo : '',
                });
                window.location.reload();
            }
        }
    }

    return (
        estadoAtributo && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Añadir campo de texto</h1>
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
                        Agregar
                    </button>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalWindowAtributo; 