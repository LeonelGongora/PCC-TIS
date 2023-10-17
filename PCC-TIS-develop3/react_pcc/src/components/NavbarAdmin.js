import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/NavbarStyles.css";

import {Link} from 'react-router-dom';

function NavbarAdmin(){
    return(
        <>
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
                <li><Link to = {'add-event'}> Añadir Evento</Link></li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default NavbarAdmin;