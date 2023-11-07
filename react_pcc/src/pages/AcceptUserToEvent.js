import React, {Component} from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import "../stylesheets/AcceptUserToEventStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import configApi from '../configApi/configApi';

const cookies = new Cookies();

class AcceptUserToEvent extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: [],
            user: [],
            loader:false,
        };
        this.EventUser2_Url_Api = configApi.EVENTUSER3_API_URL;
        this.EventoUsuario_Url_Api= configApi.EVENTO_USUARIO_API_URL;
        this.eventos = []
        this.usuarios = []
        this.url = ''
        this.nameEvent = []
    }

    getAllEvents = async () => {
        const idevent = cookies.get('auteId');
        console.log(idevent)
        // this.setState({loader:true});
        const events = await axios.get(`${this.EventUser2_Url_Api}/${idevent}`);
        console.log(events)
        this.eventos = Array.from(events.data)
        console.log(this.eventos)
        this.setState({ events: events.data, loader:false});
        // console.log(this.state.events)
    };

    componentDidMount(){
        this.getAllEvents();
    }

    aceptarParticipante = async (id) =>{
        console.log(id);
        await axios.put(`${this.EventoUsuario_Url_Api}/${id}`, {
            solicitud: 1,
        })
        // this.getAllEvents();
        window.location.href = window.location.href;
    }

    render(){

        return(

            <div className="App">
                <div className="background-image"></div> {/* Componente de fondo */}
                <div className="content">
                   <NavbarAdmin/>
                   <div className="contenedor">
                        <div className="contenedorSolicitudes">

                            {this.eventos[0] == null ? (
                                <h1 className='tituloPagAcept'>No Hay Solicitudes</h1>
                            ) : (
                            <>
                            { this.eventos.map((evento,id) => {  
                                return (<div key={evento.eventuserid}>

                                    {this.nameEvent.includes(evento.nombre_evento) ? (
                                        null
                                    ) : (
                                        <>
                                        {this.nameEvent.push(evento.nombre_evento)}
                                        <h1 className='tituloPagAcept'>{evento.nombre_evento}</h1>
                                        </>
                                    )}

                                    <div className='containerUserSol'>
                                        <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                                        <h4 className='nameUser'>{`${evento.nombre} ${evento.apellido}`}</h4>

                                        {/* <a onClick={()=>window.location.href = `${evento.requisitoZip}`}><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a> */}
                                        <a href = {`${evento.requisitoZip}`} target="_blank" rel="noopener noreferrer" download><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a>
                                        {evento.solicitud == 1 ? (
                                            null
                                        ) : (
                                            <button onClick={()=>this.aceptarParticipante(evento.eventuserid)} className='buttonAcceptUser'> Aceptar </button>

                                        )}
                                    </div>

                                </div>);
                            })}
                            </>
                        )}

                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

export default AcceptUserToEvent;