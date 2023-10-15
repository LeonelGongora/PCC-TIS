import React from 'react';
import "../stylesheets/Boton.css"

function Boton({ texto, esBotonDeRegistro, manejarClic }){
    return(
      <button id='botonRegistrarRai'
        className={ esBotonDeRegistro ? 'boton-registro' : 'boton-subirArchivo' }
        onClick={ manejarClic }>
        {texto}
      </button>
    )
}

export default Boton;