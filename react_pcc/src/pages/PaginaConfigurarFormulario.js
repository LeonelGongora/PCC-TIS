import React, {Component} from 'react';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";

import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import imgPred from "../images/afiche.png";
import {URL_API, URL_IMG} from '../const';
import ModalEleccionTipoCampo from '../components/ModalWindows/ModalEleccionTipoCampo';
import ModalCampoSeleccion from '../components/ModalWindows/ModalCampoSeleccion';
import ModalWindowAtributo from '../components/ModalWindows/ModalWindowAtributo';
import ModalCampoFecha from '../components/ModalWindows/ModalCampoFecha';
import ModalCampoNumerico from '../components/ModalWindows/ModalCampoNumerico';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import ModalAnuncio from '../components/ModalWindows/ModalAnuncio';

const cookies = new Cookies();

class PaginaConfigurarFormulario extends Component {
  se_Registro = cookies.get("se_Registro");
  id = cookies.get("id_usuario");

  eventos = [];

  state = {
    events: [],
    loader: false,
    url: `${URL_API}/events`,
    estadoModalActividad: false,

    estadoModalEleccion: false,
    estadoCampoSeleccion: false,
    estadoModalAtributo: false,
    estadoCampoNumerico: false,
    estadoCampoFecha: false,
    estadoModal: false,
    estadoModalOrganizador: false,
    estadoModalPatrocinador: false,
    estadoModalAnuncio: false,

    atributos: [],
  };

  getEvents = async () => {
    if (this.se_Registro) {
      //var url2 = `${URL_API}/register-to-events/${this.id}`;
      this.setState({ loader: true });
      const events = await axios.get(this.state.url);

      this.eventos = Array.from(events.data.events);

      this.setState({
        events: events.data,
        loader: false,
        atributos: events.data.attributes,
      });
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
    } else {
      this.setState({ loader: true });
      const events = await axios.get(this.state.url);
      this.eventos = Array.from(events.data.events);

      this.setState({
        events: events.data,
        loader: false,
        atributos: events.data.attributes,
      });
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
    }
  };

  componentDidMount() {
    this.getEvents();
    console.log(this.se_Registro);
  }

  cambiarEstadoModalEleccion = (nuevoEstado) => {
    this.setState({ estadoModalEleccion: nuevoEstado });
  };

  cambiarEstadoCampoSeleccion = (nuevoEstado) => {
    this.setState({ estadoCampoSeleccion: nuevoEstado });
  };

  cambiarEstadoModalAtributo = (nuevoEstado) => {
    this.setState({ estadoModalAtributo: nuevoEstado });
  };

  cambiarEstadoCampoNumerico = (nuevoEstado) => {
    this.setState({ estadoCampoNumerico: nuevoEstado });
  };

  cambiarEstadoCampoFecha = (nuevoEstado) => {
    this.setState({ estadoCampoFecha: nuevoEstado });
  };

  async abrirModalActividad(id, usuariosEvento) {
    console.log(usuariosEvento)
    cookies.set("participantes_Evento", usuariosEvento, { path: "/" });
    cookies.set("id_evento", id, { path: "/" });
    this.cambiarEstadoModalEleccion(!this.state.estadoModalEleccion);
    // console.log(cookies.get('idauxiliar'));
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

  cambiarEstadoModalAnuncio = (nuevoEstado) => {
    this.setState({ estadoModalAnuncio: nuevoEstado });
  };

  render() {
    return (
      <div className="App">
        <ModalEleccionTipoCampo
          estadoEleccion={this.state.estadoModalEleccion}
          cambiarEstadoModalEleccion={this.cambiarEstadoModalEleccion}
          cambiarEstadoModalAtributo={this.cambiarEstadoModalAtributo}
          cambiarEstadoCampoNumerico={this.cambiarEstadoCampoNumerico}
          cambiarEstadoCampoFecha={this.cambiarEstadoCampoFecha}
          cambiarEstadoCampoSeleccion={this.cambiarEstadoCampoSeleccion}
        />
        <ModalCampoSeleccion
          estadoCampoSeleccion={this.state.estadoCampoSeleccion}
          cambiarEstadoCampoSeleccion={this.cambiarEstadoCampoSeleccion}
          atributos={this.state.atributos}
        />
        <ModalWindowAtributo
          estadoAtributo={this.state.estadoModalAtributo}
          cambiarEstadoModalAtributo={this.cambiarEstadoModalAtributo}
          atributos={this.state.atributos}
        />
        <ModalCampoNumerico
          estadoCampoNumerico={this.state.estadoCampoNumerico}
          cambiarEstadoCampoNumerico={this.cambiarEstadoCampoNumerico}
          atributos={this.state.atributos}
        />
        <ModalCampoFecha
          estadoCampoFecha={this.state.estadoCampoFecha}
          cambiarEstadoCampoFecha={this.cambiarEstadoCampoFecha}
          atributos={this.state.atributos}
        />
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
                <p className="tituloEvento-home">CONFIGURAR FORMULARIO</p>
                <h1 className="tituloEvento-home">
                  No Hay Eventos Disponibles
                </h1>
              </div>
            ) : (
              <>
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">CONFIGURAR FORMULARIO</p>
                </div>
                <div className="columna1">
                  <ListaEventos />

                  {this.eventos.map((evento, id) => {
                    return (
                      <div
                        key={evento.id}
                        className="containerEvents"
                        onClick={() => this.abrirModalActividad(evento.id, evento.users)}
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
                          {evento.nombre_evento}{" "}
                        </h4>
                        <h4 className="tipoEv">
                          {evento.event_type.nombre_tipo_evento}
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

export default PaginaConfigurarFormulario ;