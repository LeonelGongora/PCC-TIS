import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function DropdownUserDinamico({estado1,cambiarEstado1, estadoOrganizador, cambiarEstadoOrganizador, estadoPatrocinador, cambiarEstadoPatrocinador}) {
	const [isOpen, setIsOpen] = useState(false);
  const cargo = cookies.get('login_userCargo')
  const cadenaPrivilegio = cookies.get('login_userPrivilegio')

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

  const cerrarSession = () => {
    cookies.set('login_userId', "", {path: "/"});
    cookies.set('login_userCargo', "", {path: "/"});
    cookies.set('login_userPrivilegio', "", {path: "/"});
		window.location.href='/login';
	};

	return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        OPCIONES
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {cadenaPrivilegio.charAt(0) == 1 ? (
            <li onClick={crearEventoRedireccionar}>Registrar evento</li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(2) == 1 ? (
            <li onClick={() => cambiarEstado1(!estado1)}>Crear tipo de evento</li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(4) == 1 ? (
            <li onClick={() => cambiarEstadoOrganizador(!estadoOrganizador)}>Registrar organizador</li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(6) == 1 ? (
            <li onClick={() => cambiarEstadoPatrocinador(!estadoPatrocinador)}>Registrar patrocinador</li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(8) == 1 ? (
            <li onClick={aceptarUsuarioRedireccionar}>Administrar solicitudes</li>
          ) : ( null )}
          {cadenaPrivilegio.charAt(10) == 1 ? (
		        <li onClick={editarEventoRedireccionar}>Editar evento</li>
          ) : ( null )}
          	<li onClick={cerrarSession}>Cerrar Sesion</li>
		      {/* <li onClick={visualizarEventoRedireccionar}>Visualizar eventos</li> */}
        </ul>
      )}
    </div>
  );
}

export default DropdownUserDinamico;
