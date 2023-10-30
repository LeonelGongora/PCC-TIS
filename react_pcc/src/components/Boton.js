import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../stylesheets/Boton.css"

function Boton({ texto, esBotonDeRegistro, manejarClic, icono }){
  return(
    <button id='botonRegistroRai'
      className={ esBotonDeRegistro ? 'boton-registro' : 'boton-subirArchivo' }
      onClick={ manejarClic }>
      {texto}
      {' '}{icono && <FontAwesomeIcon icon={icono} />}
    </button>
  )
}

export default Boton;