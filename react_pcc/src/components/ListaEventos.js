import React from 'react';
import "../stylesheets/ListaEventosStyles.css";

function ListaEventos(){
    return(
        <div>
            <div className='containerLista'>
                <h1 className='imgList'>Afiche</h1>
                <h1 className='nombList rec'>Nombre</h1>
                <h1 className='tipoList rec'>Tipo De Evento</h1>
                <h1 className='fechIniList rec'>Fecha de Inicio</h1>
                <h1 className='fechFinList'>Modalidad</h1>
            </div>

        </div>

    )
}

export default ListaEventos;