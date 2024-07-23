import React, { useState} from 'react';
import NavbarUser from '../components/NavBars/NavBarCreateEvent';
import "../stylesheets/LoginStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import configApi from '../configApi/configApi'
import {URL_API} from '../const';
import CryptoJS from 'crypto-js';

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
            password: CryptoJS.MD5(password).toString()
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
        console.log(response.data[0].cargo)
        
        switch (usu){
            case "Administrador" :
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userRole', response.data[0].privilegio);
                console.log(response.data[0].privilegio);
                window.location.href='./home-admin';
            break;
            case "Participante":
                window.location.href='./home-participant';
            break; 
            case undefined:
                window.location.href='./home-participant';
            break; 
            default :
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userPermissions', response.data[0].privilegio);
                console.log(localStorage.getItem('userPermissions'));
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
                    <h3 className='titlePCC'>SanSi Cup</h3>
                    <img className="logoPCC" src={require("../images/logo512cup.png")}
                    alt='Logo del sistema'/>
                    <p className='description'>Competencia Universitaria de Programación.</p>
                    <p className='description'>"El trabajo duro supera al talento cuando el talento no trabaja duro"(Tim Notke)</p>
                </div>
            </div>
        </div>
    );
}

export default Login;