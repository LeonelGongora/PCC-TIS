import React, { useState, useRef, useEffect } from 'react';
import "../../stylesheets/NavbarStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown";
import Cookies from 'universal-cookie';
import "../../stylesheets/Dropdown.css";
import DropdownReporte from '../DropDownReporte';
import DropdownAdmin from '../DropDownAdmin';

const exitSesion = <FontAwesomeIcon icon={faRightFromBracket} />;
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
}) {
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

  useEffect(() => {
    console.log(se_Registro)
    if (se_Registro) {
      setNombreUsuario(nombre_usuario_cookies)
      setApellidoUsuario(apellido_usuario_cookies)
    }
  }, [])

  const nombre_usuario_cookies = cookies.get('nombre_usuario');
  const apellido_usuario_cookies = cookies.get('apellido_usuario');

  const [nombre_usuario, setNombreUsuario] = useState("");
  const [apellido_usuario, setApellidoUsuario] = useState("");
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
  const redirigirLogin = () => {
    window.location.href = "./login";
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
              setOpenDropFath={setOpenDropdown}
              isOpen={openDropdown === "eventos"}
              estado1={estado1}
              cambiarEstado1={cambiarEstado1}
            />
            <DropdownAdmin
              setOpenDropFath={setOpenDropdown}
              isOpen={openDropdown === "administracion"}
              estadoAnuncio={estadoAnuncio}
              cambiarEstadoAnuncio={cambiarEstadoAnuncio}
              estadoOrganizador={estadoOrganizador}
              cambiarEstadoOrganizador={cambiarEstadoOrganizador}
              estadoPatrocinador={estadoPatrocinador}
              cambiarEstadoPatrocinador={cambiarEstadoPatrocinador}
            />
            <DropdownReporte
              setOpenDropFath={setOpenDropdown}
              isOpen={openDropdown === "reportes"}
            />
          </div>

          <div className="userId">
            <div className="dropdown-container">
              {se_Registro && <button
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
              </button>}
              {!se_Registro && <button className='dropdown-button botonAcceder'
                onClick={redirigirLogin}
                >
                    Acceder
                </button>}

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
      </nav>
    </>
  );
}

export default NavbarAdmin;
