import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import EditarInformacionDeEventos from '../components/EditarInformacionDeEventos';
import NavbarCreateEvent from '../components/NavBars/NavBarCreateEvent';

function EditarEvento(){
    return(
        <div className='containerSlider'>
            <NavbarCreateEvent/>
            <EditarInformacionDeEventos/>
        </div>
    )
}
export default EditarEvento;