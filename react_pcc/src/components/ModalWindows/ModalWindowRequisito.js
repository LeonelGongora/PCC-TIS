import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindowRequisito({estadoAtributo, cambiarEstadoModalAtributo, id_evento, atributos}){

    const [values, setValues] = useState({
        contenido_requisito : "",

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
        cambiarEstadoModalAtributo(false);
        setValues({
            contenido_requisito : '',
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.contenido_requisito.trim()){
            validationErrors.contenido_requisito = "Este campo es obligatorio"

        }else if(!/^[ :;.,\-\A-Za-z0-9áéíóúñÑ]{3,150}$/.test(values.contenido_requisito)){
            validationErrors.contenido_requisito = "Ingrese un nombre valido"
        }

        //if(!this.state.requisitos.trim()){
            //validationErrors.requisitos = "Este campo es obligatorio"

        //}else if(!/^[ .,\-\A-Za-z0-9áéíóúñÑ]{3,150}$/.test(this.state.requisitos)){
            //validationErrors.requisitos = "Ingrese requisitos validos"
        //}

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('contenido_requisito', values.contenido_requisito)
            data.append('event_id', id_evento)

            const res = await axios.post('http://127.0.0.1:8000/api/add-requirement', data);
            
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    contenido_requisito : '',
                });
                window.location.reload();
            }
        }
    }

    return (
        estadoAtributo && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Añadir Requisito a Evento</h1>
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
                        name="contenido_requisito"
                        className="inputEvento"
                        placeholder="Ingrese un requisito"
                        onChange={handleInput}
                        />
                        {errors.contenido_requisito && (
                        <span className="span1Modal">{errors.contenido_requisito}</span>
                        )}

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

export default ModalWindowRequisito; 