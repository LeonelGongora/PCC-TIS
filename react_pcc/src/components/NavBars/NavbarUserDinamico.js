import React from "react";
import "../../stylesheets/NavbarStyles.css";
import "../Dropdown.js";

import DropdownUserDinamico from "../DropdownUserDinamico.js";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// import Dropdown from "./Dropdown";

function NavbarUserDinamico({estado1,cambiarEstado1, estadoOrganizador, cambiarEstadoOrganizador,  estadoPatrocinador, cambiarEstadoPatrocinador}) {
    const inicialNombre = cookies.get('login_userNombre').charAt(0)
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
                    <h1 style={{marginLeft: "200px"}} className="name">{cookies.get('login_userCargo')}</h1>
                    <h1 style={{marginLeft: "700px"}} className="name">{inicialNombre}</h1>
                </div>
                <div className="desplegable1">
                    <DropdownUserDinamico estado1={ estado1} cambiarEstado1={cambiarEstado1} 
                    estadoOrganizador = {estadoOrganizador} cambiarEstadoOrganizador = {cambiarEstadoOrganizador} 
                    estadoPatrocinador = {estadoPatrocinador} cambiarEstadoPatrocinador = {cambiarEstadoPatrocinador} />
                </div>
            </nav>
        </>
    );
}

export default NavbarUserDinamico;
