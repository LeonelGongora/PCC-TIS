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
import ModalAnuncio from '../components/ModalWindows/ModalAnuncio';
import imgPred from "../images/afiche.png";
import {URL_API,URL_IMG} from '../const';


const cookies = new Cookies();

class PaginaEditarEventos extends Component {
  eventos = [];

  state = {
    events: [],
    loader: false,
    url: `${URL_API}/events`,
    estadoModal: false,
    estadoModalOrganizador: false,
    estadoModalPatrocinador: false,
    estadoModalAnuncio: false,
    EventoAbierto_Api_Url: configApi.EVENTOABIERTOS_USUARIO_API_URL,
  };

  getEvents = async () => {
    this.setState({ loader: true });
    const events = await axios.get(this.state.EventoAbierto_Api_Url);
    this.eventos = Array.from(events.data.events);
    console.log(events);

    this.setState({ events: events.data, loader: false });
    //console.log(this.eventos[0].nombre_tipo_evento)
    var i;
    var fecha;
    var fecha1;

    for (i = 0; i < this.eventos.length; i++) {
      fecha = new Date(this.eventos[i].fecha_fin);
      var dia = fecha.getDate() + 1;
      var mes = fecha.getMonth() + 1;
      let format4 = dia + "-" + mes + "-" + fecha.getFullYear();
      this.eventos[i].fecha_fin = format4;

      fecha1 = new Date(this.eventos[i].fecha_inicio);
      var dia1 = fecha1.getDate() + 1;
      var mes1 = fecha1.getMonth() + 1;
      let format5 = dia1 + "-" + mes1 + "-" + fecha1.getFullYear();
      this.eventos[i].fecha_inicio = format5;
    }
  };

    masDetalles(id){
        cookies.set('ultimo_id_evento', id, {path: "/"});
        // console.log(cookies.get('idauxiliar'));
        window.location.href='./editar-evento';
    }
  componentDidMount() {
    this.getEvents();
  }

  // masDetalles(id) {
  //   cookies.set("idauxiliar", id, { path: "/" });
  //   // console.log(cookies.get('idauxiliar'));
  //   window.location.href = "./editar-evento";
  // }

  cambiarEstadoModal = (nuevoEstado) => {
    this.setState({ estadoModal: nuevoEstado });
  };

  cambiarEstadoModalOrganizador = (nuevoEstado) => {
    this.setState({ estadoModalOrganizador: nuevoEstado });
  };

  cambiarEstadoModalPatrocinador = (nuevoEstado) => {
    this.setState({ estadoModalPatrocinador: nuevoEstado });
  };

  cambiarEstadoModalAnuncio = (nuevoEstado) => {
    this.setState({ estadoModalAnuncio: nuevoEstado });
  };

  render() {
    return (
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
          cambiarEstadoModalPatrocinador={this.cambiarEstadoModalPatrocinador}
        />
        <ModalAnuncio
          estadoAnuncio={this.state.estadoModalAnuncio}
          cambiarEstadoAnuncio={this.cambiarEstadoModalAnuncio}
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
            estadoAnuncio={this.state.estadoModalAnuncio}
            cambiarEstadoAnuncio={this.cambiarEstadoModalAnuncio}
          />

          <div className="contenedor">
            {this.eventos[0] == null ? (
              <div>
                <p className="tituloEvento-home">EDITAR EVENTO</p>
                <h1 className="tituloEvento-home">
                  No Hay Eventos Disponibles
                </h1>
              </div>
            ) : (
              <>
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">EDITAR EVENTOS</p>
                </div>
                <div className="columna1">
                  <ListaEventos />

                  {this.eventos.map((evento, id) => {
                    return (
                      <>
                        <div
                          className="containerEvents"
                          onClick={() => this.masDetalles(evento.id)}
                        >
                          <img
                            className="imageEvent"
                            src={
                              evento.name === null
                                ? imgPred
                                : `${URL_IMG}/images/` + evento.name
                            }
                            alt="Logo del evento"
                          />
                          <h4 className="nombreEvento">
                            {evento.nombre_evento}
                          </h4>
                          <h4 className="tipoEv">
                            {evento.nombre_tipo_evento}
                          </h4>
                          <h4>{evento.fecha_inicio}</h4>
                          <div>
                            {evento.participantes_equipo <= 1 ? (
                              <h4>Individual</h4>
                            ) : (
                              <h4>Equipo de {evento.participantes_equipo}</h4>
                            )}
                          </div>
                        </div>
                      </>
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

export default PaginaEditarEventos ;