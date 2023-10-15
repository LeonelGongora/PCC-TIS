import React , { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/Formulario.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import Pregunta from '../images/Pregunta.png';


function FormRegistroEvento(){

  const archivoInput = useRef(null);

  const manejarCargaDeArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      console.log('Archivo ZIP seleccionado:', archivo.name);
    }
  };

  const subirArchivo = () => {
    archivoInput.current.click();
  }

  const [state, setState] = useState({
    nombre: '',
    requisito: '',
  });

  const [errorNombre, setErrorNombre] = useState(false); 
  const [errorRequisito, setErrorRequisito] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    setErrorNombre('');
  };

  const registrar = () => {
    const nombreError = !state.nombre.trim() ? 'Este campo es obligatorio, no puede dejarlo vacío' : '';
    const requisitoError = !state.requisito.trim() ? 'Este campo es obligatorio, no puede dejarlo vacío' : '';
    setErrorNombre(nombreError);
    setErrorRequisito(requisitoError);
    if (nombreError || requisitoError) {
      return;
    }
    console.log('Registrarse');
  }

  return(
    <div className='containerForm'>
      <div className='header'>
        <h2 className='titulo-Formulario-Registro-Evento'>Registro al evento</h2>
      </div>
      <div className='containerRequisito'>  
        <p>- Conocimiento básico del lenguaje c</p>
        <p>- Haber aprobado la materia de Elementos de Programación</p>
        <p>- Tener un promedio mayor a "60"</p>
      </div>
      <div className='botonesContainer'> 
        <input
          className="input-Formulario-Registro-Evento"
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
          manejarClic={subirArchivo} />
        <img className='signoDePregunta' src={Pregunta} alt='Signo de interrogacion'/>

      </div>
      <div className='registro'>
        <div className='entradasDatos'>
          <div className='datoNombre' id='entrada-Formulario-Registro-Evento' tabindex='0'>
            <p id='textoCuadro'>Nombre</p>
            <input className="input-Formulario-Registro-Evento" id='input' type='text' name='nombre' value={state.nombre} onChange={handleChange} placeholder="Ingrese el nombre" />
            <p className="errorMensaje">{errorNombre}</p>
          </div>
          <div className='datoRequisitos' id='entrada-Formulario-Registro-Evento' tabindex='0'>
            <p id='textoCuadro'>Requisitos</p>
            <input className="input-Formulario-Registro-Evento" id='input' type='text' name='requisito' value={state.requisito} onChange={handleChange} placeholder="Ingrese requisitos" />
            <p className="errorMensaje">{errorRequisito}</p>
          </div>
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
