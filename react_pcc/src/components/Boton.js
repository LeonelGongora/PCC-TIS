import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asegúrate de importar FontAwesome aquí

function Boton({ texto, esBotonDeRegistro, manejarClic, icono }){
    return(
      <button 
        className={ esBotonDeRegistro ? 'boton-registro' : 'boton-subirArchivo' }
        onClick={ manejarClic }>
        {texto}
        {' '}{icono && <FontAwesomeIcon icon={icono} />}
      </button>
    )
}

export default Boton;