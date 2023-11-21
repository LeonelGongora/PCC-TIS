import React , { useState, useRef, useEffect } from 'react';
import '../stylesheets/Formulario.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import ModalWarning from './ModalWindows/ModalWarning';
import ModalAutentificacionEquipos from './ModalWindows/ModalAutentificacionEquipos';

import ModalAutentificacion from './ModalWindows/ModalAutentificacion';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoUsuario_Api_Url = configApi.EVENTO_USUARIO_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

function FormRegistroEvento_Equipos(){

  const id_evento = cookies.get('id_evento');
  const participantes_equipo = cookies.get('participantes_equipo');
  

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

  const [values, setValues] = useState({
    nombre_equipo : ""
  });

  const [formData, setFormData] = useState({
    estadoModal: true,
    estadoModalEquipos :false,
  });

  const [showModal, setShowModal] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState('');
  const [errors, setErrors] = useState({});

  const registrar = async(e) => {

    e.preventDefault();
    const validationErrors = {};

    if (archivo.name) {
      
      if (!archivo.name.endsWith('.zip')) {
        validationErrors.imagen = "Debe subir un archivo .zi";
        setErrorArchivo('Debe subir un archivo .zip');
        setShowModal(true);
      } else if (archivo.size > 10485760) {
        validationErrors.imagen = "Su archivo excede el tamaño máximo";
        setErrorArchivo('Su archivo excede el tamaño máximo');
        setShowModal(true);
      }
      //else if (!archivo.file && mostrarRequisitos)
    } else {
      setErrorArchivo('Debe subir un archivo .zip');
      validationErrors.imagen = "Debe subir un archivo .zip";
      setShowModal(true);
    } 

    if (!values.nombre_equipo.trim()) {
      validationErrors.nombre_equipo = "Este campo es obligatorio";
    } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(values.nombre_equipo)) {
      validationErrors.nombre_equipo = "Ingrese un numero de equipo valido";
    }

    document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(evento =>{
      if(!evento.value.trim()){
        validationErrors[evento.name] = "Este campo es obligatorio";
      }
    })

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){
      
      document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(evento =>{
        participantes_dni_Aux.push(evento.value)
      })

      const data = new FormData();

      data.append('nombre_equipo', values.nombre_equipo)
      data.append('event_id', id_evento)

      let id_equipo = 0;
      const res = await axios.post('http://127.0.0.1:8000/api/add-team', data);
      if(res.data.status === 200){
        id_equipo = res.data.ultimo_id_equipo
        cookies.set('id_equipo', id_equipo, {path: "/"});
      }

      console.log(id_equipo)

      let dni_registrados = []
      let id_registrados = []

      let dni_no_registrados = []

      usuarios.forEach(usuario => {
        dni_registrados.push(usuario.ci)
        id_registrados.push(usuario.id)
      });

      for (let i = 0; i < participantes_dni_Aux.length; i++) {

        const indice = dni_registrados.indexOf(parseInt(participantes_dni_Aux[i])); 

        if(dni_registrados.includes(parseInt(participantes_dni_Aux[i]))){

          console.log("DNI REGISTRADO")
          const data = new FormData();
          
          data.append('team_id', id_equipo)
          data.append('user_id', id_registrados[indice])

          const res = await axios.post('http://127.0.0.1:8000/api/add-team_user', data);
          if(res.data.status === 200){
            console.log(res)
          }
        }else{
          console.log("DNI NO REGISTRADO")
          dni_no_registrados.push(participantes_dni_Aux[i])
        }
        cookies.set('dni_no_registrados', dni_no_registrados, {path: "/"});
        cambiarEstadoModalEquipos(!formData.estadoModalEquipos)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values, [name]: value
    })
  }

  const [archivo, setArchivo] = useState('');
  const [event, setEvent] = useState ( [] );
  const [usuarios, setUsuarios] = useState({})
  const [numero_participantes, setNumero_participantes] = useState ( [] );
  const participantes_dni_Aux = []

  
  useEffect(()=>{
    getEvent();
    generar_Campos_Dni();
    getUsuarios();
  }, [])


  const generar_Campos_Dni=async()=>{
    for (let i = 0; i < participantes_equipo; i++) {
      setNumero_participantes(current => [...current, i+1]);
    }
  }

  const getUsuarios=async()=>{
    let url = "http://127.0.0.1:8000/api/get-user-information"
    const respuesta = await axios.get(url);
    setUsuarios(respuesta.data.usuarios);
  }

  const getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${id_evento}`;
      const response = await axios.get(url)
      setEvent(response.data)
  }

  const cambiarEstadoModal = (nuevoEstado) => {
    setFormData({ estadoModal: nuevoEstado });
  }

  const cambiarEstadoModalEquipos = (nuevoEstado) => {
    setFormData({ estadoModalEquipos: nuevoEstado });
  }

  return(
    <div className='containerForm'>
      <ModalAutentificacion
        estado1={formData.estadoModal}
        cambiarEstado1={cambiarEstadoModal}
      />

      <ModalAutentificacionEquipos
        estadoEquipos={formData.estadoModalEquipos}
        cambiarEstadoModalEquipos={cambiarEstadoModalEquipos}
      />
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
          className="input-Formulario-Registro-Eventox"
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
      <div className='registro'>
        <form className="form_name" id='form_name'>

          <div className='datoNombre' id='entrada-Formulario-Registro-Evento' tabIndex='0'>
            <p id="textoCuadro">Nombre de Equipo</p>
            <input
            id="input"
            className="input-Formulario-Registro-Eventox"
            type="text"
            name= "nombre_equipo"
            placeholder="Ingrese el nombre del equipo"
            onChange={handleChange}
            />
          </div>
          {errors.nombre_equipo && (
          <span className="advertencia">
            {errors.nombre_equipo}
          </span>
          )}

          {numero_participantes.map((participante_numero) => {
          return (<>
          <div className='datoNombre' id='entrada-Formulario-Registro-Evento' tabIndex='0'>
            <p id="textoCuadro">Participante No {participante_numero}</p>
            <input
            id="input"
            className="input-Formulario-Registro-Evento"
            type="text"
            name= {participante_numero}
            placeholder="Ingrese nombre"
            />
          </div>
          {errors[participante_numero] && (
          <span className="advertencia">
            {errors[participante_numero]}
          </span>
          )}
          </>);
          })}

        </form>
      </div>
      <Boton
        texto='Registrarse'
        esBotonDeRegistro={true}
        manejarClic={registrar}/>
        {showModal && <ModalWarning estado1={showModal} cambiarEstado1={setShowModal} errorMessage={errorArchivo} />} {}
    </div>
  )
}
export default FormRegistroEvento_Equipos;
