import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function DropdownUser({ setOpenDropFath, isOpen }) {
  //const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("user");
    }
  };

  const registrarseEventoRedireccionar = () => {
    window.location.href = "/paginaRegistrarseEventos";
  };

  const visualizarEventoRedireccionar = () => {
    window.location.href = "/home-participant";
  };

  const darseBajaEventoRedireccionar = () => {
    window.location.href = "/darBajaEvento";
  };

  return (
    <div className="dropdown-container">
      <button
        className={`${isOpen ? "dropdown-button-active" : "dropdown-button"}`}
        onClick={toggleDropdown}
      >
        OPCIONES{" "}
        <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={registrarseEventoRedireccionar}>
            Registrarse a Eventos
          </li>
          <li onClick={visualizarEventoRedireccionar}>Visualizar eventos</li>
          <li onClick={darseBajaEventoRedireccionar}>
            Darse de Baja de evento
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownUser;
