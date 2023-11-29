import React, {useState, useEffect} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark} />
const subir = <FontAwesomeIcon icon={faArrowUpFromBracket} />
//estadoRegistroUsuario
//cambiarEstadoModalRegistroUsuario
function ModalRegistroUsuario({estadoRegistroUsuario, cambiarEstadoModalRegistroUsuario,cambiarEstado1, cambiarDatosCoach}){

    const ci_nuevo_usuario = cookies.get('ci_nuevo_usuario');

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmarPassword: '',
        telefono: '',
    });

    const [usuarios, setUsuarios] = useState({});
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value,
        });
    }

    useEffect(()=>{
        //document.getElementById("tituloVentanaModal").innerHTML= "Registro de Usuario con DNI: " + dni_no_registrados[0]; 
    }, []);

    const salirVentanaModal = (e) => {
        cambiarEstadoModalRegistroUsuario(false);
        cambiarEstado1(true)
        setValues({
            nombre_organizador : '',
            imagen_organizador: ''
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        
    if (!values.nombre.trim()) {
      validationErrors.nombre = "Este campo es obligatorio"


    } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(values.nombre)) {
      validationErrors.nombre = "Ingrese nombre(s) valido";
    }

    if (!values.apellido.trim()) {
      validationErrors.apellido = "Este campo es obligatorio";
    } else if (
      !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(
        values.apellido
      )
    ) {
      validationErrors.apellido = "Ingrese apellido(s) valido(s)";
    }

    if (!values.email.trim()) {
      validationErrors.email = "Este campo es obligatorio"

    } else if (!/^[A-Za-z0-9._%]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(values.email)) {
      validationErrors.email = "Ingrese correo valido";
    } else {
      for (let index = 0; index < usuarios.length; index++) {
        let email = usuarios[index].email.trim();
        let nuevo_email = values.email.trim();

        if (email === nuevo_email) {
          validationErrors.email =
            "Ya existe un usuario registrado con este email";
          break;
        }
      }
    }

    if (!values.password.trim()) {
      validationErrors.password = "Este campo es obligatorio"

    } else if (!/[A-Z|a-z|0-9|áéíóú]{3,50}\S$/.test(values.password)) {
      validationErrors.password = "Ingrese una contraseña valida";
    } else {
    }
    
    if (!values.telefono.trim()) {
      validationErrors.telefono = "Este campo es obligatorio";
    } else if (!/^[7|6][0-9]{7}$/.test(values.telefono)) {
      validationErrors.telefono = "Ingrese un numero valido";
    }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const url = "http://127.0.0.1:8000/api/add-user-information";

            const data = new FormData();

            data.append('nombre', values.nombre)
            data.append('apellido', values.apellido)
            data.append('ci', ci_nuevo_usuario)
            data.append('email', values.email)
            data.append('password', values.password)
            data.append('telefono', values.telefono)

            cambiarDatosCoach(values.nombre, values.apellido, ci_nuevo_usuario);
            let datos_Coach = {}

            cookies.set('nombre_usuario', true, {path: "/"});
            cookies.set('apellido_usuario', datos_Coach, {path: "/"});
            
            datos_Coach["nombre_coach"] = values.nombre
            datos_Coach["apellido_coach"] = values.apellido
            datos_Coach["dni_coach"] = values.ci
            cookies.set('se_Registro', true, {path: "/"});
            cookies.set('datos_Coach', datos_Coach, {path: "/"});

            axios.post(url, data).then( res => {
                cookies.set('id_usuario', res.data.ultimo_id, {path: "/"});
                cambiarEstadoModalRegistroUsuario(false)

            })
        }
    }

    return (
        estadoRegistroUsuario && (

            <div className="Overlay">
              <div className="ContenedorModal contReg">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Registrar Usuario</h1>
                  </div>

                  <button className="BotonSalir"
                  onClick={salirVentanaModal}>
                    {salir}
                  </button>

                </div>
                <div className="registroTipoEvento reqCont">
                    <div className="crearEventos-user">
                        <div className="textoEvento-user">
                            <p className="textoRegistro-user">Registro de Informacion</p>
                        </div>
                    <div className="entradaDatos-user">
                        <form onSubmit={saveTypeEvent} id="form1">
                        <div className="nombreAp-user">
                            <div id="entradaNom-user" className={errors.nombre ? "errorEntrada-user" : ""}>
                                <p id="textoCuadro-user">Nombres*</p>
                                <input
                                    id="inputRegistro-user"
                                    type="text"
                                    name="nombre"
                                    placeholder="Ingrese nombre(s)"
                                    onChange={handleInput}
                                />
                                {errors.nombre && (
                                    <span className="advertencia-userNom">{errors.nombre}</span>
                                )}
                                </div>

                                <div id="entradaAp-user" className={errors.nombre ? "errorEntrada-user" : ""}>
                                <p id="textoCuadro-user">Apellidos*</p>
                                <input
                                    id="inputRegistro-user"
                                    type="text"
                                    name="apellido"
                                    placeholder="Ingrese apellido(s)"
                                    onChange={handleInput}
                                />
                                {errors.apellido && (
                                    <span className="advertencia-userNom">{errors.apellido}</span>
                                )}
                                </div>
                            </div>
                            
                            <div id="entrada-user">
                                <p id="textoCuadro-user">Email*</p>
                                <input
                                id="inputRegistro-user"
                                type="text"
                                name="email"
                                placeholder="Ingrese su correo"
                                onChange={handleInput}
                                />
                            </div>

                            {errors.email && (
                                <span className="advertencia-user">{errors.email}</span>
                            )}

                            <div id="entrada-user">
                                <p id="textoCuadro-user">Telefono*</p>
                                <input
                                id="inputRegistro-user"
                                type="number"
                                name="telefono"
                                placeholder="Ingrese su telefono"
                                onChange={handleInput}
                                />
                            </div>

                            {errors.telefono && (
                                <span className="advertencia-user">{errors.telefono}</span>
                            )}

                            <div id="entrada-user">
                                <p id="textoCuadro-user">Contraseña*</p>
                                <input
                                id="inputRegistro-user"
                                type="password"
                                name="password"
                                placeholder="Ingrese una contraseña"
                                onChange={handleInput}
                                />
                            </div>

                            {errors.password && (
                                <span className="advertencia-user">{errors.password}</span>
                            )}

                            <div className="botonEnviar-user">
                                <button form="form1" className="botonRegistrar-user" type="submit">
                                {" "}
                                Registrar
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                    
                </div>
              </div>
            </div>
        )
    );
}

export default ModalRegistroUsuario; 