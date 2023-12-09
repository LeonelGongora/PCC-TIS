import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';
import ModalActividad from '../ModalWindows/ModalActividad';

const cookies = new Cookies();

function Actividades({estadoActividades, cambiarEstadoActividades, actividades}){

  const id = cookies.get('ultimo_id_evento');

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;

    const [values, setValues] = useState({
      estadoModalActividad: false,

      estadoModal: true,
      estadoRegistroUsuario: false
    })
    
    const cambiarEstadoModalActividad = (nuevoEstado) => {
      setValues({ estadoModalActividad: nuevoEstado });
    }

    const eliminarActividad = (id) => {
      console.log(id)
      /* 
      console.log(id)
      const url = `http://127.0.0.1:8000/api/delete-attribute/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
      */
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
              <div className='seccionesExtraActividad'>
                {actividades.map((actividad) => ( 
                <>
                  <h3>{actividad.nombre_actividad}</h3><div className="campo-cont actividad-cont">
                    <div id="entradaEveNex">
                      <p id="textoCuadro">Descripción*</p>
                      <textarea
                        name="contenido_anuncio"
                        className="inputRequisitoOp"
                        rows={2}
                        cols={20}
                        placeholder={actividad.nombre_actividad}
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
                      onClick={() => eliminarActividad(actividad.id)}
                    >
                      {cancelar}
                    </button>
                  </div>
                  </>
                ))} 

              </div>
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
          </div></>)

    );
}

export default Actividades;