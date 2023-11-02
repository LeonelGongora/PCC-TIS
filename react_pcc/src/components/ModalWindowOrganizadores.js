import React, {useState} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';



const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindowOrganizadores({estadoOrganizador, cambiarEstadoModalOrganizador}){

    
    const [values, setValues] = useState({
        nombre_organizador : "",
        imagen_organizador : ""

    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            imagen_organizador: e.target.files[0]
          });

    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_organizador.trim()){
            validationErrors.nombre_organizador = "Este campo es obligatorio es requerido"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,58}[A-Za-zÑñáéíóú]$/.test(values.nombre_organizador)){
            validationErrors.nombre_organizador = "Ingrese un nombre valido"
        }

        if(!values.imagen_organizador.name){
            validationErrors.imagen_organizador = "Debe subir una imagen"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('nombre_organizador', values.nombre_organizador)
            data.append('imagen_organizador', values.imagen_organizador)

            const res = await axios.post('http://127.0.0.1:8000/api/add-organizador', data);
            
            if(res.data.status === 200){
                console.log(res);
            }
        }
    }

    return (
        estadoOrganizador && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Registrar Organizador</h1>
                  </div>
                  <button
                    onClick={() => cambiarEstadoModalOrganizador(false)}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">
                        <input
                        type="text"
                        name="nombre_organizador"
                        className="inputEvento"
                        placeholder="Ingrese nombre"
                        onChange={handleInput}
                        />
                        {errors.nombre_organizador && (
                        <span className="span1Modal">{errors.nombre_organizador}</span>
                        )}


                      <p id="textoCuadro">Imagen*</p>
                      <input
                        type="file"
                        name="imagen_organizador"
                        onChange={handleChange}
                        className="inputEvento"
                      />
 
                        {errors.imagen_organizador && (
                            <span className="advertencia">
                            {errors.imagen_organizador}
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

export default ModalWindowOrganizadores; 