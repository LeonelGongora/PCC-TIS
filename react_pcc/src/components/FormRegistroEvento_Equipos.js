import React , { useState, useRef, useEffect } from 'react';
import '../stylesheets/FormularioEquipo.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import ModalWarning from './ModalWindows/ModalWarning';

import ModalAutentificacion from './ModalWindows/ModalAutentificacion';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoUsuario_Api_Url = configApi.EVENTO_USUARIO_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

function FormRegistroEvento_Equipos(){

  const id_usuario = cookies.get('id_usuario');
  const archivoInput = useRef(null);
  const [mostrarRequisitos, setRequisitos] = useState(true);// Para mostrar Requisitos

  const manejarCargaDeArchivo = (event) => {
    setArchivo(event.target.files[0]);
    var archivoAux = event.target.files[0];
    document.getElementById('nombreArchivo').textContent = `  ${archivoAux.name}`;
  };

  const subirArchivo = () => {
    archivoInput.current.click();
  }

  const [formData, setFormData] = useState({
    ci : '',
    estadoModal: true
  })

  const [showModal, setShowModal] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState('');
  const [errors, setErrors] = useState({});

  const registrar = async(e) => {

    e.preventDefault();
    const form = document.forms["form_name"].getElementsByTagName("input");
    const atributosInput= Array.from(form);
    
    const validationErrors = {};

    if (archivo.name) {
      
      if (!archivo.name.endsWith('.zip')) {
        validationErrors.imagen = "Debe subir un archivo .zi";
        setErrorArchivo('Debe subir un archivo .zip');
        setShowModal(true);
        console.log("No Zip")
      } else if (archivo.size > 10485760) {
        validationErrors.imagen = "Su archivo excede el tamaño máximo";
        setErrorArchivo('Su archivo excede el tamaño máximo');
        setShowModal(true);
        console.log("Tamaño")
      }
      //else if (!archivo.file && mostrarRequisitos)
    } else {
      setErrorArchivo('Debe subir un archivo .zip');
      validationErrors.imagen = "Debe subir un archivo .zip";
      console.log("Sin archivo")
      setShowModal(true);
    } 

    for (let i = 0; i < atributos.length; i++) {
      
      if(!atributosInput[i].value.trim()){
        validationErrors[atributosInput[i].name] = "Este campo es obligatorio";
      }
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){
      console.log(archivo.file)
      console.log(archivo)
      
      const fd = new FormData();
      fd.append('file', archivo);
      axios.post(Imagen_Api_Url, fd).then(response=>{ 
        var urli= response.data.urlimagen;

      axios.post(EventoUsuario_Api_Url, {
        event_id: idevento,
        user_id: id_usuario,
        requisitoZip: urli,
        solicitud : "0"
      })
      .then(response=>{
        window.location.href='./paginaRegistrarseEventos';
        console.log(response)
      })
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  const [archivo, setArchivo] = useState('');
  const [event, setEvent] = useState ( [] );
  const idevento = cookies.get('idauxiliar');
  const [atributos, setAtributos] = useState ( [] );

  useEffect(()=>{
    getEvent();
    console.log(id_usuario)
  }, [])

  const getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${idevento}`;
      const response = await axios.get(url)
      setEvent(response.data)
      setAtributos(response.data.attributes)
  }

  const cambiarEstadoModal = (nuevoEstado) => {
    setFormData({ estadoModal: nuevoEstado });
  }

  return(
    <div className='containerAll'>
      <h1>Competencia Universitaria</h1>
    <div className='containerForm'>
      {/* <ModalAutentificacion
        estado1={formData.estadoModal}
        cambiarEstado1={cambiarEstadoModal}
      /> */}
      <div className='header'>
        <h2 className='titulo-Formulario-Registro-Evento'>Registro de Equipo</h2>
      </div>
      <div className='containerRequisito'>  
        {mostrarRequisitos ? (
          <p>{event.requisitos}</p>
        ) : (
          <p>No se requiere subir ningún archivo o documento para registrarse a este evento.</p>
        )}
      </div>
      <div className='archivoZip'>
        {mostrarRequisitos && (
        <>
        <p> Archivo seleccionado:  </p>
        <span id="nombreArchivo"></span> {/* zip seleccionado */}  
        </>
        )}
      </div>
      <div className='botonesContainer'>
        {mostrarRequisitos && (
        <> 
        <input
          className="input-Formulario-Registro-Evento"
          id='archivoZip'
          type='file'
          accept='.zip'
          onChange={manejarCargaDeArchivo} //<- Para las validaciones y mensajes de advertencia
          style={{ display: 'none' }}
          ref={archivoInput}
        />
        <Boton
          texto='Requisitos'
          esBotonDeRegistro={false}
          manejarClic={subirArchivo} 
          icono={faArrowUpFromBracket}/>
        <button className="buttonInfo">
              ?
        <span className="textoInfo">Toda la información requerida debe estar comprimida en un archivo .ZIP y subirlo en este apartado</span>
        </button>
        </>
        )}
      </div>
      <div className='registroEquipo'>
          <form className='formEquipo'>
            <div className='coach'>
              <p>Coach</p>
              <div className='camposCoach'>
                <p>Nombre del coach</p>
                <input
                id='input_registro_equipo'
                type='text'
                name='nameCoach'
                placeholder='Ingrese su nombre'/>
              </div>
              <div className='camposCoach'>
                <p>DNI del coach</p>
                <input
                id='input_registro_equipo'
                type='number'
                name='DNICoach'
                placeholder='Ingrese el DNI del coach'/>
              </div>
            </div>
            <div className='equipo'>
              <p className='tituloEquipo'>Equipo</p>
              <div className='camposEquipo'>
                <p>Nombre del equipo</p>
                <input
                id='input_registro_equipo'
                type='text'
                name='nameEquipo'
                placeholder='Ingrese el nombre del equipo'/>
              </div>
              <div className='camposEquipo'>
                <p>DNI participante</p>
                <input
                id='input_registro_equipo'
                type='number'
                name='DNIParticipante1'
                placeholder='Ingrese el DNI del participante 1 '/>
              </div>
              <div className='camposEquipo'>
                <p>DNI participante</p>
                <input
                id='input_registro_equipo'
                type='number'
                name='DNIParticipante2'
                placeholder='Ingrese el DNI del participante 2 '/>
              </div>
              <div className='camposEquipo'>
                <p>DNI participante</p>
                <input
                id='input_registro_equipo'
                type='number'
                name='DNIParticipante3'
                placeholder='Ingrese el DNI del participante 2 '/>
              </div>
              <div className='camposEquipo'>
                <p>DNI participante</p>
                <input
                id='input_registro_equipo'
                type='number'
                name='DNIParticipant4'
                placeholder='Ingrese el DNI del participante 2 '/>
              </div>
            </div>
          </form>
      </div>
      {/* <div className='registro'>
        <form class="form_name" id='form_name'>

          {atributos.map((atributo,id) => {
          return (<>
          <div className='datoNombre' id='entrada-Formulario-Registro-Evento' tabIndex='0'>
            <p id="textoCuadro">{atributo.nombre_atributo}</p>
            <input
            id="input"
            className="input-Formulario-Registro-Evento"
            type="text"
            name={atributo.nombre_atributo}
            placeholder="Ingrese nombre"
            />
          </div>
          {errors[atributo.nombre_atributo] && (
          <span className="advertencia">
            {errors[atributo.nombre_atributo]}
          </span>
          )}

          </>);
          })}

        </form>
      </div> */}
      <Boton
        texto='Registrarse'
        esBotonDeRegistro={true}
        manejarClic={registrar}/>
        {showModal && <ModalWarning estado1={showModal} cambiarEstado1={setShowModal} errorMessage={errorArchivo} />} {}
    </div>
    </div>
  )
}
export default FormRegistroEvento_Equipos;
