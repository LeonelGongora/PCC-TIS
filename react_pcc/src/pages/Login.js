import React, { useState } from 'react';
import NavbarUser from '../components/NavBars/NavBarCreateEvent';
import "../stylesheets/LoginStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import configApi from '../configApi/configApi'
import {URL_API} from '../const';


function Login (){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = (event) => {
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
    };

    const handleClick = () => {
        console.log("Al hacer clic en el enlace");
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