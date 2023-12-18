import React from "react";
import "../stylesheets/ContenedorSliderStyles.css";
import InfoEvento from "../components/InfoEvento";
import NavbarAdmin from "../components/NavBars/NavbarAdmin";
function ContenedorSliderAdmin() {
    return (
        <div className="containerSlider">
            <NavbarAdmin />
            <InfoEvento />
        </div>
    );
}

export default ContenedorSliderAdmin;
