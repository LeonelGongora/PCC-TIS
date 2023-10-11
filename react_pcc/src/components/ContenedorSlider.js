import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/ContenedorSliderStyles.css";
import TipoDeEvento from './TipoDeEvento';
import { dataSlider } from '../dataSlider';

function ContenedorSlider(){
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const item1 = dataSlider.find((item) => item.id === currentIndex+1);
    const item2 = dataSlider.find((item) => item.id === currentIndex+2);
    const item3 = dataSlider.find((item) => item.id === currentIndex+3);
    const dataSize = dataSlider.length - 3;
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === dataSize ? 0 : prevIndex + 1));
    };
    
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? dataSize : prevIndex - 1));
    };

    return(
    <div className='contenedorSl'>
        {/*<div onClick={prevSlide} className='botonSlider'>
            &#8249;
        </div>
         <div className='containerSlider'>
                {item1.categoria}
                {item2.categoria}
                {item3.categoria}
        </div> 
        <div onClick={nextSlide} className='botonSlider'>
            &#8250;
        </div>*/}
    </div>
    )
}

export default ContenedorSlider;