import React from "react";
import "../../stylesheets/NavbarStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from "../Dropdown";
import Cookies from 'universal-cookie';

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

  const cerrarSesion = () => {
    const cookieKeys = Object.keys(cookies.getAll());
      cookieKeys.forEach(key => {
        console.log(key)
        cookies.remove(key);
      });
    window.location.reload();
  }
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
          <a>
            <FontAwesomeIcon className="buttonNoti" icon={faBell} />
          </a>
          <div className="userId">
            <a>
              <FontAwesomeIcon className="userIcon" icon={faUser} />
            </a>
            <button className='buttonNoti' onClick={cerrarSesion}>
                Cerrar Sesion
            </button>
          </div>
          <div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarAdmin;
