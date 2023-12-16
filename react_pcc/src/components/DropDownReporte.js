import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

function DropdownReporte({
  setOpenDropFath,
  isOpen,
  cambiarEstadoAnuncio,
  estadoAnuncio,
}) {

  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("reportes");
    }
  };
  const visualizarReportes = () => {
    window.location.href = "./reportes";
  };
  return (
    <div className="dropdown-container">
      <button
        className={`${isOpen ? "dropdown-button-active" : "dropdown-button"}`}
        onMouseEnter={toggleDropdown}
      >
        REPORTES{" "}
        <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu" onMouseLeave={toggleDropdown}>
          <li onClick={visualizarReportes}>
            <span id="lineaV">{lineV}</span> Reporte General
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownReporte;
