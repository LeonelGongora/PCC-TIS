
import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/ViewEventStyle.css'
import Logo from '../images/Csharp.png'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { useActionData } from 'react-router-dom';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EstaResUserEvent_Api_Url = configApi.ESTAREGUSEREVENT_API_URL;
const EventoAbierto_Api_Url = configApi.EVENTOABIERTOS_USUARIO_API_URL;

function VisualizarInformacionDeEventosUser ({props}) {

    const [event, setEvent] = useState ( [] );
    const id = cookies.get('idauxiliar');
    const [registrado, setRegistrado] = useState(false);
    const [cerrado, setCerrado] = useState(false);

    useEffect(()=>{
        getEvent()
        getEstaRegistrado()
        getEstaInscripcionCerrada()
    }, [])

    const getEvent=async()=>{
        const url = `${Eventos_Api_Url}/${id}`;
        const response = await axios.get(url)
        setEvent(response.data)
    }

    const getEstaRegistrado=async()=>{
        const url = `${EstaResUserEvent_Api_Url}`;
        await axios.post(url, {
            event_id: id,
            user_id: "1"
        })
        .then(response=>{
            if(response.data[0].user_id){
                setRegistrado(true)
            } 
            // console.log(response.data[0].user_id)
            console.log("Esta registrado")
            // console.log(registrado)
            cookies.set('estaRegistrado', true, {path: "/"});
            console.log(cookies.get('estaRegistrado'))
        })
        .catch(error=>{
            setRegistrado(!registrado)
            console.log("no esta registrado")
            // console.log(registrado)
            cookies.set('estaRegistrado', false, {path: "/"});
            console.log(cookies.get('estaRegistrado'))
        })
    }

    const getEstaInscripcionCerrada=async()=>{
        const url = `${EventoAbierto_Api_Url}/${id}`;
        const response = await axios.get(url)
        console.log(response.data.pasoInscripcion)
        cookies.set('pasoInscripcion', response.data.pasoInscripcion, {path: "/"});
    }

    const irRegistro =async()=>{
        window.location.href='./register-to-event';
    };

    return(
        <div className='visualizadorDeEventos'>

            <h1>{event.nombre_evento}</h1>

            <div className='grid-layout'>

                <div className='logo'><img src={"http://127.0.0.1:8000/images/" + event.name}></img></div>
                {/* <div className='logo'><img src={event.name}></img></div> */}

                <div className='informacion'>
                    <div className='descripcion'>{event.descripcion} </div>
                    <div className='requerimientos'>{event.requisitos}</div>
                 </div>
                 {cookies.get('estaRegistrado') == true && cookies.get('pasoInscripcion') == true ? (
                 <div className='inscripciones'>Ya esta Registrado en este Evento</div>  
                 ) : (
                    null
                )}
                {cookies.get('pasoInscripcion') == true && cookies.get('estaRegistrado') == false ? (

                 <div className='inscripciones'>La Fecha de inscripciones estan Cerradas</div>  
                 ) : (
                    null
                )}
                {cookies.get('estaRegistrado') == true && cookies.get('pasoInscripcion') == false ? (
                 <div className='inscripciones'>Ya esta Registrado en este Evento</div>  
                 ) : (
                    null
                )}
                {/* {cookies.get('pasoInscripcion') == false && cookies.get('estaRegistrado') == false ? (
                 <div className='inscripciones'>La Fecha de inscripciones estan Cerradas</div>  
                 ) : (
                    null
                )} */}  
            </div>
            <div className='buttons'>
                {/* <button className='miButtonRegistrar'>Registrarse</button> */}
                {cookies.get('estaRegistrado') == true || cookies.get('pasoInscripcion') == true ? (
                    null
                ) : (
                    <button onClick={()=>irRegistro()} className='miButtonRegistrar'>Registrarse</button>
                )}
            </div>

        </div>

    )
}

export default VisualizarInformacionDeEventosUser;