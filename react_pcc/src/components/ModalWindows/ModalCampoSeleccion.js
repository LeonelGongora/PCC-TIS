import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalCampoSeleccion({estadoCampoSeleccion, cambiarEstadoCampoSeleccion, id_evento, atributos}){

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
        cambiarEstadoCampoSeleccion(false);
        setValues({
            nombre_atributo : '',
        });
        setErrors({});
    }

    const agregarOpcion = (e) => {
        let parent = document.getElementById("form1");

        let input = document.createElement("input");
        //x.setAttribute("type", "text");
        input.type = "text";
        input.name="nombre_atributo";
        input.className="inputEvento";
        input.placeholder="Ingrese nombre";
        input.id="opcion"
        parent.appendChild(input);
        //container.appendChild(input); // put it into the DOM
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        document.querySelectorAll("#opcion").forEach(opcion =>{
            console.log(opcion.value)
        })

        const validationErrors = {};

        if(!values.nombre_atributo.trim()){
            validationErrors.nombre_atributo = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(values.nombre_atributo)){
            validationErrors.nombre_atributo = "Ingrese un nombre valido"
        }else{
            for (let index = 0; index < atributos.length; index++) {

                let atributo = atributos[index].nombre_atributo.trim()
                let nuevo_atributo = values.nombre_atributo.trim()

                if(atributo === nuevo_atributo){
                    validationErrors.nombre_atributo = "Ya existe un atributo con este nombre"
                    break;
                }
            }
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('nombre_atributo', values.nombre_atributo)
            data.append('tipo_dato_atributo', "date" )
            data.append('event_id', id_evento)

            const res = await axios.post('http://127.0.0.1:8000/api/add-attribute', data);
            
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
                    <h1>Añadir campo de seleccion</h1>
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

                        <p id="textoCuadroAtributo">Opciones*</p>
                        <input
                            type="text"
                            id="opcion"
                            name="nombre_atributo"
                            className="inputEvento"
                            placeholder="Ingrese nombre"
                            onChange={handleInput}
                        />
                        {errors.nombre_atributo && (
                        <span className="span1Modal">{errors.nombre_atributo}</span>
                        )}

                        <button
                        className="BotonRegistrar"
                        type="button"
                        onClick={agregarOpcion}
                        >
                           +
                        </button>

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

export default ModalCampoSeleccion; 