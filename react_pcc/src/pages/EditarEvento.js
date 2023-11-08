import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import NavbarUser from '../components/NavbarUser';
import EditarInformacionDeEventos from '../components/EditarInformacionDeEventos';
import NavbarCreateEvent from '../components/NavBarCreateEvent';


function EditarEvento(){
    return(
        <div className='containerSlider'>
            <NavbarCreateEvent/>
            <EditarInformacionDeEventos/>
        </div>
    )
}

export default EditarEvento;