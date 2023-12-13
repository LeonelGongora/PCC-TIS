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
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username) {
            setUsernameError('Este campo es obligatorio.');
        } else {
            setUsernameError('');
        }
        if (!password) {
            setPasswordError('Este campo es obligatorio.');
        } else {
            setPasswordError('');
        }
        if (!username || !password) {
            event.preventDefault();
        }

        await axios.post(login, {
            email: username,
            password: password
        })
        .then(response=>{
        // console.log(response.data[0].id)
        // console.log(response.data[0].nombre)

        //Almacenar los datos de forma global en cookies
        cookies.set('login_userId', response.data[0].id, {path: "/"});
        cookies.set('login_userCargo', response.data[0].cargo, {path: "/"});
        cookies.set('login_userPrivilegio', response.data[0].privilegio, {path: "/"});
        cookies.set('login_userNombre', response.data[0].nombre, {path: "/"});
    
        const usu = response.data[0].cargo;
        switch (usu){
            case "Administrador" :
            window.location.href='./home-admin';
            break;
            case "Participante" :
            cookies.set('id_usuario', response.data[0].id, {path: "/"});
            window.location.href='./home-participant';
            break; 
            default :
            window.location.href='./home-dinamico';
            cookies.set('nombre_usuario',response.data[0].nombre, {path: "/"});
            cookies.set('apellido_usuario', response.data[0].apellido, {path: "/"});
            cookies.set('id_usuario', response.data[0].id, {path: "/"});
            cookies.set('ci_nuevo_usuario', response.data[0].ci, {path: "/"});
            cookies.set('se_Registro', true, {path: "/"});
            break; 
        }  
    
        })
        .catch(error=>{
            console.log('Usuario NO Registrado')
        })
    };

    const handleClick = () => {
        console.log("Al hacer clic en el enlace");
    };

    // useEffect(() => {
    //     console.log(username) 
    //     console.log(password) 
    // });

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
                            placeholder='Nombre de Usuario'
                            className='input-text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span className='error-message'>{usernameError}</span>
                        <input
                            type='password'
                            placeholder='Contraseña'
                            className='input-text'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className='error-message'>{passwordError}</span>
                        <a href='#' onClick={handleClick}>Olvido su contraseña?</a>
                        <input type='Submit' value='Ingresar' className='buttonLogin'/>
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