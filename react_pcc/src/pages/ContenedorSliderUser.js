import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/ContenedorSliderStylesOliver.css";
import NavbarUser from '../components/NavbarUser';
import VisualizarInformacionDeEventosUser from '../components/VisualizarInformacionDeEventosUser';
function ContenedorSliderUser(){
    return(
        <div className='containerSlider'>
            <NavbarUser/>
            <VisualizarInformacionDeEventosUser/>
            </div>
    )
}

export default ContenedorSliderUser;