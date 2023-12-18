import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import {URL_API} from '../../const';

const salir = <FontAwesomeIcon icon={faCircleXmark} />
const subir = <FontAwesomeIcon icon={faArrowUpFromBracket} />

function ModalWindowPatrocinadores({estadoPatrocinador, cambiarEstadoModalPatrocinador}){

    
    const [values, setValues] = useState({
        nombre_patrocinador : "",
        imagen_patrocinador : ""
    });

    const [errors, setErrors] = useState({});
    const [patrocinadores, setPatrocinadores] = useState([]);

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
            imagen_patrocinador: e.target.files[0]
          });

    }

    useEffect(()=>{
        getPatrocinadores();
    }, []);

    const getPatrocinadores = async (e) => {
        const url = `${URL_API}/get-patrocinador`; 
        const respuesta = await axios.get(url);
        setPatrocinadores(respuesta.data.patrocinadores);
    }

    const salirVentanaModal = (e) => {
        cambiarEstadoModalPatrocinador(false);
        setValues({
            nombre_patrocinador : '',
            imagen_patrocinador: ''
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_patrocinador.trim()){
            validationErrors.nombre_patrocinador = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,58}[A-Za-zÑñáéíóú]$/.test(values.nombre_patrocinador)){
            validationErrors.nombre_patrocinador = "Ingrese un nombre válido"
        }else{
            for (let index = 0; index < patrocinadores.length; index++) {

                let patrocinador = patrocinadores[index].nombre_patrocinador.trim()
                let nuevo_patrocinador = values.nombre_patrocinador.trim()

                if(patrocinador === nuevo_patrocinador){
                    validationErrors.nombre_patrocinador = "Ya existe un patrocinador con este nombre"
                    break;
                }
            }
        }

        if(!values.imagen_patrocinador.name){
            validationErrors.imagen_patrocinador = "Debe subir una imagen"
        }else if(values.imagen_patrocinador.name){
            const extensiones = ["png","PNG" ,"jpg", "jpeg"];

                var nombreArchivo = values.imagen_patrocinador.name;
                const extension = nombreArchivo.substring(nombreArchivo.lastIndexOf('.') + 1, nombreArchivo.length);
                if (!extensiones.includes(extension)){
                    document.getElementById("imagen_patrocinador").value = "";

                    setValues({
                        ...values,
                        imagen_patrocinador: ''
                    });
                
                    validationErrors.imagen_patrocinador = "La imagen tiene que tener una extension .png, .jpg, .PNG o .jpeg";

                }
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const data = new FormData();

            data.append('nombre_patrocinador', values.nombre_patrocinador)
            data.append('imagen_patrocinador', values.imagen_patrocinador)

            const res = await axios.post(`${URL_API}/add-patrocinador`, data);
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    nombre_patrocinador : '',
                    imagen_patrocinador: ''
                });
                window.location.reload();
            }
        }

    }

    return (
        estadoPatrocinador && (
        <div className="Overlay">
            <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Registrar Patrocinador</h1>
                  </div>
                  <button
                    onClick={salirVentanaModal}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">
                    <p id="textoCuadroAtributo">Nombre*</p>
                        <input
                        type="text"
                        name="nombre_patrocinador"
                        className="inputEvento"
                        placeholder="Ingrese nombre"
                        onChange={handleInput}
                        />
                        {errors.nombre_patrocinador && (
                            <span className="span1Modal">{errors.nombre_patrocinador}</span>
                        )}

                        <p id="textoCuadroImg">Imágen*</p>
                        <label htmlFor="imagen_patrocinador" className="inputEvento-label">
                        <input
                        type="file"
                        name="imagen_patrocinador"
                        id="imagen_patrocinador"
                        className="inputEvento"
                        onChange={handleChange}
                        />
                        {values.imagen_patrocinador ? (
                          <img
                              src={URL.createObjectURL(values.imagen_patrocinador)}
                              alt="Imagen subida"
                              className="imagenSubida"
                          />
                        ) : (
                            <span>Agregar imágen {subir}</span>
                        )}
                        </label>
 
                        {errors.imagen_patrocinador && (
                            <span className="span1Modal">
                            {errors.imagen_patrocinador}
                            </span>
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

export default ModalWindowPatrocinadores; 