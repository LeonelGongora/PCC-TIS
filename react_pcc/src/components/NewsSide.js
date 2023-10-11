import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/NewsSideStyles.css";
import News from './News';

function NewsSide(){
    return(
        <div className='contenedorNoticias'>
            <h2>
                Noticias
            </h2>
            <div className='noticias'>
                
            </div>
        </div>
    )
}

export default NewsSide;