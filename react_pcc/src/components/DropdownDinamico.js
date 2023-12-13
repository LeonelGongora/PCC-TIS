import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

function DropdownDinamico({
  estado1,
  cambiarEstado1,
  setOpenDropFath,
  isOpen,
}) {
  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("eventos");
    }
  };

  const crearEventoRedireccionar = () => {
    window.location.href = "./add-event";
  };

  const editarEventoRedireccionar = () => {
    window.location.href = "./paginaEditarEventos";
  };
  const visualizarParticipantesRedireccionar = () => {
    window.location.href = "./paginaVisualizarParticipantes";
  };

  const visualizarEventoRedireccionar = () => {
    window.location.href = "/home-admin";
  };

  const cargo = cookies.get('login_userCargo')
  const cadenaPrivilegio = cookies.get('login_userPrivilegio')

  return (
    <div className="dropdown-container">
      <button
        className={`${isOpen ? "dropdown-button-active" : "dropdown-button"}`}
        onMouseEnter={toggleDropdown}
      >
        EVENTOS{" "}
        <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu" onMouseLeave={toggleDropdown}>
          {cadenaPrivilegio.charAt(0) == 1 ? (
            <li onClick={crearEventoRedireccionar}>
              <span id="lineaV">{lineV}</span> Registrar evento
            </li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(2) == 1 ? (
            <li onClick={editarEventoRedireccionar}>
              <span id="lineaV">{lineV}</span> Editar evento
            </li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(4) == 1 ? (
            <li onClick={() => cambiarEstado1(!estado1)}>
              <span id="lineaV">{lineV}</span> Crear tipo de evento
            </li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(6) == 1 ? (
            <li onClick={visualizarEventoRedireccionar}>
              <span id="lineaV">{lineV}</span> Visualizar eventos
            </li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(8) == 1 ? (
            <li onClick={visualizarParticipantesRedireccionar}>
              <span id="lineaV">{lineV}</span> Visualizar participantes de eventos
            </li>
          ) : ( null )}
        </ul>
      )}
    </div>
  );
}

export default DropdownDinamico;
