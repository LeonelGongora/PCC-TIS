import React, { Component, useEffect } from "react";
import ListaEventos_baja from "../components/ListaEventos_baja";
import "../stylesheets/EventosStyles.css";
import "../App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import NavbarUser from "../components/NavBars/NavbarUser";
import imgPred from "../images/afiche.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Banner_informativo from "../components/Banner_informativo";
import ModalDarseBaja from "../components/ModalWindows/ModalDarseBaja";

const buscar = (
  <FontAwesomeIcon
    icon={faMagnifyingGlass}
    size="lg"
    style={{ color: "#000000" }}
  />
);

const cookies = new Cookies();

class DarBajaEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loader: false,
      url: "http://127.0.0.1:8000/api/miseventos",
      urle: "http://127.0.0.1:8000/api/misequipos",
      tipos_de_evento: [],
      estadoBanner: false,
      estadoBannerModal: false,
      estadoDarseBaja: false,
	    nombreEventoBann: "",
      euid:"",
      pe: "",
    };
    this.eventos = [];
    this.equipos = [];
  }

  getEventTypes = async () => {
    const url = "http://127.0.0.1:8000/api/type-events";

    //this.setState({loader:true});
    const respuesta = await axios.get(url);
    // console.log(respuesta);
    this.setState({ tipos_de_evento: respuesta.data.events });

    //this.eventos = Array.from(events.data.events)
    //this.setState({ loader:false});
  };

  getEvents = async () => {
    
    this.setState({ loader: true });
    if(cookies.get('id_usuario') === '' || cookies.get('id_usuario')=== undefined){
      console.log(`${cookies.get('id_usuario')} No se encuentra registrado`)
    }else{
    const idu = cookies.get('id_usuario')
    const events = await axios.get(`${this.state.url}/${idu}`);
    this.eventos = Array.from(events.data.events);
    // console.log(this.eventos);
    this.setState({ events: events.data, loader: false });
    var i;
    var fecha;
    var fecha1;
    //fecha_inicio
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

  getEquipos = async () => {
    
    this.setState({ loader: true });
    if(cookies.get('id_usuario') === '' || cookies.get('id_usuario')=== undefined){
      console.log(`${cookies.get('id_usuario')} No se encuentra registrado`)
    }else{
    const idu = cookies.get('id_usuario')
    const events = await axios.get(`${this.state.urle}/${idu}`);
    this.equipos = Array.from(events.data.events);
    // console.log(this.equipos);
    // this.setState({ events: events.data, loader: false });
    var i;
    var fecha;
    var fecha1;
    //fecha_inicio
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
    this.getEquipos();
    this.getEvents();
    // this.getEventTypes();
  }

  masDetalles(id) {
    cookies.set("idauxiliar", id, { path: "/" });
    // console.log(cookies.get('idauxiliar'));
    window.location.href = "./event-admin";
  }

	cambiarEstadoBanner = (estado) => {
    this.setState({ estadoBanner: estado });
    this.getEquipos();
    this.getEvents();
  };
  cambiarDarseBaja = (estado) => {
    this.setState({ estadoDarseBaja: estado });
  };
  
  setNombreEvento = (nom, euid, pe) => {
    this.setState({ nombreEventoBann: nom, euid: euid, pe: pe });
  };

  darDeBaja = async (estado, nombre, euid, pe) => {
    // const url = `http://127.0.0.1:8000/api/eventousuarios/${euid}`;
    // await axios.delete(url);
    // this.getEvents();
    this.setNombreEvento(nombre, euid, pe);
    this.cambiarDarseBaja(estado);
  };

  render() {
    return (
      <div className="App">
        <ModalDarseBaja
          estadoDarseBaja1={this.state.estadoDarseBaja}
          cambiarEstadoDarseBaja1={this.cambiarDarseBaja}
          cambiarEstadoBanner2={this.cambiarEstadoBanner}
          nombreBanner1={this.state.nombreEventoBann}
          euid={this.state.euid}
          pe = {this.state.pe}
        />
        <div className="background-image"></div> {/* Componente de fondo */}
        <div className="content">
          <NavbarUser />
          <div className="contenedor">
            <Banner_informativo
              estadoBanner1={this.state.estadoBanner}
              cambiarEstadoBanner1={this.cambiarEstadoBanner}
              nombreBanner1={this.state.nombreEventoBann}
            />
            {this.eventos[0] == null && this.equipos[0] == null ? (
                  <div>
                    <p className="tituloEvento-home">DARSE DE BAJA DE EVENTO</p>
                    <h1 className='tituloEvento-home'>No Hay Eventos Disponibles</h1>
                </div>
              ) : (<>
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">DARSE DE BAJA DE EVENTO</p>
                </div>
                <div className="columna1">
                  <ListaEventos_baja />
                  {this.eventos.map((evento, id) => {
                    return (
                      <div
                        key={evento.euid}
                        className="containerEvents"
                        //   onClick={() => this.masDetalles(evento.id)}
                      >
                        <img
                          className="imageEvent"
                          src={
                            evento.name === null
                              ? imgPred
                              : "http://127.0.0.1:8000/images/" + evento.name
                          }
                          alt="Logo del evento"
                        />
                        <h4 className="nombreEvento">{evento.nombre_evento}</h4>
                        <h4 className="tipoEv">{evento.nombre_tipo_evento}</h4>
                        <h4>{evento.fecha_inicio}</h4>
                        <div>
                          {evento.participantes_equipo <= 1 ? (
                            <h4>Individual</h4>
                          ) : (
                            <h4>Equipo de {evento.participantes_equipo}</h4>
                          )}
                        </div>
                        <button
                          className="botonDarBajaEvento"
                          type="button"
                          onClick={() =>
                            this.darDeBaja(
                              true,
                              evento.nombre_evento,
                              evento.euid,
                              evento.participantes_equipo
                            )
                          }
                        >
                          Darse de baja
                        </button>
                      </div>
                    );
                  })}
                  {this.equipos[0] == null ? (
                    null
                  ) : (
                    <p className="tituloEvento-home">MIS EQUIPOS:</p>
                  )}
                  {this.equipos.map((evento, id) => {
                    return (
                      <div
                        key={evento.euid}
                        className="containerEvents"
                        //   onClick={() => this.masDetalles(evento.id)}
                      >
                        <img
                          className="imageEvent"
                          src={
                            evento.name === null
                              ? imgPred
                              : "http://127.0.0.1:8000/images/" + evento.name
                          }
                          alt="Logo del evento"
                        />
                        <h4 className="nombreEvento">{evento.nombre_evento}</h4>
                        <h4 className="tipoEv">{evento.nombre_tipo_evento}</h4>
                        <h4>{evento.fecha_inicio}</h4>
                        <div>
                          {evento.participantes_equipo <= 1 ? (
                            <h4>Individual</h4>
                          ) : (
                            <h4>Equipo de {evento.participantes_equipo}</h4>
                          )}
                        </div>
                        <button
                          className="botonDarBajaEvento"
                          type="button"
                          onClick={() =>
                            this.darDeBaja(
                              true,
                              evento.nombre_evento,
                              evento.euid,
                              evento.participantes_equipo
                            )
                          }
                        >
                          Darse de baja
                        </button>
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

export default DarBajaEvento;
