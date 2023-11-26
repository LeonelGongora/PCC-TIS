import React,{Component} from 'react';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import "../stylesheets/AcceptUserToEventStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import ModalRejection from '../components/ModalWindows/ModalRejection';
import configApi from '../configApi/configApi';

const cookies = new Cookies();

class AcceptTeamToEvent extends Component{

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
            estadoModalRejection: false,
            mostrarInfoTeam: false,
        };
        this.EventUser_Url_Api = configApi.EVENTUSER3_API_URL;
        this.EventoUsuario_Url_Api= configApi.EVENTO_USUARIO_API_URL;
        this.Event_Url_Api= configApi.EVENTOC_API_URL;
        this.eventos = []
        this.equipos = []
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

    cambiarEstadoModalRejection = (nuevoEstado) => {
        this.setState({ estadoModalRejection: nuevoEstado });
    };

    getAllUsers = async () => {
        //Route::get('/get-team-0/{event_id}', [TeamController::class, 'getTeams0']);
        const idevent = cookies.get('auteId');
        const events = await axios.get(`http://127.0.0.1:8000/api/get-team-0/${idevent}`);
        this.equipos = Array.from(events.data)
        console.log(this.equipos)

        this.setState({ events: events.data, loader:false});
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
    
    
    toggleContenedor = () => {
        this.setState((prevState) => ({
            mostrarInfoTeam: !prevState.mostrarInfoTeam,
        }));
    };

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
                <ModalRejection estadoRejection={ this.state.estadoModalRejection} 
                cambiarEstadoModalRejection={this.cambiarEstadoModalRejection}
                id_evento = {this.state.id_evento}
                id_user ={this.state.user}
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

                            {this.equipos[0] == null ? (
                                <h1 className='tituloPagAcept'>No Hay Solicitudes</h1>
                            ) : (<>
                            <h1 className='tituloPagAcept'>{this.state.nombre_evento}</h1>
                                <div className='containerReqSol'>
                                    <div className='requisitosDeEvento'>
                                        <h3 className='subtitleRequisitos'>Requisitos</h3>
                                        {this.state.requisitos.map((r) => {  
                                            return (<div key={r.id}>
                                                <p className='requisitosTexto'>{r.contenido_requisito}</p>
                                            </div>);
                                        })}
                                    
                                    </div>
                                    <div>
                                    {this.equipos.map((equipo) => {  
                                        return (<div key={equipo.id}>
                                            <div onClick={this.toggleContenedor} className='containerUserSol contTeam'>
                                                <FontAwesomeIcon className='buttonIconTeam' icon={faUsers} />
                                                <h4 className='nameUser'>{equipo.nombre_equipo}</h4>

                                                {/* <a onClick={()=>window.location.href = `${evento.requisitoZip}`}><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a> */}
                                                <a href = {`${equipo.requisitoZip}`} target="_blank" rel="noopener noreferrer" download><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a>
                                                {equipo.solicitud == 1 ? (
                                                    null
                                                ) : (
                                                    <><button onClick={() => this.aceptarParticipante(equipo.id)} className='buttonAcceptUser'> Aceptar </button>
                                                    <button onClick={() =>this.cambiarEstadoModalRejection(!this.state.estadoModal)} className='buttonDenyUser'> Rechazar </button></>
                                                )}
                                            </div>
                                            
                                            <div className={`contenedorInfoTeam ${this.state.mostrarInfoTeam ? 'mostrando' : ''}`}>
                                                <h3>Coach</h3>
                                                <div className='contParticip'>
                                                    <div className='imgUserTeam'>
                                                        <FontAwesomeIcon className='buttonIconUserT' icon={faUser} />
                                                    </div>
                                                    <div className='infoParticipante'>
                                                        <h2>Andrews Valdivia</h2>
                                                        <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">Email</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder="andrewsvalguz@gmail.com"
                                                            readOnly
                                                            />
                                                        </div>
                                                        <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">Polera</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder="andrewsvalguz@gmail.com"
                                                            readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3>Participantes</h3>
                                                <div className='contParticip'>
                                                    <div className='imgUserTeam'>
                                                        <FontAwesomeIcon className='buttonIconUserT' icon={faUser} />
                                                    </div>
                                                    <div className='infoParticipante'>
                                                        <h2>Andrews Valdivia</h2>
                                                        <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">Email</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder="andrewsvalguz@gmail.com"
                                                            readOnly
                                                            />
                                                        </div>
                                                        <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">Polera</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder="andrewsvalguz@gmail.com"
                                                            readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='contParticip'>
                                                    <div className='imgUserTeam'>
                                                        <FontAwesomeIcon className='buttonIconUserT' icon={faUser} />
                                                    </div>
                                                    <div className='infoParticipante'>
                                                        <h2>Andrews Valdivia</h2>
                                                        <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">Email</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder="andrewsvalguz@gmail.com"
                                                            readOnly
                                                            />
                                                        </div>
                                                        <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">Polera</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder="andrewsvalguz@gmail.com"
                                                            readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>);
                                    })}</div>
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

export default AcceptTeamToEvent;