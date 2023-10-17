import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/NavbarStyles.css";
function NavbarAdmin(){
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
                {/* <li><a href=''> Reportes <svg xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg></a></li> */}
                </ul>
            </div>
        </nav>
    )
}

export default NavbarAdmin;