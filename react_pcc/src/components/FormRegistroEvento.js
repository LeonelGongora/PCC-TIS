import React , { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/Formulario.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import Pregunta from '../images/Pregunta.png';

import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import ModalWarning from './ModalWarning';

const cookies = new Cookies();
const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoUsuario_Api_Url = configApi.EVENTO_USUARIO_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

function FormRegistroEvento(){

  const archivoInput = useRef(null);

  const manejarCargaDeArchivo = (event) => {
    setArchivo({file: event.target.files[0]})
    var archivo = event.target.files[0];
    if (archivo) {

      if (!archivo.name.endsWith('.zip')) {
      setErrorArchivo('Debe subir un archivo .zip');
      setShowModal(true); 
      setArchivo({file:null})
      archivo = '';
      console.log("Valor de 'requisito' actualizado a vacío:", archivo.name);
      document.getElementById('nombreArchivo').textContent = '';
      }else if (archivo.size > 10485760) {
        setErrorArchivo('Su archivo excede el tamaño máximo');
        setShowModal(true);
        setArchivo({file:null})
        archivo = '';
        console.log("Valor de 'requisito' actualizado a vacío:", archivo.name);
        document.getElementById('nombreArchivo').textContent = '';
      } else {
        setErrorArchivo(''); 
        document.getElementById('nombreArchivo').textContent = `  ${archivo.name}`;
        console.log(' ', archivo.name);
        setShowModal(false);
      }
   
  } else {
    setShowModal(false); 
  }
  };

  const subirArchivo = () => {
    archivoInput.current.click();
  }
  const [file, setRequisitoNull] = useState(null);

  const [state, setState] = useState({
    nombre: '',
    requisito: '',
  });

  const [errorNombre, setErrorNombre] = useState(false); 
  const [errorRequisito, setErrorRequisito] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    setErrorNombre('');
  };

  const registrar = async() => {
    const nombreError = !state.nombre.trim() ? 'Este campo es obligatorio, no puede dejarlo vacío' : '';
    // const requisitoError = !state.requisito.trim() ? 'Este campo es obligatorio, no puede dejarlo vacío' : '';
    setErrorNombre(nombreError);
    // setErrorRequisito(requisitoError);
    // if (nombreError || requisitoError) {
    if (nombreError) {
      return;
    }
    if (archivoInput.current && archivoInput.current.files.length === 0) {
      setErrorArchivo('Debe subir un archivo .zip');
      setShowModal(true);
    } else {
      setErrorArchivo(''); 
      setShowModal(false);
    }
    if (state.nombre.trim() && state.requisito.trim()) {
      console.log('Registrarse');//
    }
    
    if(archivo.file != null){


    // registro DB con usuario id=1
    const fd = new FormData();
    fd.append('file', archivo.file);
    axios.post(Imagen_Api_Url, fd)
    .then(response=>{ 
      var urli= response.data.urlimagen;

    axios.post(EventoUsuario_Api_Url, {
      event_id: idevento,
      user_id: idUsuario,
      requisitoZip: urli,
      TallaPolera: state.nombre
    })
    .then(response=>{
      window.location.href='./home-participant';
    })
    })
    }
  }
 
  //subida imagen
  const initialValues ={
    file:null,
    nombre: ''
  }
  const [archivo, setArchivo] = useState(initialValues);
  //fin subida imagen

  //
  const [event, setEvent] = useState ( [] );
  const idUsuario = '1';
  const idevento = cookies.get('idauxiliar');

  useEffect(()=>{
    getEvent()
  }, [])

  const getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${idevento}`;
      const response = await axios.get(url)
      setEvent(response.data)
      // console.log(response.data);
  }
  //
  return(
    <div className='containerForm'>
      <div className='header'>
        <h2 className='titulo-Formulario-Registro-Evento'>Registro al evento</h2>
      </div>
      <div className='containerRequisito'>  

        <p>{event.requisitos}</p>
        {}
      </div>
      <div className='archivoZip'>
        <p> Archivo seleccionado:  </p>
        <span id="nombreArchivo"></span> {/* zip seleccionado */}  

      </div>
      <div className='botonesContainer'> 
        <input
          className="input-Formulario-Registro-Evento"
          id='archivoZip'
          type='file'
          accept='.zip'
          // onChange={e=> setArchivo({file: e.target.files[0]})}
          onChange={manejarCargaDeArchivo} //<- Para las validaciones y mensajes de advertencia
          style={{ display: 'none' }}
          ref={archivoInput}
        />
        <Boton
          texto='Requisitos'
          esBotonDeRegistro={false}
          manejarClic={subirArchivo} 
          icono={faArrowUpFromBracket}/>
        {/* <img className='signoDePregunta' src={Pregunta} alt='Signo de interrogacion'/> */}
        <button className="buttonInfo">
              ?
        <span className="textoInfo">Toda la información requerida comprimir en un archivo Zip y subirlo en este apartado</span>
        </button>
      </div>
      <div className='registro'>
        <div className='entradasDatos'>
          <div className='datoNombre' id='entrada-Formulario-Registro-Evento' tabIndex='0'>
            <p id='textoCuadro'>Talla de Polera</p>
            <select className="input-Formulario-Registro-Evento" id='input' type='text' name='nombre' value={state.nombre} onChange={handleChange} placeholder="Ingrese la talla">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option></select>
            <p className="errorMensaje">{errorNombre}</p>
          </div>
          {/* <div className='datoRequisitos' id='entrada-Formulario-Registro-Evento' tabindex='0'>
            <p id='textoCuadro'>Requisitos</p>
            <input className="input-Formulario-Registro-Evento" id='input' type='text' name='requisito' value={state.requisito} onChange={handleChange} placeholder="Ingrese requisitos" />
            <p className="errorMensaje">{errorRequisito}</p>
          </div> */}
        </div>  
      </div>
      <Boton
        texto='Registrarse'
        esBotonDeRegistro={true}
        manejarClic={registrar}/>
        {showModal && <ModalWarning estado1={showModal} cambiarEstado1={setShowModal} errorMessage={errorArchivo} />} {}
    </div>
  )
}
export default FormRegistroEvento;
