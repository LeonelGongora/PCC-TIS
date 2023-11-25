import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';


const salir = <FontAwesomeIcon icon={faCircleXmark} />
const subir = <FontAwesomeIcon icon={faArrowUpFromBracket} />

function ModalWindowOrganizadores({estadoOrganizador, cambiarEstadoModalOrganizador}){

    
    const [values, setValues] = useState({
        nombre_organizador : "",
        imagen_organizador : ""
    });

    const [errors, setErrors] = useState({});
    const [organizadores, setOrganizadores] = useState([]);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value,
        });
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            imagen_organizador: e.target.files[0]
          });
    }

    useEffect(()=>{
        getOrganizadores();
    }, []);

      
    const getOrganizadores = async (e) => {
        const url = "http://127.0.0.1:8000/api/get-organizador"; 
        const respuesta = await axios.get(url);
        setOrganizadores(respuesta.data.organizadores);
    }

    const salirVentanaModal = (e) => {
        cambiarEstadoModalOrganizador(false);
        setValues({
            nombre_organizador : '',
            imagen_organizador: ''
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_organizador.trim()){
            validationErrors.nombre_organizador = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,58}[A-Za-zÑñáéíóú]$/.test(values.nombre_organizador)){
            validationErrors.nombre_organizador = "Ingrese un nombre valido"
        }else{
            for (let index = 0; index < organizadores.length; index++) {

                let organizador = organizadores[index].nombre_organizador.trim()
                let nuevo_organizador = values.nombre_organizador.trim()

                if(organizador === nuevo_organizador){
                    validationErrors.nombre_organizador = "Ya existe un organizador con este nombre"
                    break;
                }
            }
        }

        if(!values.imagen_organizador.name){
            validationErrors.imagen_organizador = "Debe subir una imagen"
        }else if(values.imagen_organizador.name){
            const extensiones = ["png","PNG" ,"jpg", "jpeg"];

                var nombreArchivo = values.imagen_organizador.name;
                const extension = nombreArchivo.substring(nombreArchivo.lastIndexOf('.') + 1, nombreArchivo.length);
                if (!extensiones.includes(extension)){
                    document.getElementById("imagen_organizador").value = "";

                    setValues({
                        ...values,
                        imagen_organizador: ''
                    });
                
                    validationErrors.imagen_organizador = "La imagen tiene que tener una extension .png, .jpg, .PNG o .jpeg";

                }
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('nombre_organizador', values.nombre_organizador)
            data.append('imagen_organizador', values.imagen_organizador)

            const res = await axios.post('http://127.0.0.1:8000/api/add-organizador', data);
            
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    nombre_organizador : '',
                    imagen_organizador: ''
                });
                window.location.reload();
            }
        }
    }

    return (
        estadoOrganizador && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Registrar Organizador</h1>
                  </div>

                  <button className="BotonSalir"
                  onClick={salirVentanaModal}>
                    {salir}
                  </button>

                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">
                        <p id="textoCuadroAtributo">Nombre*</p>
                        <input
                        type="text"
                        name="nombre_organizador"
                        className="inputEvento"
                        placeholder="Ingrese nombre"
                        onChange={handleInput}
                        />
                        {errors.nombre_organizador && (
                        <span className="span1Modal">{errors.nombre_organizador}</span>
                        )}
                        <p id="textoCuadroImg">Imagen*</p>
                      <label htmlFor="imagen_organizador" className="inputEvento-label">
                      <input
                        type="file"
                        name="imagen_organizador"
                        id="imagen_organizador"
                        className="inputEvento"
                        onChange={handleChange}
                      />
                      {values.imagen_organizador ? (
                          <img
                              src={URL.createObjectURL(values.imagen_organizador)}
                              alt="Imagen subida"
                              className="imagenSubida"
                          />
                      ) : (
                          <span>Agregar imagen {subir}</span>
                      )}
                      </label>
 
                        {errors.imagen_organizador && (
                        <span className="span1Modal">{errors.imagen_organizador}</span>
                        )}

                    </form>
                    <button form="form1" type="submit" className="BotonRegistrar">
                        Registrar
                    </button>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalWindowOrganizadores; 