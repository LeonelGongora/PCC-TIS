import React , { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/Formulario.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import Pregunta from '../images/Pregunta.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';


function FormRegistroEvento(){

  const archivoInput = useRef(null);
  
  const manejarCargaDeArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      document.getElementById('nombreArchivo').textContent = `  ${archivo.name}`;
      console.log(' ', archivo.name);
    }
  };

  const subirArchivo = () => {
    archivoInput.current.click();
  }
  
  const [state, setState] = useState({
    nombre: '',
    requisito: '',
  });

  const [errorNombre, setErrorNombre] = useState('');
  const [errorRequisito, setErrorRequisito] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    if (name === 'nombre') {
      setErrorNombre('');
    } else if (name === 'requisito') {
      setErrorRequisito('');
    }
  };

  const registrar = () => {
    if (!state.nombre.trim()) {
      setErrorNombre('Este campo es obligatorio, no puede dejarlo vacío');
    }
    if (!state.requisito.trim()) {
      setErrorRequisito('Este campo es obligatorio, no puede dejarlo vacío');
    }
    if (state.nombre.trim() && state.requisito.trim()) {
      console.log('Registrarse');
    }
  }
    
  return(
    <div className='containerForm'>
      <div className='header'>
        <h2>Registro al evento</h2>
      </div>
      <div className='containerRequisito'>  
        <p>- Conocimiento básico del lenguaje c</p>
        <p>- Haber aprobado la materia de Elementos de Programación</p>
        <p>- Tener un promedio mayor a "60"</p>
      </div>
      <div className='archivoZip'>
        <p> Archivo seleccionado:  </p>
        <span id="nombreArchivo"></span> {/* zip seleccionado */}  
      </div>
      <div className='botonesContainer'> 
        <input
          id='archivoZip'
          type='file'
          accept='.zip'
          onChange={manejarCargaDeArchivo}
          style={{ display: 'none' }}
          ref={archivoInput}
        />
        <Boton
          texto='Requisitos'
          esBotonDeRegistro={false}
          manejarClic={subirArchivo}
          icono={faArrowUpFromBracket}
          />
        <img className='signoDePregunta' src={Pregunta} alt='Signo de interrogacion'/>
      </div>
      <div className='registro'>
        <div className='campoYError'>
          <div className='datoNombre' id='entrada' tabindex='0'>
            <p id='textoCuadro'>Nombre</p>
            <input id='input' type='text' name='nombre' value={state.nombre} onChange={handleChange} placeholder="Ingrese el nombre" />
            </div>
            {errorNombre && <p className="errorMensaje">{errorNombre}</p>}
        </div>

        <div className='campoYError'> 
          <div className='datoRequisito' id='entrada' tabindex='0'>
            <p id='textoCuadro'>Requisitos</p>
            <input id='input' type='text' name='requisito' value={state.requisito} onChange={handleChange} placeholder="Ingrese requisitos" />
          </div>
          {errorRequisito && <p className="errorMensaje">{errorRequisito}</p>}
        </div>  
      </div>
      <Boton
        texto='Registrarse'
        esBotonDeRegistro={true}
        manejarClic={registrar} /> 
    </div>
  )
}

export default FormRegistroEvento;