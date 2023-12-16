import React, { useState, useEffect } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

function DropdownAdmin({
  estadoAnuncio,
  cambiarEstadoAnuncio,
  estadoOrganizador,
  cambiarEstadoOrganizador,
  estadoPatrocinador,
  cambiarEstadoPatrocinador,
  setOpenDropFath,
  isOpen,
}) {
  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("administracion");
    }
  };

  const aceptarUsuarioRedireccionar = () => {
    window.location.href = "./eventacceptUser";
  };
  const registrarTipoRedireccionar = () => {
    window.location.href = "./formRegistroTipoUser";
  };
  const registrarUsuarioRolRedireccionar = () => {
    window.location.href = "./formRegistroUsuarioDinamico";
  };

  const cargo = cookies.get('login_userCargo')
  const [cadenaPrivilegio, setCadenaPrivilegio] = useState('');

  useEffect(() => {
    const cadena = cookies.get('login_userPrivilegio');
    if (cadena != undefined){
      setCadenaPrivilegio(cadena)
    }
    console.log(cadenaPrivilegio)
  }, [])

  return (
    <div className="dropdown-container">
      {cadenaPrivilegio != '' || cadenaPrivilegio == 'admin'? (
        <button
          className={`${isOpen ? "dropdown-button-active" : "dropdown-button"}`}
          onMouseEnter={toggleDropdown}
        >
          ADMINISTRACIÓN{" "}
          <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
        </button>
      ) : (null)}
      {isOpen && (
        <ul className="dropdown-menu" onMouseLeave={toggleDropdown}>
          {cadenaPrivilegio.charAt(22) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={() => cambiarEstadoAnuncio(!estadoAnuncio)}>
              <span id="lineaV">{lineV}</span> Crear anuncio
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(20) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={aceptarUsuarioRedireccionar}>
              <span id="lineaV">{lineV}</span> Administrar solicitudes
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(16) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={() => cambiarEstadoOrganizador(!estadoOrganizador)}>
              <span id="lineaV">{lineV}</span> Registrar organizador
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(18) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={() => cambiarEstadoPatrocinador(!estadoPatrocinador)}>
              <span id="lineaV">{lineV}</span> Registrar patrocinador
            </li>
          ) : (null)}
          {cadenaPrivilegio == 'admin'? (
            <li onClick={registrarTipoRedireccionar}>
              <span id="lineaV">{lineV}</span> Registrar Tipo de Usuario
            </li>
          ) : (null)}
          {cadenaPrivilegio == 'admin'? (
            <li onClick={registrarUsuarioRolRedireccionar}>
              <span id="lineaV">{lineV}</span> Registrar Usuario con Rol
            </li>
          ) : (null)}
        </ul>
      )}
    </div>
  );
}

export default DropdownAdmin;
