import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function DropdownNotification({ }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="dropdown-container">
      <button className={`${isOpen ? 'dropdown-button-notification-active' : 'dropdown-button-notification '}`} onClick={toggleDropdown}>
        <FontAwesomeIcon className="dropdownIcon-notification" icon={faBell} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu-notification">
          <li>Registrarse a Eventos</li>
          <li>Visualizar eventos</li>
          <li>Darse de Baja de evento</li>
        </ul>
      )}
    </div>
  );
}

export default DropdownNotification;
