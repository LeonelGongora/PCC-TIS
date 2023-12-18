import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/NavBars/NavBarCreateEvent';
import "../stylesheets/LoginStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import configApi from '../configApi/configApi'
import {URL_API} from '../const';

const cookies = new Cookies();

const login =`${URL_API}/login`;

function Login (){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({})
    const [showMessage, setShowMessage] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        const validationErrors = {};
        if (!username.trim()) {
            validationErrors.username = "Este campo es obligatorio"
        }
        if (!password.trim()) {
            validationErrors.password = "Este campo es obligatorio"
        }
        setErrors(validationErrors)
        
        if (Object.keys(validationErrors).length === 0) {
        await axios.post(login, {
            email: username,
            password: password
        })
        .then(response=>{
        // console.log(response.data[0].id)
        // console.log(response.data[0].nombre)

        //Almacenar los datos de forma global en cookies
        cookies.set('login_userId', response.data[0].id, {path: "/"});
        cookies.set('login_userPrivilegio', response.data[0].privilegio, {path: "/"});

        cookies.set('nombre_usuario',response.data[0].nombre, {path: "/"});
        cookies.set('apellido_usuario', response.data[0].apellido, {path: "/"});
        cookies.set('id_usuario', response.data[0].id, {path: "/"});
        cookies.set('ci_nuevo_usuario', response.data[0].ci, {path: "/"});
        cookies.set('se_Registro', true, {path: "/"});   
    
        const usu = response.data[0].cargo;
        switch (usu){
            case "Administrador" :
                window.location.href='./home-admin';
            break;
            case "Participante":
                window.location.href='./home-participant';
            break; 
            case undefined:
                window.location.href='./home-participant';
            break; 
            default :
                window.location.href='./home-admin';
            break; 
        }  
    
        })
        .catch(error=>{
            console.log('Usuario NO Registrado')
            const validationErrors2 = {};
            validationErrors2.username = "Username o contraseña incorrecto."
            validationErrors2.password = "Username o contraseña incorrecto."
            setErrors(validationErrors2)
        })
        }
    };

    const handleClick = () => {
        console.log("Al hacer clic en el enlace");
    };

    const handleMouseEnter = () => {
        setShowMessage(true);
      };
    
      const handleMouseLeave = () => {
        setShowMessage(false);
      };
    // useEffect(() => {
    //     console.log(username) 
    //     console.log(password) 
    // }, [errors]);

      const redireccionVisualizarEventos = () => {
        window.location.href='./home-participant';
      };
    return (
        <div className='App'>
        <NavbarUser />
            <div className='contenedorLogin'>
                <div className='contenedorDatos'>
                    <form className='form-login' id='form-login' onSubmit={handleLogin}>
                        <h1>Iniciar Sesión</h1>
                        <p>Ingrese sus datos</p>
                        <input
                            type='text'
                            placeholder='Documento de Identidad'
                            className='input-text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && (
                            <span className='error-message'>{errors.username}</span>
                        )}
                        <input
                            type='password'
                            placeholder='Contraseña'
                            className='input-text'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <span className='error-message'>{errors.password}</span>
                        )}
                        
                        <input type='Submit' defaultValue='Ingresar' className='buttonLogin'/>
                        <p>Aún no se ha registrado? 
                            <span id='registrarse' onClick={redireccionVisualizarEventos} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Registrarse</span>
                            {showMessage && (
                                <div className='mensajeInf'>
                                    Si deseas tener una cuenta en PCC, primero debes registrarte a un evento.
                                </div>
                            )}
                        </p>
                    </form>  
                </div>
                <div className='presentacionlogin'>
                    <h3 className='titlePCC'>Programming Competition Community</h3>
                    <img className="logoPCC" src={require("../images/logo512.png")}
                    alt='Logo del sistema'/>
                    <p className='descriptionPCC'>PCC es un sistema que permite ayudar a las fases 
                    administrativas de los eventos de competencias de programación en la UMSS</p>
                </div>
            </div>
        </div>
    );
}

export default Login;