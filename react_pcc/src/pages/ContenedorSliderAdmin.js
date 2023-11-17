import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import VisualizarInformacionDeEventosAdmin from '../components/VisualizarInformacionDeEventosAdmin';
import NavbarCreateEvent from '../components/NavBars/NavBarCreateEvent';
function ContenedorSliderAdmin(){
    return(
        <div className='containerSlider'>
            <NavbarCreateEvent/>
            <VisualizarInformacionDeEventosAdmin/>
            </div>
    )
}

export default ContenedorSliderAdmin;