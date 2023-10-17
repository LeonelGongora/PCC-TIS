import React, {useState} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';


const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindow({estado1, cambiarEstado1}){

    
    const [values, setValues] = useState({
        nombre_tipo_evento : "",
    });

    const [errors, setErrors] = useState({});

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

        if(!values.nombre_tipo_evento.trim()){
            validationErrors.nombre_tipo_evento = "Este campo es obligatorio es requerido"

        }else if(!/^\S[A-Z|a-z|Ñ|ñ|áéíóú|\s]{3,60}\S$/.test(values.nombre_tipo_evento)){
            validationErrors.nombre_tipo_evento = "Ingrese un nombre valido"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            const res = await axios.post('http://127.0.0.1:8000/api/add-event_type', values);
            if(res.data.status === 200){
                console.log(values.nombre_tipo_evento);
            }
        }

        
    }

    return (
        estado1 && (
            <div className='Overlay'>
            <div className='ContenedorModal'>
                <div className='EncabezadoModal'>
                    <div className='tituloEvento'><h1>Tipo de evento</h1></div>
                    <button onClick={() => cambiarEstado1(false)} className='BotonSalir'>{salir}</button>
                </div>
                <div className='registro'>
                    <form onSubmit={saveTypeEvent} id="form1">
                        <input type="text" 
                        name="nombre_tipo_evento" 
                        className='inputEvento' 
                        placeholder='Ingrese nombre'
                        onChange={handleInput}
                        />
                        {errors.nombre_tipo_evento && <span className='span1'>{errors.nombre_tipo_evento}</span>}
                    </form>
                    
                </div>
                <div className='registro'>
                    <button form="form1" type="submit" className='BotonRegistrar'>Registrar</button>
                </div>
                
                
            </div>
            </div>
        )
    );
}

export default ModalWindow; 