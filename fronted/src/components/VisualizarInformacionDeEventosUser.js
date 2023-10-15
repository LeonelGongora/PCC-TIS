import React from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/VisualizarInformacionDeEventos.css'
import Logo from '../images/Csharp.png'

function VisualizarInformacionDeEventosUser(){
    return(
        <div className='visualizadorDeEventos'>
            <h1 className='Titulo'>Taller sobre capacitacion sobre lenguaje C#</h1>
            <div className='content'>
            <div className='logo'><img className="logoimg" src={Logo}></img></div>
                <div className='informacion'>
                    <div className='descripcion'>Este taller contendra diferentes </div>
                    <div className='requerimientos'>req</div>
                </div>
                <div className='patOrg'>
                    <div className='inscripciones'>inscripciones cerradas</div>
                    <div className='Patrocinadores'>
                        <table>
                            <thead><tr><th>Patrocinadores</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td>a</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <div className='Organizadores'>
                        <table>
                            <thead><tr><th>Organizadores</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td>a</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>   
            </div>
            <div className='buttons'>
                <button className='miButtonRegistrar'>Registrarse</button>
            </div>
            
        </div>
        
    )
}

export default VisualizarInformacionDeEventosUser;