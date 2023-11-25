import React , { useState, useRef, useEffect } from 'react';
import '../stylesheets/FormularioEquipo.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import configApi from '../configApi/configApi'
//import axios from 'axios'
import Cookies from 'universal-cookie';
import ModalWarning from './ModalWindows/ModalWarning';


//const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoUsuario_Api_Url = configApi.EVENTO_USUARIO_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

function FormRegistroEvento_Equipos_Req(){
  

  //const id_usuario = cookies.get('id_usuario');
  //const archivoInput = useRef(null);
  //const [mostrarRequisitos, setRequisitos] = useState(true);// Para mostrar Requisitos

  const [formData, setFormData] = useState({
    ci : '',
    estadoModal: true
  })

  const [showModal, setShowModal] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState('');
  const [errors, setErrors] = useState({});

  const registrar = async(e) => {

    window.location.href = "./paginaRegistrarseEventos";

    /*
    e.preventDefault();
    const form = document.forms["form_name"].getElementsByTagName("input");
    const atributosInput= Array.from(form);
    
    const validationErrors = {};

    for (let i = 0; i < atributos.length; i++) {
      
      if(!atributosInput[i].value.trim()){
        validationErrors[atributosInput[i].name] = "Este campo es obligatorio";
      }
    }

    setErrors(validationErrors);
     
     */

  }

  const [event, setEvent] = useState ( [] );
  //const idevento = cookies.get('idauxiliar');
  const [atributos, setAtributos] = useState ( [] );

  /* 
  useEffect(()=>{
    //getEvent();
    //console.log(id_usuario)
  }, [])

  const getEvent=async()=>{
      //const url = `${Eventos_Api_Url}/${idevento}`;
      //const response = await axios.get(url)
      //setEvent(response.data)
      //setAtributos(response.data.attributes)
  }
  */

  return(
    <div className='containerAll'>
      <h1>Competencia Universitaria</h1>
    <div className='containerForm'>
      <div className='header'>
        <h2 className='titulo-Formulario-Registro-Evento'>Registro de Equipo</h2>
      </div>
      <div className='registroEquipo reg_req'>
          <form className='formEquipo'>
            <div className='coach'>
              <p>Coach</p>
              <div className='camposCoach'>
                <p>Polera</p>
                <input
                id='input_registro_equipo'
                type='text'
                name=''
                placeholder='Ingrese la talla de polera'/>
              </div>
              <div className='camposCoach'>
                <p>Edad</p>
                <input
                id='input_registro_equipo'
                type='number'
                name=''
                placeholder='Ingrese el DNI del coach'/>
              </div>
            </div>
            <div className='equipo'>
              <p className='tituloEquipo'>Participante 1: Andrews Valdivia</p>
              <div className='camposEquipo'>
                <p>Polera</p>
                <input
                id='input_registro_equipo'
                type='text'
                name=''
                placeholder='Ingrese la talla de polera'/>
              </div>
              <div className='camposEquipo'>
                <p>Edad</p>
                <input
                id='input_registro_equipo'
                type='number'
                name=''
                placeholder='Ingrese edad del participante 1 '/>
              </div>
            </div>
            <div className='equipo'>
              <p className='tituloEquipo'>Participante 1: Andrews Valdivia</p>
              <div className='camposEquipo'>
                <p>Polera</p>
                <input
                id='input_registro_equipo'
                type='text'
                name=''
                placeholder='Ingrese la talla de polera'/>
              </div>
              <div className='camposEquipo'>
                <p>Edad</p>
                <input
                id='input_registro_equipo'
                type='number'
                name=''
                placeholder='Ingrese edad del participante 1 '/>
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
export default FormRegistroEvento_Equipos_Req;
