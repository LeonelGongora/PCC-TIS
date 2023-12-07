import React , { useState, useRef, useEffect } from 'react';
import "../../stylesheets/NavbarStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from "../Dropdown";
import Cookies from 'universal-cookie';
import "../../stylesheets/Dropdown.css";

const cookies = new Cookies();

function NavbarAdmin({
  estado1,
  cambiarEstado1,
  estadoOrganizador,
  cambiarEstadoOrganizador,
  estadoPatrocinador,
  cambiarEstadoPatrocinador,
  estadoAnuncio,
  cambiarEstadoAnuncio,
})
{
  const idu = cookies.get('id_usuario');
  const se_Registro = cookies.get('se_Registro');

  const cerrarSesion = () => {
    const cookieKeys = Object.keys(cookies.getAll());
      cookieKeys.forEach(key => {
        console.log(key)
        cookies.remove(key);
      });
    window.location.reload();
  }

  useEffect(()=>{
    console.log(se_Registro)
    if(se_Registro){
      setNombreUsuario(nombre_usuario_cookies)
      setApellidoUsuario(apellido_usuario_cookies)
    }
  }, [])

  const nombre_usuario_cookies = cookies.get('nombre_usuario');
  const apellido_usuario_cookies = cookies.get('apellido_usuario');

  const [nombre_usuario, setNombreUsuario] = useState("");
  const [apellido_usuario, setApellidoUsuario] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
            <Dropdown
              estado1={estado1}
              cambiarEstado1={cambiarEstado1}
              estadoOrganizador={estadoOrganizador}
              cambiarEstadoOrganizador={cambiarEstadoOrganizador}
              estadoPatrocinador={estadoPatrocinador}
              cambiarEstadoPatrocinador={cambiarEstadoPatrocinador}
              estadoAnuncio={estadoAnuncio}
              cambiarEstadoAnuncio={cambiarEstadoAnuncio}
            />
          </div>
          
          <div className="userId">
            <a>
              <FontAwesomeIcon className="userIcon-admin" icon={faUser} />
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
    </>
  );
}

export default NavbarAdmin;
