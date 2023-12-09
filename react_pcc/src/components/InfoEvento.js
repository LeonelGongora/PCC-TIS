

import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/InfoEventStyles.css'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import imgFondo from '../images/FondoInfoEve.jpeg';
import img from '../images/afiche.png';
import ImagenAmpliable from './ModalWindows/ImagenAmpliable';
import {URL_IMG} from '../const';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoAbierto_Api_Url = configApi.EVENTOABIERTOS_USUARIO_API_URL;

function InfoEvento({props}){

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
        console.log(response)
        setEvent(response.data)
        setRequisitos(response.data.requirements)
        setTipoevent(response.data.event_type)
        setPatrocinadores(response.data.sponsors)
        setOrganizadores(response.data.organizers)
        setActividades(response.data.activities)
        console.log(response.data.name === null)
        console.log(id)
    }

    const getEstaInscripcionCerrada=async()=>{
        const url = `${EventoAbierto_Api_Url}/${id}`;
        const response = await axios.get(url)
        console.log(response.data.pasoInscripcion)
        // cookies.set('pasoInscripcion', response.data.pasoInscripcion, {path: "/"});
        setCerrado(response.data.pasoInscripcion);
    }

    return(
        
        <div className='visualizadorDeEventos'>
            <img src={imgFondo} alt={"Imagen de fondo"} className="imgBackground" />
            <div className='contenedorInfoEvento'>            
                <div className='contTitulo'>
                    <h1 className='eventTitulo'>{event.nombre_evento}</h1>
                </div>
                <div className='contenedorInf'>
                    <div className='infoTextoEvento'>
                        <div className='descrGeneral'>
                            <h2>Informacion del evento</h2>
                            <div className='descripcionEvento'>
                                <h3>Descripcion</h3>
                                <p>{event.descripcion}</p>
                            </div>
                            <div className='descripcionEvento tipMod'>
                                <div className='infoTipoEvento'>
                                    <h3>Tipo de Evento</h3>
                                    <p>{tipoevent.nombre_tipo_evento}</p>
                                </div>
                                <div className='infoModalidad'>
                                    <h3>Modalidad</h3>
                                    {event.participantes_equipo <= 1 ? (
                                        <p>Individual</p>
                                    ) : (
                                        <p>Equipos de {event.participantes_equipo}</p>
                                    )}
                                </div>
                            </div>
                            <div className='descripcionEvento infoFechas'>
                                <h3>Fechas del evento</h3>
                                <div className='cuadroFechas'>
                                    <div className='fechaAct'>
                                        <h4>Fecha inicio del evento</h4>
                                        <p>{event.fecha_inicio}</p>
                                    </div>
                                    <div className='fechaAct'>
                                        <h4>Fecha fin del evento</h4>
                                        <p>{event.fecha_fin}</p>
                                    </div>
                                </div>
                            </div>
                            {event.requisitos != [] ? (
                                <div className='descripcionEvento infoRequisitos'>
                                    <h3>Requisitos</h3>
                                    {requisitos.map((r, index) => {  
                                    return (<p key={r.id}>{index + 1}. &nbsp;
                                        {r.contenido_requisito}
                                    </p>);
                                    })}
                                </div>
                            ):(
                                <div>
                                </div>
                            )}
                            
                            <div className='descripcionEvento seccionExtra'>
                                <h3>Titulo de seccion</h3>
                                <p>Descripcion de seccion</p>
                            </div>
                            <div className='descripcionEvento infoContacto'>
                                <h3>Contacto</h3>
                                <p>Telefono: {event.numero_contacto}</p>
                            </div>
                        </div>
                        {actividades != [] ? (
                            <div className='actividadesExtra'>
                            {actividades.map((a) => {
                                return (<div className='infoActividad' key={a.id}>
                                <h2>{a.nombre_actividad}</h2>
                                <div className='descripcionEvento infoFechas'>
                                    <h3>Fechas de la actividad</h3>
                                    <div className='cuadroFechas'>
                                        <div className='fechaAct'>
                                            <h4>Fecha inicio del evento</h4>
                                            <p>{a.fecha_inicio_actividad}</p>
                                        </div>
                                        <div className='fechaAct'>
                                            <h4>Fecha fin del evento</h4>
                                            <p>{a.fecha_fin_actividad}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='descripcionEvento descripcionActividad'>
                                    <h3>Descripcion</h3>
                                    <p>{a.descripcion_actividad}</p>
                                </div>
                            </div>);
                            })}  
                            </div>
                        ):(
                            <div>
                            </div>
                        )}
                        
                    </div>
                    <div className='imgEvento'>
                    <div className='aficheEvento'>
                    {event.name === null ? (
                        <>
                        <ImagenAmpliable src={img}/>
                        </>
                        ) : (<>
                        <ImagenAmpliable src={`${URL_IMG}/images/`+event.name} alt="Imagen" />
                        </>
                        )}
                        
                    </div>
                        
                        <div className='contenedorOrganizadores'>
                            <h2>Organizadores</h2>
                            <div className='organizadores'>
                                <div className='contOrganizador'>
                                {organizadores.map((o) => {  
                                return (<div key={o.id}>
                                <img className='imagenSlv' src={`${URL_IMG}/imagenesOrganizadores/`+o.imagen_organizador}></img>
                                </div>);
                                })}
                                <img className='imagenSlv' src={`${URL_IMG}/images/`+event.name}></img>
                                <img className='imagenSlv' src={`${URL_IMG}/images/`+event.name}></img>
                                <img className='imagenSlv' src={`${URL_IMG}/images/`+event.name}></img>
                                </div>
                            </div>
                        </div>
                        
                        {event.patrocinadores != null ? (
                            <div className='contenedorOrganizadores contPatrocinadores'>
                            <h2>Patrocinadores</h2>
                            <div className='organizadores'>
                                <div className='patrocinadoresGold'>
                                {patrocinadores.map((p) => {  
                                return (<div key={p.id}>
                                <img className='imagenGld' src={`${URL_IMG}/imagenesPatrocinadores/`+p.imagen_patrocinador}></img>
                                </div>);
                                })}
                                </div>
                                <div className='patrocinadoresSilver'>
                                {patrocinadores.map((p) => {  
                                return (<div key={p.id}>
                                <img className='imagenSlv' src={`${URL_IMG}/imagenesPatrocinadores/`+p.imagen_patrocinador}></img>
                                </div>);
                                })}
                                </div>
                                <div className='patrocinadoresBronce'>
                                {patrocinadores.map((p) => {  
                                return (<div key={p.id}>
                                <img className='imagenBrc' src={`${URL_IMG}/imagenesPatrocinadores/`+p.imagen_patrocinador}></img>
                                </div>);
                                })}
                                </div>
                            </div>
                        </div>
                        ):(
                            <div></div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoEvento;