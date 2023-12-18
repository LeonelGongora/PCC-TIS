import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {URL_API} from '../../const';


const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindow({estado1, cambiarEstado1}){

    
    const [values, setValues] = useState({
        nombre_tipo_evento : "",
    });

    const [errors, setErrors] = useState({});
    const [tipo_eventos, setTipo_eventos] = useState([]);

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
    }

    useEffect(()=>{
      getTipos_Evento();
    }, []);

    const getTipos_Evento = async (e) => {
      const url = `${URL_API}/type-events`; 
      const respuesta = await axios.get(url);
      setTipo_eventos(respuesta.data.events);
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

        if(!values.nombre_tipo_evento.trim()){
            validationErrors.nombre_tipo_evento = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,58}[A-Za-zÑñáéíóú]$/.test(values.nombre_tipo_evento)){
            validationErrors.nombre_tipo_evento = "Ingrese un nombre válido"
        }else{
          for (let index = 0; index < tipo_eventos.length; index++) {

            let tipo_evento = tipo_eventos[index].nombre_tipo_evento.trim()
            let nuevo_tipo_evento = values.nombre_tipo_evento.trim()

            if(tipo_evento === nuevo_tipo_evento){
                validationErrors.nombre_tipo_evento = "Ya existe un tipo de evento con este nombre"
                break;
            }
          } 
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            const res = await axios.post(`${URL_API}/add-event_type`, values);
            if(res.data.status === 200){
                console.log(values.nombre_tipo_evento);
                setValues({
                  nombre_tipo_evento : '',
                });
                window.location.reload();
            }
        }

    }

    return (
        estado1 && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Crear tipo de evento</h1>
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
                        name="nombre_tipo_evento"
                        className="inputEvento"
                        placeholder="Ingrese nombre"
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

export default ModalWindow; 