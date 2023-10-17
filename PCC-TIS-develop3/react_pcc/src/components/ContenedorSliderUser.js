import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/ContenedorSliderStyles.css";
import NavbarUser from './NavbarUser';
import VisualizarInformacionDeEventosUser from './VisualizarInformacionDeEventosUser';
function ContenedorSliderUser(){
    return(
        <div className='containerSlider'>
            <NavbarUser/>
            <VisualizarInformacionDeEventosUser/>
            </div>
    )
}

export default ContenedorSliderUser;