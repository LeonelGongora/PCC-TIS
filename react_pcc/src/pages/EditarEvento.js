import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import EditarInformacionDeEventos from '../components/EditarInformacionDeEventos';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';

function EditarEvento(){
    return(
        <div className='containerSlider'>
            <NavbarAdmin/>
            <EditarInformacionDeEventos/>
        </div>
    )
}
export default EditarEvento;