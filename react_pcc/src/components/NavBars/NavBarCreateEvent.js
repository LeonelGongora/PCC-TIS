import React from 'react';
import "../../stylesheets/NavbarStyles.css";

function NavbarCreateEvent(){
    return (
      <nav>
        <div className="logoName">
          <a href="./home">
            <img
              className="imageUmss"
              src={require("../../images/logo512Umss.png")}
              alt="Logo Umss"
              style={{ maxHeight: "64px" }}
            />

          </a>
          
          <h1 className="name">SanSi Cup</h1>

          <img
            className="imageNav"
            src={require("../../images/logo512.png")}
            alt="Logo del sistema"
          />
        </div>
      </nav>
    );
}

export default NavbarCreateEvent;