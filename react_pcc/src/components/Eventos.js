import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/EventosStyles.css";

function Eventos(){
    return(
        <div className='containerEvents'>
            <img className='imageEvent' src = {require('../images/Csharp.png')} alt='Logo del evento'/>
            <h4 className='nombreEvento'>Taller de capacitacion sobre el Lenguaje C</h4>
            <h4 className='tipoEv'>Taller de entrenamiento</h4>
            <h4>25-09-2023</h4>
            <h4>25-10-2023</h4>
        </div>
    )
}

export default Eventos;