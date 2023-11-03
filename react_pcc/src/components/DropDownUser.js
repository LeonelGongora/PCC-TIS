import React, { useState } from "react";
import "../stylesheets/Dropdown.css";

function DropdownUser({estado1,cambiarEstado1, estadoOrganizador, cambiarEstadoOrganizador, estadoPatrocinador, cambiarEstadoPatrocinador}) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

    const registrarseEventoRedireccionar = () => {
		window.location.href='/paginaRegistrarseEventos';
	};

    const visualizarEventoRedireccionar = () => {
		window.location.href='/home-participant';
	};

	return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        OPCIONES
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={registrarseEventoRedireccionar}>Registrarse a Eventos</li>

		  <li onClick={visualizarEventoRedireccionar}>Visualizar eventos</li>
        </ul>
      )}
    </div>
  );
}

export default DropdownUser;
