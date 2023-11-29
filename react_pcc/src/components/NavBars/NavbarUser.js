import React from 'react';
import "../../stylesheets/NavbarStyles.css";
import DropdownUser from '../DropDownUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function NavbarUser(){

  const cerrarSesion = () => {
    const cookieKeys = Object.keys(cookies.getAll());
      cookieKeys.forEach(key => {
        console.log(key)
        cookies.remove(key);
      });
    window.location.reload();
  }


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
            <a><FontAwesomeIcon className='buttonNoti' icon={faBell} /></a>
            <div className='userId'>
              <a><FontAwesomeIcon className='userIcon' icon={faUser} /></a>
              <button className='buttonNoti' onClick={cerrarSesion}>
                Cerrar Sesion
              </button>
            </div>
            <div>
            </div>
          </div>
      </nav>
    );
}

export default NavbarUser;