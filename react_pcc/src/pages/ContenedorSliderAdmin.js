import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import NavbarAdmin from '../components/NavbarAdmin';
import VisualizarInformacionDeEventosAdmin from '../components/VisualizarInformacionDeEventosAdmin';
import NavbarCreateEvent from '../components/NavBarCreateEvent';
function ContenedorSliderAdmin(){
    return(
        <div className='containerSlider'>
            <NavbarCreateEvent/>
            <VisualizarInformacionDeEventosAdmin/>
            </div>
    )
}

export default ContenedorSliderAdmin;