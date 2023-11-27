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

function ModalRegistroEquipos({estadoEquipos, cambiarEstadoModalEquipos,cambiarEstadoWarningDNI}){

    const id_evento = cookies.get('id_evento');
    const id_equipo = cookies.get('id_equipo');
    const dni_no_registrados = cookies.get('dni_no_registrados');
    const indice_dni_no_registrados = cookies.get('indice_dni_no_registrados');
    const [contador, setContador] = useState(0);

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmarPassword: '',
        telefono: '',
    });

    const [errors, setErrors] = useState({});

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
        //document.getElementById("tituloVentanaModal").innerHTML= "Registro de Usuario con DNI: " + dni_no_registrados[0]; 

    }, []);

    const salirVentanaModal = (e) => {
        cambiarEstadoModalEquipos(false);
        setValues({
            nombre_organizador : '',
            imagen_organizador: ''
        });
        setErrors({});
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const url = "http://127.0.0.1:8000/api/add-user-information";
            const url_equipo = "http://127.0.0.1:8000/api/add-team_user";

            const data = new FormData();
            const data_equipo = new FormData();

            data.append('nombre', values.nombre)
            data.append('apellido', values.apellido)
            data.append('ci', dni_no_registrados[contador])
            data.append('email', values.email)
            data.append('password', values.password)
            data.append('telefono', values.telefono)

            let id_usuario = 0

            axios.post(url, data).then(res => {
                id_usuario = res.data.ultimo_id;
                console.log(res)
                data_equipo.append('team_id', id_equipo)
                data_equipo.append('user_id', id_usuario)

                axios.post(url_equipo, data_equipo).then(res_equipo => {
                    console.log(res_equipo)
                    let contador_Aux = contador;
                    contador_Aux = contador_Aux + 1;
                    setContador(contador_Aux);

                    setValues({
                        nombre: '',
                        apellido: '',
                        email: '',
                        password: '',
                        confirmarPassword: '',
                        telefono: '',
                    });
                    document.querySelectorAll(".inputEvento").forEach(entrada =>{
                        entrada.value = ""
                    })
                    if ((contador + 1) === dni_no_registrados.length){
                        console.log("Todos registrados")
                        window.location.href='./register-to-event-teams_req';
                    }else{
                        cookies.set('indice_dni_no_registrados', indice_dni_no_registrados + 1, {path: "/"});
                        cambiarEstadoModalEquipos(false);
                        cambiarEstadoWarningDNI(true);
                    }
                })

            })

        }
    }

    return (
        estadoEquipos && (

            <div className="Overlay">
              <div className="ContenedorModal contRegTeam">
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

export default ModalRegistroEquipos; 