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
import ModalRejectionTeam from '../components/ModalWindows/ModalRejectionTeam';

const cookies = new Cookies();

class AcceptTeamToEvent extends Component{
    
    equipos = []
    usuarios = []
    
    constructor(props) {
        super(props);
        this.state  = {
            event: [],
            equipos : [],
            usuarios: [],
            events: [],
            e: [],
            user: [],
            nombre_evento: '',
            requisitos: [],
            url: "http://127.0.0.1:8000/api/events",
            loader:false,
            estadoModal: false,
            estadoModalOrganizador:false,
            estadoModalPatrocinador: false,
            estadoModalRejection: false,
            mostrarInfoTeam: false,
            nombre_equipo:'',
            id:'',
        };
        this.EventUser_Url_Api = configApi.EVENTUSER3_API_URL;
        this.EventoUsuario_Url_Api= configApi.EVENTO_USUARIO_API_URL;
        this.Event_Url_Api= configApi.EVENTOC_API_URL;
        this.Notification_Url_Api= configApi.NOTIFICATION_API_URL;
        this.NotificationTeam_Url_Api=configApi.NOTIFICATIONTEAM_API_URL;
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

    cambiarEstadoModalRejection = (nuevoEstado, id, nombre_equipo) => {
        this.setState({ estadoModalRejection: nuevoEstado, id: id, nombre_equipo: nombre_equipo });
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

    getEquipos=async()=>{
        const idevent = cookies.get('auteId');
        const url = `http://127.0.0.1:8000/api/getporevento/${idevent}`
        const response = await axios.get(url);
        
        // console.log(response.data.teams)
        this.equipos = Array.from(response.data.teams);
        this.setState({ equipos: response.data.teams});
        let arrayUsuarios = []
        // console.log(this.equipos)

        for (let i = 0; i < this.equipos.length; i++) {

            this.usuarios.push(this.equipos[i].users)
            // console.log(this.equipos[i].users)
        }
        // console.log(this.usuarios[1])
        this.setState({ loader: false});
        this.i = this.i-(this.equipos.length*2)
    }

    componentDidMount(){
        this.getEquipos();
        this.getEvent();
        // this.getAllUsers();
    }

    aceptarEquipo = async (id, nombre_equipo) =>{
        const url = `http://127.0.0.1:8000/api/teams/${id}`
        await axios.put(url, {
            solicitud: 1,
        })
        .then(response=>{
            const contenido = `Tu equipo: ${nombre_equipo}, ha sido aceptado en el evento: ${this.state.nombre_evento}`
            console.log(contenido)
            axios.post(this.Notification_Url_Api, {
                contenido: contenido,
                informacion: null,
                leido: 1
            })
            .then(response=>{
                axios.post(this.NotificationTeam_Url_Api, {
                    notification_id: response.data.id,
                    team_id: id
                }).then(response=>{
                    window.location.reload();
                })
            })
        })
        // this.getAllEvents();
        // window.location.href = window.location.href;
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
                <ModalRejectionTeam estadoRejection={ this.state.estadoModalRejection} 
                cambiarEstadoModalRejection={this.cambiarEstadoModalRejection}
                id_evento = {this.state.id_evento}
                id_equipo ={this.state.id}
                nombre_equipo = {this.state.nombre_equipo}
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
                                        {this.state.requisitos.map((r, index) => {  
                                            return (<div key={r.id}>
                                                <p className='requisitosTexto'>{index+1}. {r.contenido_requisito}</p>
                                            </div>);
                                        })}
                                    
                                    </div>
                                    <div>
                                    {this.equipos.map((e, index) => {  
                                        index=index-1
                                        return (<div key={e.id}>
                                            <div onClick={this.toggleContenedor} className='containerUserSol contTeam'>
                                                <FontAwesomeIcon className='buttonIconUser' icon={faUsers} />
                                                <h4 className='nameUser'>{`${e.nombre_equipo}`}</h4>

                                                {/* <a onClick={()=>window.location.href = `${evento.requisitoZip}`}><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a> */}
                                                <a href = {`${e.zip}`} target="_blank" rel="noopener noreferrer" download><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a>
                                                
                                                <button onClick={() => this.aceptarEquipo(e.id, e.nombre_equipo)} className='buttonAcceptUser'> Aceptar </button>
                                                <button onClick={() =>this.cambiarEstadoModalRejection(!this.state.estadoModal, e.id, e.nombre_equipo)} className='buttonDenyUser'> Rechazar </button>
                                
                                            </div>
                                            
                                            <div className={`contenedorInfoTeam ${this.state.mostrarInfoTeam ? 'mostrando' : ''}`}>
                                                <h3 >Coach: {e.nombreCoach} {e.apellidoCoach}</h3>
                                                {this.usuarios[index+1]?.map((usuario) => {
                                                return (
                                                <div key={usuario.id} className='contParticip'>
                                                    <div className='imgUserTeam'>
                                                        <FontAwesomeIcon className='buttonIconUserT' icon={faUser} />
                                                    </div>
                                                    <div className='infoParticipante'>
                                                        <h2>{`${usuario.nombre} ${usuario.apellido}`}</h2>
                                                        <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">{usuario.email}</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder={usuario.email}
                                                            readOnly
                                                            />
                                                        </div>
                                                        {/* <div className="infoMailPart" id="entradaTeam">
                                                            <p id="textoCuadro">Polera</p>
                                                            <input
                                                            id="inputRegistro"
                                                            type="text"
                                                            name="nombre_evento"
                                                            placeholder="andrewsvalguz@gmail.com"
                                                            readOnly
                                                            />
                                                        </div> */}
                                                    </div>
                                                </div>
                                                );
                                                })}
                                                
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