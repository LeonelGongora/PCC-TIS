import React from "react";
import "../../stylesheets/NavbarStyles.css";
import "../Dropdown.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from "../Dropdown";

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
                <div className='navbarRight'>
                    <div className="desplegable1">
                        <Dropdown estado1={ estado1} cambiarEstado1={cambiarEstado1} 
                        estadoOrganizador = {estadoOrganizador} cambiarEstadoOrganizador = {cambiarEstadoOrganizador} 
                        estadoPatrocinador = {estadoPatrocinador} cambiarEstadoPatrocinador = {cambiarEstadoPatrocinador} 
                        />
                    </div>
                    <a><FontAwesomeIcon className='buttonNoti' icon={faBell} /></a>
                    <div className='userId'>
                        <a><FontAwesomeIcon className='userIcon' icon={faUser} /></a>
                        <h3>Andrews V.</h3>
                    </div>
                    <div>
                        <button className='navbarAcceder'>Acceder</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarAdmin;
