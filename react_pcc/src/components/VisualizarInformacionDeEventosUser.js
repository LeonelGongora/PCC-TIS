
import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/ViewEventStyle.css'
import Logo from '../images/Csharp.png'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;

function VisualizarInformacionDeEventosUser ({props}) {

    const [event, setEvent] = useState ( [] );
    // const [id, setId] = useState ('8');
    // const id = props.id_evento;
    const id = cookies.get('idauxiliar');

    useEffect(()=>{
        getEvent()
    }, [])

    const getEvent=async()=>{
        const url = `${Eventos_Api_Url}/${id}`;
        const response = await axios.get(url)
        setEvent(response.data)
    }

    const irRegistro =async()=>{
        window.location.href='./register-to-event';
    };

    return(
        <div className='visualizadorDeEventos'>

            <h1>{event.nombre_evento}</h1>

            <div className='content1'>

                <div className='logo'><img src={"http://127.0.0.1:8000/images/" + event.name}></img></div>
                {/* <div className='logo'><img src={event.name}></img></div> */}

                <div className='informacion'>
                    <div className='descripcion'>{event.descripcion} </div>
                    <div className='requerimientos'>{event.requisitos}</div>
                 </div>
            </div>
            <div className='buttons'>
                {/* <button className='miButtonRegistrar'>Registrarse</button> */}
                <button onClick={()=>irRegistro()} className='btn btn-danger'>Registrarse</button>
            </div>

        </div>

    )
}

export default VisualizarInformacionDeEventosUser;