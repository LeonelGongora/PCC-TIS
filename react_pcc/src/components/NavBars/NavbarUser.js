import React , { useState, useRef, useEffect } from 'react';
import "../../stylesheets/NavbarStyles.css";
import DropdownUser from '../DropDownUser';
import DropdownNotification from '../DropdownNotification';             
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


import Cookies from 'universal-cookie';

const exitSesion = <FontAwesomeIcon icon={faRightFromBracket} />;
const cookies = new Cookies();

function NavbarUser(){

  const se_Registro = cookies.get('se_Registro');
  const nombre_usuario_cookies = cookies.get('nombre_usuario');
  const apellido_usuario_cookies = cookies.get('apellido_usuario');

  const [nombre_usuario, setNombreUsuario] = useState("");
  const [apellido_usuario, setApellidoUsuario] = useState("");

  useEffect(()=>{
    if(se_Registro){
      setNombreUsuario(nombre_usuario_cookies)
      setApellidoUsuario(apellido_usuario_cookies)
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

  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropdown(null);
      setIsOpen(!isOpen);
    } else {
      setIsOpen(!isOpen);
      setOpenDropdown("sesionUser");
    }
  };
    return (
      <nav>
        <div className="logoName">
          <h1 className="name">PCC</h1>
          <a href="">
            <img
              className="imageNav"
              src={require("../../images/logo512.png")}
              alt="Logo del sistema"
            />
          </a>
        </div>
        <div className="navbarRight">
          <div className="desplegable1">
            <DropdownUser
              setOpenDropFath={setOpenDropdown}
              isOpen={openDropdown === "user"}
            />
          </div>

          <div id='contenedorRigthUser'>
            <DropdownNotification
              setOpenDropFath={setOpenDropdown}
              isOpen={openDropdown === "notification"}
            />

            <div className="userId">
              <div className="dropdown-container">
                <button
                  className={`${
                    isOpen && openDropdown === "sesionUser"
                      ? "dropdown-button-active"
                      : "dropdown-button"
                  }`}
                  onClick={toggleDropdown}
                >
                  <a>
                    <FontAwesomeIcon className="userIcon" icon={faUser} />
                  </a>
                  {`${nombre_usuario} ${apellido_usuario}`}
                </button>
                {isOpen && openDropdown === "sesionUser" && (
                  <ul className="dropdown-menu-user">
                    <li onClick={cerrarSesion}>
                      <span id="lineaV">{exitSesion}</span> CerrarSesion
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default NavbarUser;

