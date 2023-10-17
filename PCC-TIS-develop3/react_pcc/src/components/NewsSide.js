import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/NewsSideStyles.css";
import News from './News';

function NewsSide(){
    return(
        <div className='contenedor-Noticias'>
            <h2 className='title-contenedorNoticias'>
                Noticias
            </h2>
            <div className='noticias'>
                <News/>
                <News/>
                <News/>
                <News/>
                <News/>
                <News/>
                <News/>
            </div>
        </div>
    )
}

export default NewsSide;