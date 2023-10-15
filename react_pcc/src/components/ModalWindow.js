import React from  'react';
import '../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindow({estado1, cambiarEstado1}) {
    return (
        estado1 && (
            <div className='Overlay'>
            <div className='ContenedorModal'>
                <div className='EncabezadoModal'>
                    <div className='tituloEvento'><h1 id='textoTipoEvent' >Tipo de evento</h1></div>
                    <button onClick={() => cambiarEstado1(false)} className='BotonSalir'>{salir}</button>
                </div>
                <div className='registroModal'>
                    <input className='inputEvento' placeholder='Ingrese nombre'></input>
                    <button className='BotonRegistrar'>Registrar</button>
                </div>
            </div>
            </div>   
        )
    );
}

export default ModalWindow; 


