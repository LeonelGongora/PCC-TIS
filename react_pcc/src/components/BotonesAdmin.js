import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/BotonesAdminStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

function BotonesAdmin(){
    return(
        <div className='contenedorNoticias'>
            <div className='contBotones'>
                <div className='buttonAdmin'>
                    <FontAwesomeIcon className='buttonIcon' icon={faCalendarCheck} />
                    <h1>Nuevo Evento</h1>
                </div>
                <div className='buttonAdmin'>
                    <FontAwesomeIcon className='buttonIcon' icon={faCalendarCheck} />
                    <h1>Nuevo Tipo De Evento</h1>
                </div>
            </div>
        </div>
    )
}

export default BotonesAdmin;