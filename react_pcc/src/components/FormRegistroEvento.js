import React , { useState, useRef, useEffect } from 'react';
import '../stylesheets/Formulario.css';
import Boton from './Boton';
import '../stylesheets/Boton.css';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import ModalWarning from './ModalWindows/ModalWarning';
import ModalRegistroUsuario from './ModalWindows/ModalRegistroUsuario';

import ModalAutentificacion from './ModalWindows/ModalAutentificacion';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoUsuario_Api_Url = configApi.EVENTO_USUARIO_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

function FormRegistroEvento(){

  const id_usuario = cookies.get('id_usuario');
  const se_Registro = cookies.get('se_Registro');
  
  const archivoInput = useRef(null);
  const [requisitos, setRequisitos] = useState ( [] );
  
  const [mostrarRequisitos, setMostrarRequisitos] = useState(false);// Para mostrar Requisitos

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
    estadoModal: true,
    estadoRegistroUsuario: false
  })

  const [showModal, setShowModal] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState('');
  const [errors, setErrors] = useState({});

  const registrar = async(e) => {

    e.preventDefault();
    const validationErrors = {};
    console.log(se_Registro)

    document.querySelectorAll(".input-Formulario-Registro-Evento").forEach(input =>{

      if(input.type != "file"){

        console.log(input.value === "Seleccione una opcion")

        if(!input.value.trim() || input.value === "Seleccione una opcion"){
          validationErrors[input.name] = "Este campo es obligatorio";
        }else{
          if(input.type == "number"){
            let restriccion_id = input.id;
            const limites = restriccion_id.split(",");
    
            let minimo = parseInt(limites[0])
            let maximo = parseInt(limites[1])

            let valor_actual = parseInt(input.value);

            if(!(valor_actual >= minimo && valor_actual <= maximo)){
              console.log("No en rango")
              validationErrors[input.name] = "El numero no se encuentra en el rango requerido: " + limites[0] + "-" + limites[1];
            }else{
              console.log("En rango")
            }
    
          }else if(input.type  == "select"){
    
          }else if(input.type  == "date"){
    
          }else{
          }
        }
      }
    })    

    if(mostrarRequisitos){
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
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){
      
      if(mostrarRequisitos){

        const fd = new FormData();
        fd.append('file', archivo);
        axios.post(Imagen_Api_Url, fd).then(response=>{ 
          var urli= response.data.urlimagen;

          axios.post(EventoUsuario_Api_Url, {
            event_id: id_evento,
            user_id: id_usuario,
            requisitoZip: urli,
            solicitud : "0"
          }).then(response=>{
            window.location.href='./paginaRegistrarseEventos';
            console.log(response)
          })
        })
      }else{
        axios.post(EventoUsuario_Api_Url, {
          event_id: id_evento,
          user_id: id_usuario,
          //requisitoZip: urli,
          solicitud : "1"
        }).then(response=>{
          window.location.href='./paginaRegistrarseEventos';
          console.log(response)
        })

      }
      
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
  const id_evento = cookies.get('id_evento');
  const [atributos, setAtributos] = useState ( [] );

  useEffect(()=>{
    getEvent();
    if(se_Registro){
      setFormData({ estadoModal: false });
    }
  }, [])

  const getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${id_evento}`;
      const response = await axios.get(url)
      if(response){
        let atributos_Aux = response.data.attributes
        for (let i = 0; i < atributos_Aux.length; i++) {
          if(atributos_Aux[i].tipo_dato_atributo === "select"){
            atributos_Aux[i]["esSelect"] = true;
            let nueva_Restriccion = atributos_Aux[i].restriccion.split(",");
            atributos_Aux[i].restriccion = nueva_Restriccion;
          }else{
            atributos_Aux[i]["esSelect"] = false;
          }
        }
        if(response.data.requirements.length !== 0){
          setMostrarRequisitos(true)
        }
        setEvent(response.data)
        setRequisitos(response.data.requirements)
        setAtributos(atributos_Aux)
      }
  }

  const cambiarEstadoModal = (nuevoEstado) => {
    setFormData({ estadoModal: nuevoEstado });
  }

  const cambiarEstadoModalRegistroUsuario = (nuevoEstado) => {
    setFormData({ estadoRegistroUsuario: nuevoEstado });
  }

  const cambiarDatosCoach = () => {
  }

  return(
    <div className='containerForm'>

      <ModalAutentificacion
        estado1={formData.estadoModal}
        cambiarEstado1={cambiarEstadoModal}
        cambiarEstadoModalRegistroUsuario={cambiarEstadoModalRegistroUsuario}
        cambiarDatosCoach = {cambiarDatosCoach}
      />

      <ModalRegistroUsuario
        estadoRegistroUsuario={formData.estadoRegistroUsuario}
        cambiarEstadoModalRegistroUsuario={cambiarEstadoModalRegistroUsuario}
        cambiarEstado1={cambiarEstadoModal}
      />
      <div className='header'>
        <h2 className='titulo-Formulario-Registro-Evento'>Registro al evento</h2>
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
      <div className='registro'>
        <form class="form_name" id='form_name'>

          {atributos.map((atributo,id) => {
          return (<>
              {atributo.esSelect ? (
                <div className='desplegable-Formulario'>
                  <p id="textoCuadro">{atributo.nombre_atributo}</p>
                  <select id="desplegable" className="input-Formulario-Registro-Evento" name={atributo.nombre_atributo}>
                    <option disabled selected> 
                      Seleccione una opcion
                    </option>
                    {atributo.restriccion.map((evento, id) => {
                      return <option>{evento}</option>;
                    })}
                  </select>
                  {errors[atributo.nombre_atributo] && (
                    <span className="advertencia">
                      {errors[atributo.nombre_atributo]}
                    </span>
                  )}
                </div>
                ) : (<>
                      <div className='datoNombre' id='entrada-Formulario-Registro-Evento' tabIndex='0'>
                        <p id="textoCuadro">{atributo.nombre_atributo}</p>
                        <input
                          id={atributo.restriccion}
                          className="input-Formulario-Registro-Evento"
                          type={atributo.tipo_dato_atributo}
                          name={atributo.nombre_atributo}
                          placeholder="Ingrese nombre"
                          restriccion = {atributo.restriccion}
                        />
                      </div>
                      {errors[atributo.nombre_atributo] && (
                      <span className="advertencia">
                        {errors[atributo.nombre_atributo]}
                      </span>
                      )}
                    </>
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
export default FormRegistroEvento;
