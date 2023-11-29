import React, {Component} from 'react';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";

import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import configApi from '../configApi/configApi';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import imgPred from "../images/afiche.png";


const cookies = new Cookies();

class PaginaAdministrarSolicitudes extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            estadoModal: false,
            estadoModalOrganizador:false,
            estadoModalPatrocinador: false,
        };
        this.EventoAbierto_Api_Url = configApi.EVENTOABIERTOS_USUARIO_API_URL;
        this.eventos = []
    }

    getEvents = async () => {
        const events = await axios.get(this.EventoAbierto_Api_Url);
        this.eventos = Array.from(events.data.events)
        // console.log(events)
        this.setState({ events: events.data, loader:false});
        // console.log(this.eventos)
        var i;
        var fecha;
        var fecha1;

        for (i = 0; i < this.eventos.length; i++) {
            fecha = new Date(this.eventos[i].fecha_fin)
            var dia = fecha.getDate() + 1
            var mes = fecha.getMonth() + 1
            let format4 = dia + "-" + mes + "-" + fecha.getFullYear();
            this.eventos[i].fecha_fin = format4

            fecha1 = new Date(this.eventos[i].fecha_limite)
            var dia1 = fecha1.getDate() + 1
            var mes1 = fecha1.getMonth() + 1
            let format5 = dia1 + "-" + mes1 + "-" + fecha1.getFullYear();
            this.eventos[i].fecha_limite = format5
            
        }

    };

    componentDidMount(){
        this.getEvents();
    }

    masDetalles(id, participantes){
        cookies.set('auteId', id, {path: "/"});

        if(participantes > 0){
          //cookies.set('participantes_equipo', participantes, {path: "/"});
          window.location.href='./acceptTeam';
        }else{
          window.location.href='./acceptUser';
        }
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


    render(){

        return(

            <div className="App">
                <ModalWindow estado1={ this.state.estadoModal} cambiarEstado1={this.cambiarEstadoModal}/>

                <ModalWindowOrganizadores estadoOrganizador={ this.state.estadoModalOrganizador} cambiarEstadoModalOrganizador={this.cambiarEstadoModalOrganizador}/>

                <ModalWindowPatrocinadores estadoPatrocinador={ this.state.estadoModalPatrocinador} cambiarEstadoModalPatrocinador={this.cambiarEstadoModalPatrocinador}/>

                <div className="background-image"></div> {/* Componente de fondo */}
                <div className="content">
                   <NavbarAdmin estado1={ this.estadoModal} cambiarEstado1={this.cambiarEstadoModal} 
                   estadoOrganizador={ this.estadoModalOrganizador} cambiarEstadoOrganizador={this.cambiarEstadoModalOrganizador}
                   estadoPatrocinador={ this.estadoModalPatrocinador} cambiarEstadoPatrocinador={this.cambiarEstadoModalPatrocinador}/>
                   <div className="contenedor">
                   {this.eventos[0] == null ? (
                        <div>
                        <p className="tituloEvento-home">ADMINISTRAR SOLICITUDES A EVENTOS</p>
                        <h1 className='tituloEvento-home'>No Hay Eventos Disponibles</h1>
                      </div>
                    ) : (<>
                        <div className="contenedorTitulo-home">
                          <p className="tituloEvento-home">ADMINISTRAR SOLICITUDES A EVENTOS</p>
                        </div>
                        <div className="columna1">
                            <ListaEventos/>

                                { this.eventos.map((evento,id) => {
                                    
                                    return (
                                      <div
                                        key={evento.id}
                                        className="containerEvents"
                                        onClick={() =>
                                          this.masDetalles(
                                            evento.id,
                                            evento.participantes_equipo
                                          )
                                        }
                                      >
                                        <img
                                          className="imageEvent"
                                          src={
                                            evento.name === null
                                              ? imgPred
                                              : "http://127.0.0.1:8000/images/" +
                                                evento.name
                                          }
                                          alt="Logo del evento"
                                        />

                                        <h4 className="nombreEvento">
                                          {evento.nombre_evento}
                                        </h4>
                                        <h4 className="tipoEv">
                                          {evento.nombre_tipo_evento}
                                        </h4>
                                        <h4>{evento.fecha_limite}</h4>
                                        <div>
                                          {evento.participantes_equipo <= 1 ? (
                                            <h4>Individual</h4>
                                          ) : (
                                            <h4>
                                              Equipo de{" "}
                                              {evento.participantes_equipo}
                                            </h4>
                                          )}
                                        </div>
                                      </div>
                                    );
                                })}
                        </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default PaginaAdministrarSolicitudes;