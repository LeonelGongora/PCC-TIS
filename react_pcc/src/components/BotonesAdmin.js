import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/BotonesAdminStyles.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';



function BotonesAdmin({estado1,cambiarEstado1}){

    const onClick = () => {
        console.log('Click!');
        window.location.href='./add-event';
      }
    
    return(
        <div className='contenedorNoticias'>
            <div className='contBotones'>
                <div className='buttonAdmin' onClick={onClick} role='button'>
                    <FontAwesomeIcon className='buttonIcon' icon={faCalendarCheck} />
                    <h1>Crear Evento</h1>
                </div>
                <div className='buttonAdmin' onClick={() => cambiarEstado1(!estado1)} >
                    <FontAwesomeIcon className='buttonIcon' icon={faCalendarCheck} />
                    <h1>Crear Tipo De Evento</h1>
                </div>
            </div>
        </div>
    )
}

export default BotonesAdmin;