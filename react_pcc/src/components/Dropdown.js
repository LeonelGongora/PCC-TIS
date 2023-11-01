import React, { useState } from "react";
import "../stylesheets/Dropdown.css";

function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        OPCIONES
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>Crear evento</li>
          <li>Crear tipo de evento</li>
          <li>Registrar organizador</li>
          <li>Registrar patrocinador</li>
          <li>Administrar solicitudes</li>
		  <li>Editar evento</li>
		  <li>Visualizar eventos</li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
