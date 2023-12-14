import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

function Dropdown({
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

  const registrarActividadRedireccionar = () => {
    window.location.href = "./paginaRegistrarActividad";
  };

  const eliminarActividadRedireccionar = () => {
    window.location.href = "./paginaEliminarActividad";
  };

  const configurarFormularioRedireccionar = () => {
    window.location.href = "./paginaConfigurarFormulario";
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
          <li onClick={visualizarEventoRedireccionar}>
            <span id="lineaV">{lineV}</span> Visualizar eventos
          </li>
          <li onClick={visualizarParticipantesRedireccionar}>
            <span id="lineaV">{lineV}</span> Visualizar participantes de eventos
          </li>
          <li onClick={registrarActividadRedireccionar}>
            <span id="lineaV">{lineV}</span> Registrar actividad
          </li>
          <li onClick={eliminarActividadRedireccionar}>
            <span id="lineaV">{lineV}</span> Eliminar actividad
          </li>
          <li onClick={configurarFormularioRedireccionar}>
            <span id="lineaV">{lineV}</span> Configurar formulario
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
