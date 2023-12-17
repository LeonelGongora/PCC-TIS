import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';
import ModalActividad from '../ModalWindows/ModalActividad';
import {URL_API} from '../../const';

const cookies = new Cookies();

function Actividades({estadoActividades, cambiarEstadoActividades, actividades}){

  const id = cookies.get('ultimo_id_evento');
  const organizadores_agregar = cookies.get('organizadores_agregar');
  const organizadores_eliminar = cookies.get('organizadores_eliminar');
  const patrocinadores_agregar = cookies.get('patrocinadores_agregar');
  const patrocinadores_eliminar = cookies.get('patrocinadores_eliminar');

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;

    const [values, setValues] = useState({
      estadoModalActividad: false,

      estadoModal: true,
      estadoRegistroUsuario: false
    })
    
    const cambiarEstadoModalActividad = (nuevoEstado) => {
      setValues({ estadoModalActividad: nuevoEstado });
    }

    const eliminarActividad = async (id, nombreacti) => {
      
      //noti
      var esE = '';
      if (cookies.get('esEditar') != undefined){esE = cookies.get('esEditar')}
      if (cookies.get('esEditar') == true){

        const url_notificacion = `${URL_API}/notifications`;
        const url_eventnotificacion= `${URL_API}/eventnotifications`;
        var ide= cookies.get('ultimo_id_evento');
        // if(id_evento_Aux){
        //   ide= id_evento_Aux;
        //   cookies.remove('id_evento');
        // }else{
        //   ide= id_evento;
        // }
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
      }
      //fin noti

      console.log(id)
      const url = `http://127.0.0.1:8000/api/delete-activity/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
      
    }

    const terminarRegistro = () => {

      if(organizadores_agregar){
        const url_Organizador_agregar = `${URL_API}/add-event_organizer`; 
        
        for (let index = 0; index < organizadores_agregar.length; index++) {
          const data = new FormData();
          let organizador = organizadores_agregar[index];
          data.append("organizador", organizador);
          data.append("evento", id);

          axios.post(url_Organizador_agregar, data).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
            }
          });
        }

        cookies.remove("organizadores_agregar");
      }
      

      if(organizadores_eliminar){
        const url_Organizador_eliminar = `${URL_API}/delete-event_organizer`;

        for (let index = 0;index < organizadores_eliminar.length; index++) {
          const data = new FormData();
          let organizador = organizadores_eliminar[index];
          data.append("organizador", organizador);
          data.append("evento", id);

          axios.post(url_Organizador_eliminar, data).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              }
            });
        }
        cookies.remove("organizadores_eliminar");
      }
      const url_Patrocinador_eliminar = `${URL_API}/delete-event_sponsor`; 

      if(patrocinadores_agregar){
        const url_Patrocinador_agregar = `${URL_API}/add-event_sponsor`; 
        
        for (let index = 0; index < patrocinadores_agregar.length; index++) {
          const data = new FormData();
          let organizador = organizadores_agregar[index];
          data.append("patrocinador", organizador);
          data.append("evento", id);

          axios.post(url_Patrocinador_agregar, data).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
            }
          });
        }

        cookies.remove("organizadores_agregar");
      }

      window.location.href = "./home-admin";

    }

    return (
        estadoActividades && (
          <>
          <ModalActividad
            estadoActividad={values.estadoModalActividad}
            cambiarEstadoModalActividad={cambiarEstadoModalActividad}
            id_evento={id} 
          />
          
          <div className='tituloCampos'>
            <h2>Actividades</h2>
            <div className='seccionCampo'>
              
                {actividades.map((actividad) => ( 
                <>
                <div className='seccionesExtraActividad'>
                  <h3>{actividad.nombre_actividad}</h3><div className="campo-cont actividad-cont">
                    <div id="entradaEveNex">
                      <p id="textoCuadro">Descripción*</p>
                      <textarea
                        name="contenido_anuncio"
                        className="inputRequisitoOp"
                        rows={2}
                        cols={20}
                        placeholder={actividad.descripcion_actividad}
                        readOnly />
                    </div>
                    <div className='fechasActividadModif'>
                      <div className='cuadroFechasActModif'>
                        <div className='fechaActModif'>
                          <h4>Fecha inicio</h4>
                          <p>{actividad.fecha_inicio_actividad}</p>
                        </div>
                        <div className='fechaActModif'>
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

              
              <div className='contenedorBotonCampo'>
                <button
                  className="botonAgregarCampo"
                  type="button"
                  onClick={() =>
                    cambiarEstadoModalActividad(!values.estadoModalActividad)
                  }
                >
                  Agregar Actividad +
                </button>
              </div>
            </div>
        </div>
        <div className='contBotonRegist'>
            <button className='botonesCambiar botonTerminarFix'
            onClick={terminarRegistro}
            >
              Terminar Registro
            </button>
        </div>
        </>
        )

    );
}

export default Actividades;