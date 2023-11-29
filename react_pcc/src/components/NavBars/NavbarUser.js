import React , { useState, useRef, useEffect } from 'react';
import "../../stylesheets/NavbarStyles.css";
import DropdownUser from '../DropDownUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function NavbarUser(){

  const se_Registro = cookies.get('se_Registro');

  const [nombre_usuario, setNombreUsuario] = useState("");
  const [apellido_usuario, setApellidoUsuario] = useState("");

  useEffect(()=>{
    if(se_Registro){

    }
  }, []);

  const cerrarSesion = () => {
    const cookieKeys = Object.keys(cookies.getAll());
      cookieKeys.forEach(key => {
        console.log(key)
        cookies.remove(key);
      });
    window.location.reload();
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    return (
      <nav>
        <div className='logoName'>
          <h1 className='name'>PCC</h1>
          <a href="">
            <img
              className="imageNav"
              src={require("../../images/logo512.png")}
              alt="Logo del sistema"
            />
          </a>
        </div>
        <div className='navbarRight'>
          <div className='desplegable1'>
            <DropdownUser/>
          </div>
            
          <div className="userId">
            <a>
              <FontAwesomeIcon className="userIcon" icon={faUser} />
            </a>
            <div className="dropdown-container">
              <button className="dropdown-button" onClick={toggleDropdown}>
              {`${nombre_usuario} ${apellido_usuario}`} 
              </button>
              {isOpen && (
                <ul className="dropdown-menu">
                  <li onClick={cerrarSesion}>cerrarSesion</li>
                </ul>
              )}
            </div>
          </div>
            <div>
            </div>
          </div>
      </nav>
    );
}

export default NavbarUser;