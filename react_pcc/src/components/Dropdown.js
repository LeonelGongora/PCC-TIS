import React, { useState, useEffect } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

  const cargo = cookies.get('login_userCargo')
  const [cadenaPrivilegio, setCadenaPrivilegio] = useState('');

  useEffect(() => {
    const cadena = cookies.get('login_userPrivilegio');
    if (cadena != undefined){
      setCadenaPrivilegio(cadena)
    }
    console.log(cadena)
  }, [])

  return (
    <div className="dropdown-container">
      {cadenaPrivilegio != '' || cadenaPrivilegio == 'admin'? (
        <button
          className={`${isOpen ? "dropdown-button-active" : "dropdown-button"}`}
          onMouseEnter={toggleDropdown}
        >
          EVENTOS{" "}
          <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
        </button>
      ) : (null)}
      {isOpen && (
        <ul className="dropdown-menu" onMouseLeave={toggleDropdown}>
          {cadenaPrivilegio.charAt(0) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={crearEventoRedireccionar}>
              <span id="lineaV">{lineV}</span> Registrar evento
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(2) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={editarEventoRedireccionar}>
              <span id="lineaV">{lineV}</span> Editar evento
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(4) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={() => cambiarEstado1(!estado1)}>
              <span id="lineaV">{lineV}</span> Crear tipo de evento
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(6) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={visualizarEventoRedireccionar}>
              <span id="lineaV">{lineV}</span> Visualizar eventos
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(8) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={visualizarParticipantesRedireccionar}>
              <span id="lineaV">{lineV}</span> Visualizar participantes de eventos
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(10) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={registrarActividadRedireccionar}>
              <span id="lineaV">{lineV}</span> Registrar actividad
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(12) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={eliminarActividadRedireccionar}>
              <span id="lineaV">{lineV}</span> Eliminar actividad
            </li>
          ) : (null)}
          {cadenaPrivilegio.charAt(14) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={configurarFormularioRedireccionar}>
              <span id="lineaV">{lineV}</span> Configurar formulario
            </li>
          ) : (null)}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
