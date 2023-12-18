import React , { useState, useRef, useEffect } from 'react';
import '../stylesheets/FormularioEquipo.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import ModalWarning from './ModalWindows/ModalWarning';

import ModalRegistroEquipos from './ModalWindows/ModalRegistroEquipos';
import ModalAutentificacion from './ModalWindows/ModalAutentificacion';
import ModalWarningDNI from './ModalWindows/ModalWarningDNI';
import ModalRegistroUsuario from './ModalWindows/ModalRegistroUsuario';
import {URL_API} from '../const';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

function FormRegistroEvento_Equipos(){

  const id_evento = cookies.get('id_evento');
  const idu = cookies.get('id_usuario');
  const se_Registro = cookies.get('se_Registro');
  const participantes_equipo = cookies.get('participantes_equipo');
  const dni_coach = cookies.get('ci_nuevo_usuario');

  const archivoInput = useRef(null);
  //const [mostrarRequisitos, setMostrarRequisitos] = useState(true);// Para mostrar Requisitos
  const [mostrarRequisitos, setMostrarRequisitos] = useState(false);// Para mostrar Requisitos
  const [requisitos, setRequisitos] = useState([]);

  const manejarCargaDeArchivo = (event) => {
    setArchivo(event.target.files[0]);
    var archivoAux = event.target.files[0];
    document.getElementById('nombreArchivo').textContent = `  ${archivoAux.name}`;
  };

  const subirArchivo = () => {
    archivoInput.current.click();
  }

  const [values, setValues] = useState({
    nombre_equipo : "",
  });

  //const [dni_coach, setDniCoach] = useState("");

  const [formData, setFormData] = useState({
    estadoModal: true,
    estadoModalEquipos :false,
    estadoModalWarningDNI :false,
    estadoRegistroUsuario :false,
    estadoContraseña:false,
  });

  const [showModal, setShowModal] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState('');
  const [errors, setErrors] = useState({});

  const registrar = async(e) => {

    e.preventDefault();
    const validationErrors = {};
    let camposAdicionales = false
    if(event.attributes.length > 0 ){
      camposAdicionales = true
    }
    cookies.set('camposAdicionales', camposAdicionales, {path: "/"});
    
    let nombres_equipos_registrados = []
    let id_registrados = []

    for (let i = 0; i < event.teams.length; i++) {
      nombres_equipos_registrados.push(event.teams[i].nombre_equipo)

      for (let j = 0; j <  event.teams[i].users.length; j++) {
        id_registrados.push(event.teams[i].users[j].ci)
      }
    }

    if(mostrarRequisitos){
      if (archivo.name) {
        if (!archivo.name.endsWith('.zip')) {
          validationErrors.imagen = "Debe subir un archivo .zip";
          setErrorArchivo('Debe subir un archivo .zip');
          setShowModal(true);
        } else if (archivo.size > 10485760) {
          validationErrors.imagen = "Su archivo excede el tamaño máximo";
          setErrorArchivo('Su archivo excede el tamaño máximo');
          setShowModal(true);
        }
      } else {
        setErrorArchivo('Debe subir un archivo .zip');
        validationErrors.imagen = "Debe subir un archivo .zip";
        setShowModal(true);
      } 
    } 
    

    if (!values.nombre_equipo.trim()) {
      validationErrors.nombre_equipo = "Este campo es obligatorio";
    } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(values.nombre_equipo)) {
      validationErrors.nombre_equipo = "Ingrese un nombre válido";
    }else if(nombres_equipos_registrados.includes(values.nombre_equipo)){
      validationErrors.nombre_equipo = "Este nombre ya se encuentra registrado en el evento";
    }

    let dni_ingresados = []

    document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(evento =>{
      if(!evento.value.trim()){
        validationErrors[evento.name] = "Este campo es obligatorio";
      }else if(parseInt(evento.value) === dni_coach){
        validationErrors[evento.name] = "El entrenador no puede ser participante de este evento";
      }else if(dni_ingresados.includes(evento.value)){
        validationErrors[evento.name] = "No puede registrar al mismo participante más de una vez";
      }else if(id_registrados.includes(parseInt(evento.value))){
        validationErrors[evento.name] = "Este participante ya se encuentra participando en el evento";
      } else if (!/^[1-9][0-9]{5,11}$/.test(evento.value)){
        validationErrors[evento.name] = "Ingrese un DNI válido";
      }
      dni_ingresados.push(evento.value)
    })

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){

      document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(evento =>{
        participantes_dni_Aux.push(evento.value)
      })

      if(mostrarRequisitos){
        
      }
      const fd = new FormData();
      fd.append('file', archivo);
      var urli= '';
      axios.post(Imagen_Api_Url, fd)
      .then(response=>{ 
        const data = new FormData();
        let solic = '0'
        if(mostrarRequisitos){
          urli= response.data.urlimagen;
          data.append('zip', urli);
        }else{
          data.append('zip', null);
          solic = 1;
        }
        
      data.append('nombre_equipo', values.nombre_equipo)
      data.append('event_id', id_evento)
      data.append('solicitud', solic)
      data.append('id_coach', idu)

      let id_equipo = 0;
      axios.post(`${URL_API}/add-team`, data)
      .then(res=>{ 
        if(res.data.status === 200){
          id_equipo = res.data.ultimo_id_equipo
          cookies.set('id_equipo', id_equipo, {path: "/"});
          cookies.set('nombre_equipo', values.nombre_equipo , {path: "/"});

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
    
              const res = axios.post(`${URL_API}/add-team_user`, data);
            }else{

              console.log("DNI NO REGISTRADO")
              dni_no_registrados.push(participantes_dni_Aux[i])
            }

            cookies.set('dni_no_registrados', dni_no_registrados, {path: "/"});
            cookies.set('indice_dni_no_registrados', 0, {path: "/"});
            //cambiarEstadoModalEquipos(!formData.estadoModalEquipos)
            cambiarEstadoModalWarningDNI(!formData.estadoModalWarningDNI)
          }
        }
      })
      })
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
   
    if(se_Registro){
      setFormData({ estadoModal: false });
    }
  }, [])


  const generar_Campos_Dni=async()=>{
    for (let i = 0; i < participantes_equipo; i++) {
      setNumero_participantes(current => [...current, i+1]);
    }
  }

  const getUsuarios=async()=>{
    let url = `${URL_API}/get-user-information`
    const respuesta = await axios.get(url);
    setUsuarios(respuesta.data.usuarios);
  }

  const getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${id_evento}`;
      const response = await axios.get(url)
      if(response.data.requirements.length !== 0){
        setMostrarRequisitos(true)
      }
      setEvent(response.data)
      setRequisitos(response.data.requirements)
      cookies.set('usuarios', response.data.users, {path: "/"});
  }

  const cambiarEstadoModal = (nuevoEstado) => {
    setFormData({ estadoModal: nuevoEstado });
  }

  const cambiarEstadoModalEquipos = (nuevoEstado) => {
    setFormData({ estadoModalEquipos: nuevoEstado });
  }

  const cambiarEstadoModalWarningDNI = (nuevoEstado) => {
    setFormData({ estadoModalWarningDNI: nuevoEstado });
  }

  const cambiarEstadoModalRegistroUsuario = (nuevoEstado) => {
    setFormData({ estadoRegistroUsuario: nuevoEstado });
  }
  
  const cambiarEstadoContraseña = (nuevoEstado) => {
    setFormData({ estadoContraseña: nuevoEstado });
  }

  return(
    <div className='containerAll'>
    <div className='containerForm'>

      <ModalWarningDNI
        estadoWarningDNI={formData.estadoModalWarningDNI}
        cambiarEstadoWarningDNI={cambiarEstadoModalWarningDNI}
        cambiarEstadoModalEquipos={cambiarEstadoModalEquipos}
      />

      <ModalAutentificacion
        estado1={formData.estadoModal}
        cambiarEstado1={cambiarEstadoModal}
        cambiarEstadoModalRegistroUsuario={cambiarEstadoModalRegistroUsuario}
      />

      <ModalRegistroEquipos
        estadoEquipos={formData.estadoModalEquipos}
        cambiarEstadoModalEquipos={cambiarEstadoModalEquipos}
        cambiarEstadoWarningDNI={cambiarEstadoModalWarningDNI}
      />

      <ModalRegistroUsuario
        estadoRegistroUsuario={formData.estadoRegistroUsuario}
        cambiarEstadoModalRegistroUsuario={cambiarEstadoModalRegistroUsuario}
        cambiarEstado1={cambiarEstadoModal}
      />

      <div className='header'>
        <h2 className='titulo-Formulario-Registro-Evento'>Registro de Equipo</h2>
      </div>
      <div className='containerRequisito'>  
        {mostrarRequisitos ? (
          requisitos.map((r, index) => (
            <div key={r.id}>
              <p>{index + 1}. {r.contenido_requisito}</p>
            </div>
          ))
        ) : (
          <p>No se requiere subir ningún archivo o documento para registrarse a este evento.</p>
        )}
      </div>
      {mostrarRequisitos && (
        <>
      <div className='archivoZip'>
        
        <p> Archivo seleccionado:  </p>
        <span id="nombreArchivo"></span> {/* zip seleccionado */}  
        
      </div>
        </>
      )}
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

            <div className='equipo'>
              <p className='coachName'>Equipo <button className="buttonInfo">
                    ?
              <span className="textoInfo">Al registrar un equipo, el usuario responsable llega a formar parte como Coach automáticamente</span>
              </button> </p>
              
              <div className='camposEquipo'>
                <p>Nombre del Equipo</p>
                <input
                id='input_registro_equi'
                type='text'
                name='nombre_equipo'
                placeholder='Ingrese el nombre del equipo'
                onChange={handleChange}/>
              </div>
            </div>
          {errors.nombre_equipo && (
          <span className="advertencia">
            {errors.nombre_equipo}
          </span>
          )}

          {numero_participantes.map((participante_numero) => {
          return (<>
          <div className='datoNombre' id='entrada-Formulario-Registro-Evento-Team' tabIndex='0'>
            <p id="textoCuadro">Participante No {participante_numero}</p>
            <input
            id="input"
            className="input-Formulario-Registro-Evento"
            type="number"
            name= {participante_numero}
            placeholder="Ingrese DNI"
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
        texto='Registrar equipo'
        esBotonDeRegistro={true}
        manejarClic={registrar}/>
        {showModal && <ModalWarning estado1={showModal} cambiarEstado1={setShowModal} errorMessage={errorArchivo} />} {}
    </div>
    </div>
  )
}
export default FormRegistroEvento_Equipos;
