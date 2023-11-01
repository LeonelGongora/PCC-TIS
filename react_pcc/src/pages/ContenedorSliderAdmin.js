import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import NavbarAdmin from '../components/NavbarAdmin';
import VisualizarInformacionDeEventosAdmin from '../components/VisualizarInformacionDeEventosAdmin';
function ContenedorSliderAdmin(){
    return(
        <div className='containerSlider'>
            <NavbarAdmin/>
            <VisualizarInformacionDeEventosAdmin/>
            </div>
    )
}

export default ContenedorSliderAdmin;