import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/ListaEventosStyles.css";

function ListaEventos(){
    return(
        <div>
            <div className='containerLista'>
                <h1 className='imgList'>Imagen</h1>
                <h1 className='nombList'>Nombre</h1>
                <h1 className='tipoList'>Tipo De Evento</h1>
                <h1 className='fechIniList'>Fecha de Inicio</h1>
                <h1 className='fechFinList'>Fecha de Fin</h1>
            </div>
            
        </div>
        
    )
}

export default ListaEventos;