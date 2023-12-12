import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

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
          <li onClick={() => cambiarEstadoAnuncio(!estadoAnuncio)}>
            <span id="lineaV">{lineV}</span> Crear anuncio
          </li>
          <li onClick={aceptarUsuarioRedireccionar}>
            <span id="lineaV">{lineV}</span> Administrar solicitudes
          </li>
          <li onClick={() => cambiarEstadoOrganizador(!estadoOrganizador)}>
            <span id="lineaV">{lineV}</span> Registrar organizador
          </li>
          <li onClick={() => cambiarEstadoPatrocinador(!estadoPatrocinador)}>
            <span id="lineaV">{lineV}</span> Registrar patrocinador
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownAdmin;
