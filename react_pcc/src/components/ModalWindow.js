import React from 'react';
import '../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';


const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindow({estado,cambiarEstado}){
    return (
            <div className='Overlay'>
            <div className='ContenedorModal'>
                <div className='EncabezadoModal'>
                    <div className='tituloEvento'><h1>Tipo de evento</h1></div>
                    <button onClick={()=> cambiarEstado(!estado)} className='BotonSalir'>{salir}</button>
                </div>
                <div className='registro'>
                    <input className='inputEvento' placeholder='Ingrese nombre'></input>
                    <button className='BotonRegistrar'>Registrar</button>
                </div>
                
            </div>
            </div>
    );
}

export default ModalWindow; 


