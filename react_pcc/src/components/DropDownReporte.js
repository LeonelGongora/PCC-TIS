import React, { useState, useEffect } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const lineV = <FontAwesomeIcon icon={faAngleRight} />;

function DropdownReporte({
  setOpenDropFath,
  isOpen,
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

  const cargo = cookies.get('login_userCargo')
  const [cadenaPrivilegio, setCadenaPrivilegio] = useState('');

  useEffect(() => {
    const cadena = cookies.get('login_userPrivilegio');
    if (cadena != undefined){
      setCadenaPrivilegio(cadena)
    }
  }, [])

  return (
    <div className="dropdown-container">
      {cadenaPrivilegio != '' || cadenaPrivilegio == 'admin'? (
        <button
          className={`${isOpen ? "dropdown-button-active" : "dropdown-button"}`}
          onMouseEnter={toggleDropdown}
        >
          REPORTES{" "}
          <FontAwesomeIcon className="dropdownIcon" icon={faChevronDown} />
        </button>
       ) : (null)}
      {isOpen && (
        <ul className="dropdown-menu" onMouseLeave={toggleDropdown}>
          {cadenaPrivilegio.charAt(24) == 1 || cadenaPrivilegio == 'admin'? (
            <li onClick={visualizarReportes}>
              <span id="lineaV">{lineV}</span> Reporte General
            </li>
          ) : (null)}
        </ul>
      )}
    </div>
  );
}

export default DropdownReporte;
