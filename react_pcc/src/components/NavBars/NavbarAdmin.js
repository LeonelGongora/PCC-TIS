import React from "react";
import "../../stylesheets/NavbarStyles.css";
import "../Dropdown.js";

import Dropdown from "../Dropdown.js";

function NavbarAdmin({estado1,cambiarEstado1, estadoOrganizador, cambiarEstadoOrganizador,  estadoPatrocinador, cambiarEstadoPatrocinador}) {
    return (
        <>
            <nav>
                <div className="logoName">
                    <h1 className="name">PCC</h1>
                    <a href="">
                        <img
                            className="imageNav"
                            src={require("../../images/logo512.png")}
                            alt="Logo del sistema"
                        />
                    </a>
                </div>
                <div className="desplegable1">
                    <Dropdown estado1={ estado1} cambiarEstado1={cambiarEstado1} 
                    estadoOrganizador = {estadoOrganizador} cambiarEstadoOrganizador = {cambiarEstadoOrganizador} 
                    estadoPatrocinador = {estadoPatrocinador} cambiarEstadoPatrocinador = {cambiarEstadoPatrocinador} />
                </div>
            </nav>
        </>
    );
}

export default NavbarAdmin;
