import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

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
          <li onClick={crearEventoRedireccionar}>
            {" "}
            <span id="lineaV">{lineV}</span> Registrar evento
          </li>
          <li onClick={() => cambiarEstado1(!estado1)}>
            {" "}
            <span id="lineaV">{lineV}</span> Crear tipo de evento
          </li>
          <li onClick={() => cambiarEstadoOrganizador(!estadoOrganizador)}>
            <span id="lineaV">{lineV}</span> Registrar organizador
          </li>
          <li onClick={() => cambiarEstadoPatrocinador(!estadoPatrocinador)}>
            <span id="lineaV">{lineV}</span> Registrar patrocinador
          </li>
          <li onClick={() => cambiarEstadoAnuncio(!estadoAnuncio)}>
            <span id="lineaV">{lineV}</span> Crear anuncio
          </li>
          <li onClick={aceptarUsuarioRedireccionar}>
            <span id="lineaV">{lineV}</span> Administrar solicitudes
          </li>
          <li onClick={editarEventoRedireccionar}>
            <span id="lineaV">{lineV}</span> Editar evento
          </li>
          <li onClick={visualizarEventoRedireccionar}>
            <span id="lineaV">{lineV}</span> Visualizar eventos
          </li>
          <li onClick={visualizarParticipantesRedireccionar}>
            <span id="lineaV">{lineV}</span> Visualizar participantes de eventos
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
