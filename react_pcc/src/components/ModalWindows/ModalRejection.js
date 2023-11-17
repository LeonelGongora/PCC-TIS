import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />



function ModalRejection({estadoRejection, cambiarEstadoModalRejection, id_evento, id_user}){

    const [values, setValues] = useState({
        razon_rechazo : "",

    });

    const [errors, setErrors] = useState({});

    const salirVentanaModal = (e) => {
        cambiarEstadoModalRejection(false);
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
        estadoRejection && (
            <div className="Overlay">
              <div className="ContenedorModal contRej">
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
                <div className="registroTipoEvento reqCont">
                    <form onSubmit={saveTypeEvent} id="form1" className='reqForm'>
                        <label>
                            <input type='checkbox' defaultChecked={true} className='reqCheckbox'/>
                                Requisito numero 1
                        </label>
                        <label>
                            <input type='checkbox' defaultChecked={true} className='reqCheckbox'/>
                                Requisito numero 1 ksjhfnksjdfh skdjfhsdf sdfsdf sdfsdf asdasdad asasa asdasdasd asdasdaqweqwe asdasdqwe
                        </label>
                        <label>
                            <input type='checkbox' defaultChecked={true} className='reqCheckbox'/>
                                Requisito numero 1 ksjhfnksjdfh skdjfhsdf sdfsdf sdfsdf asdasdad asasa asdasdasd asdasdaqweqwe asdasdqwe Requisito numero 1 ksjhfnksjdfh skdjfhsdf sdfsdf sdfsdf asdasdad asasa asdasdasd asdasdaqweqwe asdasdqwe
                        </label>
                        <div className='extraInfo'>
                            <p id="textoCuadroAtributo">Añadir información</p>
                            <input
                            type="text"
                            name="razónRechazo"
                            className="inputMasInfo"
                            placeholder="Mayor informacion del rechazo"
                            />
                        </div>
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