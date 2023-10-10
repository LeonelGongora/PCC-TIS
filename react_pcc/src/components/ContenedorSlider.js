import React from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import TipoDeEvento from './TipoDeEvento';

function ContenedorSlider(){
    return(
        <div className='contenedor'>
            <a href=''>
                ASD
            </a>
            <div className='containerSlider'>
                <TipoDeEvento/>
                <TipoDeEvento/>
                <TipoDeEvento/>
            </div>
            <a>
                ASD
            </a>
        </div>
    )
}

export default ContenedorSlider;