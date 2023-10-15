import React from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/VisualizarInformacionDeEventos.css'
import Logo from '../images/Csharp.png'
function VisualizarInformacionDeEventosAdmin(){
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
            {/* <div className='buttons'>
                <button className='miButtonEdit'> Editar <svg xmlns="http://www.w3.org/2000/svg"  className="edit" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
                <button className='miButtonVer'>Ver Lista de Participantes</button>
            </div> */}
        </div>
    )
}

export default VisualizarInformacionDeEventosAdmin;