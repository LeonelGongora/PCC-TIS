import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/NavbarStyles.css";

function NavbarUser(){
    return(
        <nav>
            <div className='logoName'> 
            <h1 className='name'>
                PCC
            </h1>
            <a href=''>   
                <img className='imageNav' src = {require('../images/Logopng.png')} alt='Logo del sistema'/>
            </a>
            </div> 
            <div>
                <ul id='navbar'>
                <li><a className='active' href=''> Eventos</a></li>
                    <li><a href=''> Notificaciones </a></li>
                    <li><a href=''> Mis eventos</a></li>
                    <li><a href=''> Perfil</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavbarUser;