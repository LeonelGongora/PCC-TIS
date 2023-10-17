import React from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/VisualizarInformacionDeEventos.css'
import Logo from '../images/Csharp.png'

function VisualizarInformacionDeEventosUser(){
    return(
        <div className='visualizadorDeEventos'>
            <h1 className='Titulo'>Taller sobre capacitacion sobre lenguaje C#</h1>
            <div className='grid-layout'>
                <div className='logo'><img className="logoimg" src={Logo}></img></div>
                <div className='informacion'>
                    <div className='descripcion'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with. </div>
                    <div className='requerimientos'>Lorem Ipsum is simply dummy text of the printing and typesetting.</div>
                </div>
                <div className='inscripciones'>inscripciones cerradas</div>  
            </div>
            <div className='buttons'>
                <button className='miButtonRegistrar'>Registrarse</button>
            </div>
            
        </div>
        
    )
}

export default VisualizarInformacionDeEventosUser;