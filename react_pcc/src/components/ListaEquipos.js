import React from 'react';
import "../stylesheets/ListaEquiposStyle.css";

function ListaEquipos({ campos }){
    return(
        <div>
            <div className='containerListaP'>
            {campos.includes('img') && <h1 className='imgListP'>Foto</h1>}
            {campos.includes('nomb') && <h1 className='nombListP'>Nombre</h1>}
            {campos.includes('rol') && <h1 className='rolList'>Rol</h1>}
            {campos.includes('correo') && <h1 className='correo'>Correo</h1>}
            {campos.includes('dni') && <h1 className='dni'>DNI</h1>}
            </div>
        </div>

    )
}

export default ListaEquipos;