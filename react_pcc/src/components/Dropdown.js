import React, { useState } from "react";
import "../stylesheets/Dropdown.css";

function Dropdown({estado1,cambiarEstado1, estadoOrganizador, cambiarEstadoOrganizador, estadoPatrocinador, cambiarEstadoPatrocinador}) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

  const crearEventoRedireccionar = () => {
		window.location.href='./add-event';
	};

  const aceptarUsuarioRedireccionar = () => {
		window.location.href='./eventacceptUser';
	};

  const editarEventoRedireccionar = () => {
		window.location.href='./paginaEditarEventos';
	};

  const visualizarEventoRedireccionar = () => {
		window.location.href='/';
	};

  

	return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        OPCIONES
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={crearEventoRedireccionar}>Registrar evento</li>
          <li onClick={() => cambiarEstado1(!estado1)}>Crear tipo de evento</li>
          <li onClick={() => cambiarEstadoOrganizador(!estadoOrganizador)}>Registrar organizador</li>
          <li onClick={() => cambiarEstadoPatrocinador(!estadoPatrocinador)}>Registrar patrocinador</li>
          <li onClick={aceptarUsuarioRedireccionar}>Administrar solicitudes</li>
		  <li onClick={editarEventoRedireccionar}>Editar evento</li>
		  <li onClick={visualizarEventoRedireccionar}>Visualizar eventos</li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
