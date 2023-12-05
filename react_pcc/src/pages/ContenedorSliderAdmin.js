import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import NavbarCreateEvent from '../components/NavBars/NavBarCreateEvent';
import InfoEvento from '../components/InfoEvento';
function ContenedorSliderAdmin(){
    return(
        <div className='containerSlider'>
            <NavbarCreateEvent/>
            <InfoEvento/>
            </div>
    )
}

export default ContenedorSliderAdmin;