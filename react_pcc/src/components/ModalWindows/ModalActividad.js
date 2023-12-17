import React, {useState, useEffect} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import {URL_API} from '../../const';

const salir = <FontAwesomeIcon icon={faCircleXmark} />
const subir = <FontAwesomeIcon icon={faArrowUpFromBracket} />
const cookies = new Cookies();

function ModalActividad({estadoActividad, cambiarEstadoModalActividad, id_evento}){

    const id_evento_Aux = cookies.get('id_evento');
    
    const [values, setValues] = useState({
        nombre_actividad : "",
        fecha_inicio_actividad : "",
        fecha_fin_actividad : "",
        descripcion_actividad : "",
    });

    const [errors, setErrors] = useState({});

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
        console.log(id_evento_Aux)

        const validationErrors = {};

        if(!values.nombre_actividad.trim()){
            validationErrors.nombre_actividad = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(values.nombre_actividad)){
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
        } else if (!/^[A-Za-záéíóúñÑ][ :;.,\-\A-Za-z0-9áéíóúñÑ]{9,250}$/.test(values.descripcion_actividad)) {
            validationErrors.descripcion_actividad = "Ingrese una descripción válida";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            //noti
            var esE = '';
            if (cookies.get('esEditar') != undefined){esE = cookies.get('esEditar')}
            if (cookies.get('esEditar') == true){

              const url_notificacion = `${URL_API}/notifications`;
              const url_eventnotificacion= `${URL_API}/eventnotifications`;
              var ide= '';
              if(id_evento_Aux){
                ide= id_evento_Aux;
                cookies.remove('id_evento');
              }else{
                ide= id_evento;
              }
              const url_event= `${URL_API}/eventos/${ide}`;
              const event = await axios.get(url_event)
              const contenido = `El evento: ${event.data.nombre_evento}, ha registrado la siguiente actividad: ${values.nombre_actividad}`

              const response = await axios.post(url_notificacion, {
                contenido: contenido,
                informacion: null,
                leido: 0
              })
              await axios.post(url_eventnotificacion, {
                notification_id: response.data.id,
                event_id: ide
              })
            }
            //fin noti

            const data = new FormData();
            data.append('nombre_actividad', values.nombre_actividad)
            data.append('fecha_inicio_actividad', values.fecha_inicio_actividad)
            data.append('fecha_fin_actividad', values.fecha_fin_actividad)
            data.append('descripcion_actividad', values.descripcion_actividad)
            if(id_evento_Aux){
                data.append('event_id', id_evento_Aux)
                cookies.remove('id_evento');
            }else{
                data.append('event_id', id_evento)
            }
            

            const res = await axios.post(`${URL_API}/add-activity`, data);
            
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

              <button className="BotonSalir" onClick={salirVentanaModal}>
                {salir}
              </button>
            </div>
            <div className="registroTipoEvento registroActividadEvento">
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
                  <span className="span1Modal">
                    {errors.fecha_inicio_actividad}
                  </span>
                )}

                <p id="textoCuadroAtributo">Fecha de fin*</p>
                <input
                  type="date"
                  name="fecha_fin_actividad"
                  className="inputEvento"
                  onChange={handleInput}
                />
                {errors.fecha_fin_actividad && (
                  <span className="span1Modal">
                    {errors.fecha_fin_actividad}
                  </span>
                )}

                <p id="textoCuadroAtributo">Descripcion</p>
                <textarea
                  name="descripcion_actividad"
                  className="inputMasInfo"
                  placeholder="Ingrese descripcion"
                  rows={2}
                  onChange={handleInput}
                  
                />
                {errors.descripcion_actividad && (
                  <span className="span1Modal">
                    {errors.descripcion_actividad}
                  </span>
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