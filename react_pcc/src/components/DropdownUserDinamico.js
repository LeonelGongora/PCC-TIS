import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

function DropdownUserDinamico({
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

  const cargo = cookies.get('login_userCargo')
  const cadenaPrivilegio = cookies.get('login_userPrivilegio')

  return (
    <div className="dropdown-container">
      <button
        className={`${isOpen ? "dropdown-button-active" : "dropdown-button"}`}
        onMouseEnter={toggleDropdown}
      >
        ADMINISTRACIÓN{" "}
        <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu" onMouseLeave={toggleDropdown}>
          {cadenaPrivilegio === '' || cadenaPrivilegio === undefined ? (
            null
          ) : (<>
            {cadenaPrivilegio.charAt(16) == 1 ? (
              <li onClick={() => cambiarEstadoAnuncio(!estadoAnuncio)}>
                <span id="lineaV">{lineV}</span> Crear anuncio
              </li>
            ) : ( null )}
            {cadenaPrivilegio.charAt(14) == 1 ? (
              <li onClick={aceptarUsuarioRedireccionar}>
                <span id="lineaV">{lineV}</span> Administrar solicitudes
              </li>
            ) : ( null )}
            {cadenaPrivilegio.charAt(10) == 1 ? (
              <li onClick={() => cambiarEstadoOrganizador(!estadoOrganizador)}>
                <span id="lineaV">{lineV}</span> Registrar organizador
              </li>
            ) : ( null )}
            {cadenaPrivilegio.charAt(12) == 1 ? (
              <li onClick={() => cambiarEstadoPatrocinador(!estadoPatrocinador)}>
                <span id="lineaV">{lineV}</span> Registrar patrocinador
              </li>
            ) : ( null )}
          </>)}
        </ul>
      )}
    </div>
  );
}

export default DropdownUserDinamico;
