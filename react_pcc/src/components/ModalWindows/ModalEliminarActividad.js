import React, {useState, useEffect} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import {URL_API} from '../../const';
import configApi from '../../configApi/configApi';

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const salir = <FontAwesomeIcon icon={faCircleXmark} />
const subir = <FontAwesomeIcon icon={faArrowUpFromBracket} />
const cookies = new Cookies();

function ModalEliminarActividad({estadoActividad, cambiarEstadoModalActividad}){

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;

    const id_evento = cookies.get('id_evento');
    const actividades = cookies.get('actividades');
    
    
    const [values, setValues] = useState({
        nombre_actividad : "",
        fecha_inicio_actividad : "",
        fecha_fin_actividad : "",
        descripcion_actividad : "",
    });

    //const [actividades, setActividades] = useState({});

    useEffect(()=>{
        //getActividades();
    }, []);

    const salirVentanaModal = (e) => {
        cambiarEstadoModalActividad(false);
    }

    const getActividades = async (e) => {
        //const url = `${Eventos_Api_Url}/${id_evento}`;
        //const response = await axios.get(url)
        //setActividades(response.data.activities)
    }

    const eliminarActividad = async(id, nombreacti) => {

        //noti

        const url_notificacion = `${URL_API}/notifications`;
        const url_eventnotificacion= `${URL_API}/eventnotifications`;
        var ide= id_evento;

        const url_event= `${URL_API}/eventos/${ide}`;
        const event = await axios.get(url_event)
        const contenido = `El evento: ${event.data.nombre_evento}, ha eliminado la siguiente actividad: ${nombreacti}`

        const response = await axios.post(url_notificacion, {
          contenido: contenido,
          informacion: null,
          leido: 0
        })
        await axios.post(url_eventnotificacion, {
          notification_id: response.data.id,
          event_id: ide
        })
        
        //fin noti
        console.log(id)
        const url = `${URL_API}/delete-activity/${id}`; 
        axios.delete(url).then(res => {
          if(res.data.status === 200){
            console.log(res);
            window.location.reload();
          }
        })
    }

    return (
      estadoActividad && (
        <div className="Overlay">
          <div className="ContenedorModal ContenedorModalActividades">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Eliminar Actividad</h1>
              </div>

              <button className="BotonSalir" onClick={salirVentanaModal}>
                {salir}
              </button>
            </div>

            <div className="seccionCampo">
              { actividades.length === 0 ? (
                <h2 className='noHayActividades'>No hay actividades en este evento</h2>
              ) : ( <div className='seccionesDivExtra'>
                {actividades.map((actividad) => (
                  <>
                  <div className="seccionesExtraActividad">
                    <h3>{actividad.nombre_actividad}</h3>
                    <div className="campo-cont actividad-cont">
                      <div id="entradaEveNex">
                        <p id="textoCuadro">Descripción*</p>
                        <textarea
                          name="contenido_anuncio"
                          className="inputRequisitoOp"
                          rows={2}
                          cols={20}
                          placeholder={actividad.descripcion_actividad}
                          readOnly
                        />
                      </div>
                      <div className="fechasActividadModif">
                        <div className="cuadroFechasActModif">
                          <div className="fechaActModif">
                            <h4>Fecha inicio</h4>
                            <p>{actividad.fecha_inicio_actividad}</p>
                          </div>
                          <div className="fechaActModif">
                            <h4>Fecha fin</h4>
                            <p>{actividad.fecha_fin_actividad}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="botonEliminarCampo botonEliminarActividad"
                        type="button"
                        onClick={() => eliminarActividad(actividad.id, actividad.nombre_actividad)}
                      >
                        {cancelar}
                      </button>
                    </div>
                  </div>
                  </>
                ))}
                </div>
                )}
            </div>
          </div>
        </div>
      )
    );
}

export default ModalEliminarActividad; 