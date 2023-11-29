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

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

function FormRegistroEvento_Equipos(){

  const id_evento = cookies.get('id_evento');
  const idu = cookies.get('id_usuario');
  const se_Registro = cookies.get('se_Registro');
  const participantes_equipo = cookies.get('participantes_equipo');
  const datos_Coach = cookies.get('datos_Coach');
  
  const archivoInput = useRef(null);
  const [mostrarRequisitos, setMostrarRequisitos] = useState(true);// Para mostrar Requisitos
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

  const [nombre_coach, setNombreCoach] = useState("");
  const [apellido_coach, setApellidoCoach] = useState("");
  const [dni_coach, setDniCoach] = useState("");

  const [formData, setFormData] = useState({
    estadoModal: true,
    estadoModalEquipos :false,
    estadoModalWarningDNI :false,
    estadoRegistroUsuario :false,
  });

  const [showModal, setShowModal] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState('');
  const [errors, setErrors] = useState({});

  const registrar = async(e) => {

    e.preventDefault();
    const validationErrors = {};
    console.log(values)

    let nombres_equipos_registrados = []
    let id_registrados = []

    for (let i = 0; i < event.teams.length; i++) {
      nombres_equipos_registrados.push(event.teams[i].nombre_equipo)

      for (let j = 0; j <  event.teams[i].users.length; j++) {
        id_registrados.push(event.teams[i].users[j].ci)
      }
    }

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
    } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(values.nombre_equipo)) {
      validationErrors.nombre_equipo = "Ingrese un numero de equipo valido";
    }else if(nombres_equipos_registrados.includes(values.nombre_equipo)){
      validationErrors.nombre_equipo = "Este nombre ya se encuentra registrado en el evento";
    }

    let dni_ingresados = []

    document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(evento =>{
      if(!evento.value.trim()){
        validationErrors[evento.name] = "Este campo es obligatorio";
      }else if(evento.value === dni_coach){
        validationErrors[evento.name] = "El entrenador no se puede registrar";
      }else if(dni_ingresados.includes(evento.value)){
        validationErrors[evento.name] = "No puede registrar al mismo participante mas de una vez";
      }else if(id_registrados.includes(parseInt(evento.value))){
        validationErrors[evento.name] = "Este participante ya se encuentra participando en el evento";
      }
      dni_ingresados.push(evento.value)
    })

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){

      
      
      document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(evento =>{
        participantes_dni_Aux.push(evento.value)
      })

      const fd = new FormData();
      fd.append('file', archivo);
      var urli= '';
      axios.post(Imagen_Api_Url, fd)
      .then(response=>{ 
        urli= response.data.urlimagen;
      
      const data = new FormData();
      
      const solic = '0';

      data.append('nombre_equipo', values.nombre_equipo)
      data.append('event_id', id_evento)
      data.append('solicitud', solic)
      data.append('id_coach', idu)
      data.append('zip', urli)

      let id_equipo = 0;
      axios.post('http://127.0.0.1:8000/api/add-team', data)
      .then(res=>{ 
        if(res.data.status === 200){
          console.log(res)
          id_equipo = res.data.ultimo_id_equipo
          cookies.set('id_equipo', id_equipo, {path: "/"});

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
    
              const res = axios.post('http://127.0.0.1:8000/api/add-team_user', data);
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
    console.log(idu)
    if(idu){
      //setNombreCoach(nombre_coach)
      //setApellidoCoach(apellido_coach)
      //setDniCoach(dni_coach)
    }
    if(se_Registro){
      setFormData({ estadoModal: false });
      setNombreCoach(datos_Coach.nombre_coach)
      setApellidoCoach(datos_Coach.apellido_coach)
      setDniCoach(datos_Coach.dni_coach)
    }
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
      setRequisitos(response.data.requirements)
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

  const cambiarDatosCoach = (nombre_coach, apellido_coach, dni_coach) => {
    setNombreCoach(nombre_coach)
    setApellidoCoach(apellido_coach)
    setDniCoach(dni_coach)
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
        cambiarDatosCoach = {cambiarDatosCoach}
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
        <div className='coach'>
              <p>Coach</p>
              <div className='camposCoach'>
                <p>Nombre del coach</p>
                <input
                id='input_registro_equipo'
                type='text'
                name='nameCoach'
                placeholder='Ingrese su nombre'
                value={`${nombre_coach} ${apellido_coach}`}
                readOnly
                />
              </div>
              <div className='camposCoach'>
                <p>DNI del coach</p>
                <input
                id='input_registro_equipo'
                type='number'
                name='DNICoach'
                placeholder='Ingrese el DNI del coach'
                value={dni_coach}
                readOnly
                />
              </div>
            </div>

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
    </div>
  )
}
export default FormRegistroEvento_Equipos;
