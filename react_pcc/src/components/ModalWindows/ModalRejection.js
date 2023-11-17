import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />



function ModalRejection({estadoAtributo, cambiarEstadoModalAtributo, id_evento, atributos, id_user}){

    const [values, setValues] = useState({
        razon_rechazo : "",

    });

    const [errors, setErrors] = useState({});

    const salirVentanaModal = (e) => {
        cambiarEstadoModalAtributo(false);
        setValues({
            razon_rechazo : '',
        });
        setErrors({});
    }

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
    }
    
    const saveTypeEvent = async (e) => {
        console.log(atributos);
        e.preventDefault();
    
        const validationErrors = {};
    
        if(!values.razon_rechazo.trim()){
            validationErrors.razon_rechazo = "Este campo es obligatorio"
    
        }
    
        setErrors(validationErrors);
    
        if(Object.keys(validationErrors).length === 0){
    
            const data = new FormData();
    
            data.append('razon_rechazo', values.razon_rechazo)
            data.append('event_id', id_evento)
            data.append('user_id',id_user)
    
            const res = await axios.post('', data);
            
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    razon_rechazo : '',
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
                    <h1>Razón de rechazo</h1>
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
                        <p id="textoCuadroAtributo">Razón*</p>
                        <input
                        type="text"
                        name="razon_rechazo"
                        className="inputEvento"
                        placeholder="Ingrese razón de rechazo"
                        onChange={handleInput}
                        />
                        {errors.razon_rechazo && (
                        <span className="span1Modal">{errors.razon_rechazo}</span>
                        )}

                    </form>
                    <button form="form1" type="submit" className="BotonRegistrar">
                        Enviar
                    </button>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalRejection;