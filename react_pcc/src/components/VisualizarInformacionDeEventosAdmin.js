

import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/ViewEventStyle.css'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import img from '../images/afiche.png';
import vid from '../images/fondo1.mp4';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoAbierto_Api_Url = configApi.EVENTOABIERTOS_USUARIO_API_URL;

function VisualizarInformacionDeEventosAdmin({props}){

    const [actividades, setActividades] = useState ( [] );
    const [event, setEvent] = useState ( [] );
    // const [id, setId] = useState ('8');
    // const id = props.id_evento;
    const id = cookies.get('idauxiliar');
    const [cerrado, setCerrado] = useState(false);
    const [requisitos, setRequisitos] = useState ( [] );
    const [tipoevent, setTipoevent] = useState ( [] );
    const [patrocinadores, setPatrocinadores] = useState ( [] );
    const [organizadores, setOrganizadores] = useState ( [] );

    useEffect(()=>{
        getEvent()
        getEstaInscripcionCerrada()
    }, [])

    const getEvent=async()=>{
        const url = `${Eventos_Api_Url}/${id}`;
        const response = await axios.get(url)
        setEvent(response.data)
        setRequisitos(response.data.requirements)
        setTipoevent(response.data.event_type)
        setPatrocinadores(response.data.sponsors)
        setOrganizadores(response.data.organizers)
        setActividades(response.data.activities)
        console.log(response.data.name === null)
        console.log(id)
    }

    useEffect(()=>{
       console.log(requisitos)
       console.log(organizadores)
       console.log(tipoevent)
    }, )

    const getEstaInscripcionCerrada=async()=>{
        const url = `${EventoAbierto_Api_Url}/${id}`;
        const response = await axios.get(url)
        console.log(response.data.pasoInscripcion)
        // cookies.set('pasoInscripcion', response.data.pasoInscripcion, {path: "/"});
        setCerrado(response.data.pasoInscripcion);
    }

    return(
        <div className='visualizadorDeEventos'>
            <video id="video-background" autoPlay muted loop>
            <source src={vid} type="video/mp4"/>
                Tu navegador no soporta la etiqueta de video.
            </video>
        <div className='grid-layout'>            
            <div className='gTitulo'> <h1 className='Titulo'>{event.nombre_evento}</h1></div>
            {event.name === null ? (
                <>
                <div className='gLogo'><img src={img}></img></div>
                </>
                
                ) : (<>
                <div className='gLogo'><img src={"http://127.0.0.1:8000/images/"+event.name}></img></div>
                </>
                )}
            
            <div className='gDescripcion'>
                <p id="textoCuadroDescripcion">Descripcion</p>
                <div className='descripcion'>{event.descripcion}</div>
            </div>
            <div className='gRequisitos'>
                <p id="textoCuadroRequerimientos">Requisitos</p>
                <div className='requerimientos'>
                    {requisitos.map((r) => {  
                    return (<div key={r.id}>
                        {r.contenido_requisito} 
                        {/* Este taller contendra Este taller contendra Este taller contendra Este taller contendra */}
                    </div>);
                    })}
                </div>
            </div>
            <div className='gTipoEvento'>
                <p id="textoCuadroTipoEvento">Tipo de Evento</p>
                <div className='tipoDeEvento'>{tipoevent.nombre_tipo_evento} </div>
            </div>
            <div className='gNParticipantes'>
                <p id="textoCuadroParticipantes">Modalidad</p>
                <div className='participantes'>{event.participantes_equipo}</div>
            </div>
            {cerrado == true ? (
                <div className='fechaLimite'>La Fecha de inscripciones estan Cerradas</div>  
                ) : (
            <div className='gFecLim'>
                <p id="textoCuadroLimite">Fecha Limite de Inscripcion</p>
                <div className='fechaLimite'>{event.fecha_limite} </div>
            </div>
                )}
            <div className='gFecIni'>
                <p id="textoCuadroInicio">Inicio de Evento</p>
                <div className='fechaInicio'>{event.fecha_inicio} </div>
            </div>
            <div className='gFecFin'>
                <p id="textoCuadroFinal">Fin de Evento</p>
                <div className='fechaFinal'>{event.fecha_fin}</div>
            </div>
            <div className='prueba'>
            {actividades.map((a) => {
                return (<div className='padre'key={a.id}>
                    <div className='gEtapa'>
                        <p id="textoCuadroFinal">{a.nombre_actividad}</p>
                        <p className='desc' id="textoCuadroFinal">Descripcion</p>
                        <div className='etapaDesc'>{a.descripcion_actividad} </div>
                    </div>
                    <div className='etapas'>
                    <div className='gIniEtapa'>
                        <p id="textoCuadroFinal">Inicio</p>
                        <div className='etapaIni'>{a.fecha_inicio_actividad}</div>
                    </div>
                    <div className='gFinEtapa'>
                        <p id="textoCuadroFinal">Final</p>
                        <div className='etapaFin'>{a.fecha_fin_actividad}</div>
                    </div>
                    </div>
                    </div>);
            })}
            </div>
            
            <div className='vacio1'></div>
            <div className='gOrg'>
                <p id="textoCuadroOrg">Organizadores</p>
                <div className='organizadores-visualizar'>
                    {organizadores.map((o) => {  
                    return (<div className='image-visualizarEvento' key={o.id}>
                    <img className='imagen' src={"http://127.0.0.1:8000/imagenesOrganizadores/"+o.imagen_organizador}></img>
                    </div>);
                    })}
                {/* <img className='imagen' src={img}></img><img className='imagen' src={img}></img><img className='imagen' src={img}></img><img className='imagen' src={img}></img><img className='imagen' src={img}></img> */}
                </div>
            </div>
            <div className='gPat'>
                <p id="textoCuadroPat">Patrocinadores</p>
                <div className='patrocinadores-visualizar'>
                    {patrocinadores.map((p) => {  
                    return (<div key={p.id}>
                    <img className='imagen' src={"http://127.0.0.1:8000/imagenesPatrocinadores/"+p.imagen_patrocinador}></img>
                    </div>);
                    })}
                {/* <img className='imagen' src={img}></img><img className='imagen' src={img}></img><img className='imagen' src={img}></img><img className='imagen' src={img}></img><img className='imagen' src={img}></img> */}
                </div>
            </div>
            <div className='gContacto'>
                <p id="textoCuadroCont">Contacto</p>
            </div>
            <div className='gTelf'>
               <p id="textoCuadroTelf">Telefono</p>
               <div className='telefono'>{event.numero_contacto} </div>
            </div>
            <div className='vacio'></div>
            </div>
            
        </div>
    )
}

export default VisualizarInformacionDeEventosAdmin;