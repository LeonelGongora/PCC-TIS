import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

function DropdownReporteDinamico({
  setOpenDropFath,
  isOpen
}) {

  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("reportes");
    }
  };

  const cargo = cookies.get('login_userCargo')
  const cadenaPrivilegio = cookies.get('login_userPrivilegio')

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
        {cadenaPrivilegio.charAt(18) == 1 ? (
          <li>
            <span id="lineaV">{lineV}</span> Reporte General
          </li>
        ) : ( null )}
        </ul>
      )}
    </div>
  );
}

export default DropdownReporteDinamico;
