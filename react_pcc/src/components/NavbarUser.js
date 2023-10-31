import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/NavbarStyles.css";

function NavbarUser(){
    return (
      <nav>
        <div className="logoName">
          <h1 className="name">PCC</h1>
          <a href="">
            <img
              className="imageNav"
              src={require("../images/logo512.png")}
              alt="Logo del sistema"
            />
          </a>
        </div>
        <div>
          <ul id="navbar"></ul>
        </div>
      </nav>
    );
}

export default NavbarUser;