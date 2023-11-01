import React from "react";
import "../stylesheets/NavbarStyles.css";
import "./Dropdown.js";

import Dropdown from "./Dropdown";

function NavbarAdmin() {
    return (
        <>
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
                    <Dropdown/>
                </div>
            </nav>
        </>
    );
}

export default NavbarAdmin;
