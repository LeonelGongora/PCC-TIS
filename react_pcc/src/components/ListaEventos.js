import React from 'react';
import "../stylesheets/ListaEventosStyles.css";

function ListaEventos(){
    return(
        <div>
            <div className='containerLista'>
                <h1 className='imgList'>Afiche</h1>
                <h1 className='nombList rec'>Nombre</h1>
                <h1 className='tipoList rec'>Tipo De Evento</h1>
                <h1 className='fechIniList rec'>Fecha Limite</h1>
                <h1 className='fechFinList'>Fecha Fin</h1>
            </div>

        </div>

    )
}

export default ListaEventos;