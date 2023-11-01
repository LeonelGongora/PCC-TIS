import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import NavbarUser from '../components/NavbarUser';
import EditarInformacionDeEventos from '../components/EditarInformacionDeEventos';


function EditarEvento(){
    return(
        <div className='containerSlider'>
            <NavbarUser/>
            <EditarInformacionDeEventos/>
        </div>
    )
}

export default EditarEvento;