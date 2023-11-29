import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Dropdown({
  estado1,
  cambiarEstado1,
  estadoOrganizador,
  cambiarEstadoOrganizador,
  estadoPatrocinador,
  cambiarEstadoPatrocinador,
  estadoAnuncio,
  cambiarEstadoAnuncio,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const crearEventoRedireccionar = () => {
    window.location.href = "./add-event";
  };

  const aceptarUsuarioRedireccionar = () => {
    window.location.href = "./eventacceptUser";
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

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        OPCIONES{" "}
        <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={crearEventoRedireccionar}>Registrar evento</li>
          <li onClick={() => cambiarEstado1(!estado1)}>Crear tipo de evento</li>
          <li onClick={() => cambiarEstadoOrganizador(!estadoOrganizador)}>
            Registrar organizador
          </li>
          <li onClick={() => cambiarEstadoPatrocinador(!estadoPatrocinador)}>
            Registrar patrocinador
          </li>
          <li onClick={() => cambiarEstadoAnuncio(!estadoAnuncio)}>
            Crear anuncio
          </li>
          <li onClick={aceptarUsuarioRedireccionar}>Administrar solicitudes</li>
          <li onClick={editarEventoRedireccionar}>Editar evento</li>
          <li onClick={visualizarEventoRedireccionar}>Visualizar eventos</li>
          <li onClick={visualizarParticipantesRedireccionar}>Visualizar participantes de eventos</li>
          
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
