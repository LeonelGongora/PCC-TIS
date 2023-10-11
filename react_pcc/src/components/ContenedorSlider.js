
import "../stylesheets/ContenedorSliderStyles.css";
import TipoDeEvento from './TipoDeEvento';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
//import { dataSlider } from '../dataSlider';

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