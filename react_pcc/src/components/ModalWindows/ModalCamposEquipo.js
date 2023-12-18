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

function ModalCamposEquipo({estadoActividad, cambiarEstadoModalActividad, id_evento}){

    const campos_evento = cookies.get('campos_evento');
    
    const [values, setValues] = useState({
        nombre_actividad: ''
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
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(input =>{
      
          if(input.type != "file"){
    
            if(!input.value.trim() || input.value === "Seleccione una opción"){
              validationErrors[input.name] = "Este campo es obligatorio";
            }else{
              if(input.type == "number"){
                if(input.id){
                  let restriccion_id = input.id;
                  const limites = restriccion_id.split(",");
        
                  let minimo = parseInt(limites[0])
                  let maximo = parseInt(limites[1])
    
                  let valor_actual = parseInt(input.value);
    
                  if(!(valor_actual >= minimo && valor_actual <= maximo)){
                    validationErrors[input.name] = "El número no se encuentra en el rango requerido: " + limites[0] + "-" + limites[1];
                  }else{
                  }
                }else{
                  if (!/^(0|[1-9]\d*)$/.test(input.value)) {
                    validationErrors[input.name] = "Ingrese un número positivo o el número cero";
                  }
                }
    
        
              }else if(input.type  == "select"){
        
              }else if(input.type  == "date"){
        
              }else{
              }
            }
          }
        })   

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
          console.log("Sin errores")

          /*
          const data = new FormData();
          data.append('nombre_actividad', values.nombre_actividad)
          data.append('fecha_inicio_actividad', values.fecha_inicio_actividad)
          data.append('fecha_fin_actividad', values.fecha_fin_actividad)
          data.append('descripcion_actividad', values.descripcion_actividad)
           */
        }
    }

    return (
      estadoActividad && (
        <div className="Overlay">
          <div className="ContenedorModal">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Evento Campos</h1>
              </div>

              <button className="BotonSalir" onClick={salirVentanaModal}>
                {salir}
              </button>
            </div>
            <div className="registroTipoEvento registroActividadEvento">
              <form onSubmit={saveTypeEvent} id="form1">
                {campos_evento.map((atributo, id) => {
                  return (
                    <>
                      {atributo.esSelect ? (
                        <div className="desplegable-Formulario">
                          <p id="textoCuadro">{atributo.nombre_atributo}</p>
                          <select
                            id="desplegable"
                            className="input-Formulario-Registro-Evento"
                            name={atributo.nombre_atributo}
                          >
                            <option disabled selected>
                              Seleccione una opcion
                            </option>
                            {atributo.restriccion.map((evento, id) => {
                              return <option>{evento}</option>;
                            })}
                          </select>
                          {errors[atributo.nombre_atributo] && (
                            <span className="advertencia">
                              {errors[atributo.nombre_atributo]}
                            </span>
                          )}
                        </div>
                      ) : (
                        <>
                          <div
                            className="datoNombre"
                            id="entrada-Formulario-Registro-Evento"
                            tabIndex="0"
                          >
                            <p id="textoCuadro">{atributo.nombre_atributo}</p>
                            <input
                              id={atributo.restriccion}
                              className="input-Formulario-Registro-Evento"
                              type={atributo.tipo_dato_atributo}
                              name={atributo.nombre_atributo}
                              placeholder="Ingrese nombre"
                              restriccion={atributo.restriccion}
                            />
                          </div>
                          {errors[atributo.nombre_atributo] && (
                            <span className="advertencia">
                              {errors[atributo.nombre_atributo]}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  );
                })}
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

export default ModalCamposEquipo; 