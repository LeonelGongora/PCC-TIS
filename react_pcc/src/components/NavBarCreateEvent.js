import React from 'react';
// import ReactDOM from 'react-dom';
import "../stylesheets/NavbarStyles.css";

function NavbarCreateEvent(){
    return (
      <nav>
        <div className="logoName">
          <h1 className="name">PCC</h1>
          <a>
            <img
              className="imageNav"
              src={require("../images/logo512.png")}
              alt="Logo del sistema"
            />
          </a>
        </div>
      </nav>
    );
}

export default NavbarCreateEvent;