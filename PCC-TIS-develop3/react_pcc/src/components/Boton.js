import React from 'react';
import ReactDOM from 'react-dom';

function Boton({ texto, esBotonDeRegistro, manejarClic }){
    return(
      <button 
        className={ esBotonDeRegistro ? 'boton-registro' : 'boton-subirArchivo' }
        onClick={ manejarClic }>
        {texto}
      </button>
    )
}

export default Boton;