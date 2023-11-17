import React, {Component} from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import "../stylesheets/AcceptUserToEventStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import ModalWindow from '../components/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindowPatrocinadores';
import configApi from '../configApi/configApi';

const cookies = new Cookies();

class AcceptUserToEvent extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: [],
            e: [],
            user: [],
            nombre_evento: '',
            requisitos: [],
            loader:false,
            estadoModal: false,
            estadoModalOrganizador:false,
            estadoModalPatrocinador: false,
        };
        this.EventUser_Url_Api = configApi.EVENTUSER3_API_URL;
        this.EventoUsuario_Url_Api= configApi.EVENTO_USUARIO_API_URL;
        this.Event_Url_Api= configApi.EVENTOC_API_URL;
        this.eventos = []
        this.requisitos = []
        this.usuarios = []
        this.url = ''
        this.nameEvent = []
        this.reqEvent = []
    }

    cambiarEstadoModal = (nuevoEstado) => {
        this.setState({ estadoModal: nuevoEstado });
    };

    cambiarEstadoModalOrganizador = (nuevoEstado) => {
        this.setState({ estadoModalOrganizador: nuevoEstado });
    };

    cambiarEstadoModalPatrocinador = (nuevoEstado) => {
        this.setState({ estadoModalPatrocinador: nuevoEstado });
    };

    getAllUsers = async () => {
        const idevent = cookies.get('auteId');
        const events = await axios.get(`${this.EventUser_Url_Api}/${idevent}`);
        this.eventos = Array.from(events.data)
        // console.log(.eventos)
        this.setState({ events: events.data, loader:false});
        // console.log(this.state.events)
    };

    getEvent=async()=>{
        const idevent = cookies.get('auteId');
        const response = await axios.get(`${this.Event_Url_Api}/${idevent}`);
        // console.log(response)
        this.setState({ event: response.data})
  
        if(response.request.status === 200){
          this.setState({
            nombre_evento: response.data.nombre_evento,
            requisitos: response.data.requirements
          });
        }
      }

    componentDidMount(){
        this.getEvent();
        this.getAllUsers();
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
                <ModalWindow
                estado1={this.state.estadoModal}
                cambiarEstado1={this.cambiarEstadoModal}
                />
                <ModalWindowOrganizadores
                estadoOrganizador={this.state.estadoModalOrganizador}
                cambiarEstadoModalOrganizador={this.cambiarEstadoModalOrganizador}
                />
                <ModalWindowPatrocinadores
                estadoPatrocinador={this.state.estadoModalPatrocinador}
                cambiarEstadoModalPatrocinador={
                this.cambiarEstadoModalPatrocinador
                }
                />
                <div className="background-image"></div> {/* Componente de fondo */}
                <div className="content">
                   <NavbarAdmin
                   estado1={this.estadoModal}
                   cambiarEstado1={this.cambiarEstadoModal}
                   estadoOrganizador={this.estadoModalOrganizador}
                   cambiarEstadoOrganizador={this.cambiarEstadoModalOrganizador}
                   estadoPatrocinador={this.estadoModalPatrocinador}
                   cambiarEstadoPatrocinador={this.cambiarEstadoModalPatrocinador}
                   />
                   <div className="contenedor">
                        <div className="contenedorSolicitudes">

                            {this.eventos[0] == null ? (
                                <h1 className='tituloPagAcept'>No Hay Solicitudes</h1>
                            ) : (<>
                            <h1 className='tituloPagAcept'>{this.state.nombre_evento}</h1>
                                <div className='containerReqSol'>
                                    <div className='requisitosDeEvento'>
                                        
                                        {this.state.requisitos.map((r) => {  
                                            return (<div key={r.id}>
                                                <h3 className='subtitleRequisitos'>{r.contenido_requisito}</h3>
                                                {/* <p className='requisitosTexto'>{evento.nombre_evento}</p> */}
                                            </div>);
                                        })}
                                    
                                    </div>
                                    {this.eventos.map((evento) => {  
                                        return (<div key={evento.eventuserid}>
                                            <div className='containerUserSol'>
                                                <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                                                <h4 className='nameUser'>{`${evento.nombre} ${evento.apellido}`}</h4>

                                                {/* <a onClick={()=>window.location.href = `${evento.requisitoZip}`}><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a> */}
                                                <a href = {`${evento.requisitoZip}`} target="_blank" rel="noopener noreferrer" download><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a>
                                                {evento.solicitud == 1 ? (
                                                    null
                                                ) : (
                                                    <><button onClick={() => this.aceptarParticipante(evento.eventuserid)} className='buttonAcceptUser'> Aceptar </button>
                                                    <button onClick={() => this.aceptarParticipante(evento.eventuserid) }className='buttonDenyUser'> Rechazar </button></>
                                                )}
                                            </div>
                                        </div>);
                                    })}
                                </div>           
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