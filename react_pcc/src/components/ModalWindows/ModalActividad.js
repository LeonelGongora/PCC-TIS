import React, {useState, useEffect} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';


const salir = <FontAwesomeIcon icon={faCircleXmark} />
const subir = <FontAwesomeIcon icon={faArrowUpFromBracket} />

function ModalActividad({estadoActividad, cambiarEstadoModalActividad, id_evento}){

    
    const [values, setValues] = useState({
        nombre_actividad : "",
        fecha_inicio_actividad : "",
        fecha_fin_actividad : "",
        descripcion_actividad : "",
    });

    const [errors, setErrors] = useState({});
    const [organizadores, setOrganizadores] = useState([]);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value,
        });
    }

    useEffect(()=>{
        //getOrganizadores();
    }, []);

    const getOrganizadores = async (e) => {
        //const url = "http://127.0.0.1:8000/api/get-organizador"; 
        //const respuesta = await axios.get(url);
        //setOrganizadores(respuesta.data.organizadores);
    }

    const salirVentanaModal = (e) => {
        cambiarEstadoModalActividad(false);
        setValues({
            nombre_actividad : "",
            fecha_inicio_actividad : "",
            fecha_fin_actividad : "",
            descripcion_actividad : "",
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_actividad.trim()){
            validationErrors.nombre_actividad = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(values.nombre_actividad)){
            validationErrors.nombre_actividad = "Ingrese un nombre valido"
        }else{
            /* 
            for (let index = 0; index < organizadores.length; index++) {

                let organizador = organizadores[index].nombre_organizador.trim()
                let nuevo_organizador = values.nombre_organizador.trim()

                if(organizador === nuevo_organizador){
                    validationErrors.nombre_organizador = "Ya existe un organizador con este nombre"
                    break;
                }
            }
            */
        }

        if (!values.fecha_inicio_actividad.trim()) {

            validationErrors.fecha_inicio_actividad = "Este campo es obligatorio";
        } else {
            /* 
            
            let d2 = new Date(this.state.fecha_limite);
            d2.setDate(d2.getDate() + 1);
            d2.setUTCHours(0, 0, 0, 0);
      
            let date_Actual1 = new Date();
            date_Actual1.setDate(date_Actual1.getDate() + 1);
            date_Actual1.setUTCHours(0, 0, 0, 0);
      
            let fecha1 = d2.getTime();
            let fecha2 = date_Actual1.getTime();
            if (fecha1 < fecha2) {
              validationErrors.fecha_limite = "Esta fecha no es válida";
            }
            */
        }

        if (!values.fecha_fin_actividad.trim()) {
            validationErrors.fecha_fin_actividad = "Este campo es obligatorio";
        } else {
            /* 
            let d2 = new Date(this.state.fecha_fin);
            d2.setDate(d2.getDate() + 1);
            d2.setUTCHours(0, 0, 0, 0);
      
            let date_Actual1 = new Date();
            date_Actual1.setDate(date_Actual1.getDate() + 1);
            date_Actual1.setUTCHours(0, 0, 0, 0);
      
            let fecha1 = d2.getTime();
            let fecha2 = date_Actual1.getTime();
            if (fecha1 < fecha2) {
              validationErrors.fecha_fin = "Esta fecha no es válida";
            }
            */
        }

        if (!values.descripcion_actividad.trim()) {
            validationErrors.descripcion_actividad = "Este campo es obligatorio";
        } else if (!/^[ :;.,\-\A-Za-z0-9áéíóúñÑ]{3,60}$/.test(values.descripcion_actividad)) {
            validationErrors.descripcion_actividad = "Ingrese una descripción válida";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            console.log(values.nombre_actividad)
            console.log(values.fecha_inicio_actividad)
            console.log(values.fecha_fin_actividad)
            console.log(values.descripcion_actividad)
            console.log(id_evento)

            const data = new FormData();
            data.append('nombre_actividad', values.nombre_actividad)
            data.append('fecha_inicio_actividad', values.fecha_inicio_actividad)
            data.append('fecha_fin_actividad', values.fecha_fin_actividad)
            data.append('descripcion_actividad', values.descripcion_actividad)
            data.append('event_id', id_evento)

            const res = await axios.post('http://127.0.0.1:8000/api/add-activity', data);
            
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    nombre_actividad : '',
                    fecha_inicio_actividad : "",
                    fecha_fin_actividad : "",
                    descripcion_actividad : "",
                });
                window.location.reload();
            }
        }
    }

    return (
        estadoActividad && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Registrar Actividad</h1>
                  </div>

                  <button className="BotonSalir"
                  onClick={salirVentanaModal}>
                    {salir}
                  </button>

                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">

                        <p id="textoCuadroAtributo">Nombre de Actividad*</p>
                        <input
                            type="text"
                            name="nombre_actividad"
                            className="inputEvento"
                            placeholder="Ingrese nombre"
                            onChange={handleInput}
                        />
                        {errors.nombre_actividad && (
                        <span className="span1Modal">{errors.nombre_actividad}</span>
                        )}

                        <p id="textoCuadroAtributo">Fecha de inicio*</p>
                        <input
                            type="date"
                            name="fecha_inicio_actividad"
                            className="inputEvento"
                            onChange={handleInput}
                        />
                        {errors.fecha_inicio_actividad && (
                        <span className="span1Modal">{errors.fecha_inicio_actividad}</span>
                        )}

                        <p id="textoCuadroAtributo">Fecha de fin*</p>
                        <input
                            type="date"
                            name="fecha_fin_actividad"
                            className="inputEvento"
                            onChange={handleInput}
                        />
                        {errors.fecha_fin_actividad && (
                        <span className="span1Modal">{errors.fecha_fin_actividad}</span>
                        )}

                        <p id="textoCuadroAtributo">Descripcion</p>
                        <input
                            type="text"
                            name="descripcion_actividad"
                            className="inputEvento"
                            placeholder="Ingrese descripcion"
                            onChange={handleInput}
                        />
                        {errors.descripcion_actividad && (
                        <span className="span1Modal">{errors.descripcion_actividad}</span>
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

export default ModalActividad; 