import React, { useState } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function DropdownNotification({setOpenDropFath, isOpen}) {
  //const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("notification");
    }
  };
  return (
    <div className="dropdown-container">
      <button
        className={`${isOpen
            ? "dropdown-button-notification-active"
            : "dropdown-button-notification "
          }`}
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon className="dropdownIcon-notification" icon={faBell} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu-notification">
          <li>Notificacion 1</li>
          <li>Notificacion 2</li>
          <li>Notificacion 3</li>
        </ul>
      )}
    </div>
  );
}

export default DropdownNotification;
