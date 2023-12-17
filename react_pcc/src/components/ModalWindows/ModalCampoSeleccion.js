import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import {URL_API} from '../../const';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const salir = <FontAwesomeIcon icon={faCircleXmark} />
const plus = <FontAwesomeIcon icon={faSquarePlus} size="lg" style={{color: "#000000",}} />

function ModalCampoSeleccion({estadoCampoSeleccion, cambiarEstadoCampoSeleccion, id_evento, atributos}){

  const id_evento_Aux = cookies.get('id_evento');

    const [values, setValues] = useState({
        nombre_atributo : ""
    });

    const [nombre_variable, setNombreVariable] = useState("1")

    const [errors, setErrors] = useState({});

    const [opciones, setOpciones] = useState([]);

    const [numero, setNumero] = useState(1);

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
        
    }

    const salirVentanaModal = (e) => {
        cambiarEstadoCampoSeleccion(false);
        setValues({
            nombre_atributo : '',
        });
        setOpciones([])
        setErrors({});
    }

    const agregarOpcion = (e) => {

        let nombre_actual = nombre_variable;
        let nombre_nuevo = nombre_actual + "1"
        setNombreVariable(nombre_nuevo)

        let diccionario = {}
        diccionario["name"] = nombre_variable;

        let opciones_actuales = opciones;
        opciones_actuales.push(diccionario);
        console.log(id_evento)
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_atributo.trim()){
            validationErrors.nombre_atributo = "Este campo es obligatorio"

        } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(values.nombre_atributo)){
            validationErrors.nombre_atributo = "Ingrese un nombre valido"
        }else{
            /* 
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

        document.querySelectorAll("#opcion").forEach(opcion =>{
            if(!opcion.value.trim()){
                validationErrors[opcion.name] = "Este campo es obligatorio"
            } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(opcion.value)){
                validationErrors[opcion.name] = "Ingrese un nombre válido"
            }
        })

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            let restriccion = []

            document.querySelectorAll("#opcion").forEach(opcion =>{
                restriccion.push(opcion.value)
            })
            
            let restriccionString = restriccion.toString()

            const data = new FormData();

            data.append('nombre_atributo', values.nombre_atributo)
            data.append('tipo_dato_atributo', "select" )
            data.append('restriccion', restriccionString)

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
      estadoCampoSeleccion && (
          <div className="Overlay">
            <div className="ContenedorModal">
              <div className="EncabezadoModal">
                <div className="tituloEvento">
                  <h1>Añadir campo de opciones</h1>
                </div>
                <button onClick={salirVentanaModal} className="BotonSalir">
                  {salir}
                </button>
              </div>
              <div className="registroTipoEvento registroCampoSeleccion">
                <form onSubmit={saveTypeEvent} id="form1" className='camposSeleccionForm'>
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

                  <p id="textoCuadroAtributo">Opciones*</p>
                  <input
                    type="text"
                    id="opcion"
                    name="opcion"
                    className="inputEvento"
                    placeholder="Ingrese opcion"
                  />
                  {errors.opcion && (
                    <span className="span1Modal">{errors.opcion}</span>
                  )}

                  {opciones.map((opcion) => {
                    return (
                      <>
                        <p id="textoCuadroAtributo">Opcion*</p>
                        <input
                          type="text"
                          id="opcion"
                          name={opcion.name}
                          className="inputEvento"
                          placeholder="Ingrese opcion"
                        />
                        {errors[opcion.name] && (
                          <span className="span1Modal">
                            {errors[opcion.name]}
                          </span>
                        )}
                      </>
                    );
                  })}

                  
                </form>
                <button
                    className="BotonRegistrar"
                    type="button"
                    onClick={agregarOpcion}
                  >
                    {plus}
                  </button>
                <button form="form1" type="submit" className="BotonRegistrar">
                  Agregar
                </button>
              </div>
            </div>
          </div>
      )
    );
}

export default ModalCampoSeleccion; 