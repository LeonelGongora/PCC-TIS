import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/NavbarStyles.css";
import DropdownUser from './DropDownUser';

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
        <div className="desplegable1">
          <DropdownUser/>

        </div>
      </nav>
    );
}

export default NavbarUser;