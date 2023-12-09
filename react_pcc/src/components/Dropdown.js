import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <li onClick={crearEventoRedireccionar}>
            <span id="lineaV">{lineV}</span> Registrar evento
          </li>
          <li onClick={editarEventoRedireccionar}>
            <span id="lineaV">{lineV}</span> Editar evento
          </li>
          <li onClick={() => cambiarEstado1(!estado1)}>
            <span id="lineaV">{lineV}</span> Crear tipo de evento
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

export default Dropdown;
