import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/TipoDeEventoStyles.css";

function TipoDeEvento(props){
    return(
        <div>
            <button className='tipoEvento'>
                {props.nombre}
            </button>
        </div>
    )
}

export default TipoDeEvento;