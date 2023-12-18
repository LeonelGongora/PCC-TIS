import React, { Component, useEffect } from "react";
import ListaEquipos_baja from "../components/ListaEquipos_baja";
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
import {URL_API, URL_IMG} from '../const';
import ModalAutentificacion from "../components/ModalWindows/ModalAutentificacion";
import ModalRegistroUsuario from "../components/ModalWindows/ModalRegistroUsuario";

const buscar = (
  <FontAwesomeIcon
    icon={faMagnifyingGlass}
    size="lg"
    style={{ color: "#000000" }}
  />
);

const cookies = new Cookies();

class DarBajaEvento extends Component {

  id = cookies.get('id_usuario');
  se_Registro = cookies.get('se_Registro');
  
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loader: false,
      url: `${URL_API}/miseventos`,
      urle: `${URL_API}/misequipos`,
      tipos_de_evento: [],
      estadoBanner: false,
      estadoBannerModal: false,
      estadoDarseBaja: false,
      estadoAutentficacion: false,
      estadoRegistroUsuario : false,
	    nombreEventoBann: "",
      euid:"",
      pe: "",
      nombre_equipo:"",
    };
    this.eventos = [];
    this.equipos = [];
  }

  getEquipos = async () => {

    this.setState({ loader: true });
    if(!this.id){
      this.setState({ estadoAutentficacion: true });
    }else{
    const idu = cookies.get('id_usuario')
    const events = await axios.get(`${this.state.urle}/${idu}`);
    this.equipos = Array.from(events.data.events);
    // console.log(this.equipos);
    this.setState({ events: events.data, loader: false });
    var i;
    var fecha;
    var fecha1;
    //fecha_inicio
    for (i = 0; i < this.equipos.length; i++) {
      fecha = new Date(this.equipos[i].fecha_fin);
      var dia = fecha.getDate() + 1;
      var mes = fecha.getMonth() + 1;
      let format4 = dia + "-" + mes + "-" + fecha.getFullYear();
      this.equipos[i].fecha_fin = format4;

      fecha1 = new Date(this.equipos[i].fecha_inicio);
      var dia1 = fecha1.getDate() + 1;
      var mes1 = fecha1.getMonth() + 1;
      let format5 = dia1 + "-" + mes1 + "-" + fecha1.getFullYear();
      this.equipos[i].fecha_inicio = format5;
    }
    }
  };

  componentDidMount() {
    
    this.getEquipos();
    if(this.se_Registro){
      console.log("Re regstro")
    }
    console.log(this.id)
  }

	cambiarEstadoBanner = (estado) => {
    this.setState({ estadoBanner: estado });
    this.getEquipos();
  };
  cambiarDarseBaja = (estado) => {
    this.setState({ estadoDarseBaja: estado });
  };
  
  setNombreEvento = (nom, euid, pe, nombre_equipo) => {
    this.setState({ nombreEventoBann: nom, euid: euid, pe: pe, nombre_equipo:nombre_equipo });
  };

  darDeBaja = async (estado, nombre, euid, pe, nombre_equipo) => {
    // const url = `http://127.0.0.1:8000/api/eventousuarios/${euid}`;
    // await axios.delete(url);
    // this.getEvents();
    this.setNombreEvento(nombre, euid, pe, nombre_equipo);
    this.cambiarDarseBaja(estado);
  };

  cambiarEstadoAutentificacion = (estado) => {
    this.setState({ estadoAutentficacion: estado });
  };

  cambiarEstadoModalRegistroUsuario = (nuevoEstado) => {
    this.setState({ estadoRegistroUsuario: nuevoEstado });
  }

  render() {
    return (
      <div className="App">
        <ModalAutentificacion
          estado1={this.state.estadoAutentficacion}
          cambiarEstado1={this.cambiarEstadoAutentificacion}
          cambiarEstadoModalRegistroUsuario={this.cambiarEstadoModalRegistroUsuario}
        />

        <ModalRegistroUsuario
          estadoRegistroUsuario={this.state.estadoRegistroUsuario}
          cambiarEstadoModalRegistroUsuario={this.cambiarEstadoModalRegistroUsuario}
          cambiarEstado1={this.cambiarEstadoAutentificacion}
        />

        <ModalDarseBaja
          estadoDarseBaja1={this.state.estadoDarseBaja}
          cambiarEstadoDarseBaja1={this.cambiarDarseBaja}
          cambiarEstadoBanner2={this.cambiarEstadoBanner}
          nombreBanner1={this.state.nombreEventoBann}
          euid={this.state.euid}
          pe = {this.state.pe}
          ne = {this.state.nombre_equipo}
        />
        <div className="background-image"></div> {/* Componente de fondo */}
        <div className="content">
          <NavbarUser />
          <div className="contenedor">
            <Banner_informativo
              estadoBanner1={this.state.estadoBanner}
              cambiarEstadoBanner1={this.cambiarEstadoBanner}
              nombreBanner1={this.state.nombreEventoBann}
              pe={this.state.pe}
            />
            {this.equipos[0] == null ? (
                  <div>
                    <p className="tituloEvento-home">DAR DE BAJA EQUIPO DE EVENTO</p>
                    <h1 className='tituloEvento-home'>No Hay Eventos Disponibles</h1>
                </div>
              ) : (<>
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">DAR DE BAJA EQUIPO DE EVENTO</p>
                </div>
                <div className="columna1">
                  <ListaEquipos_baja />
                  {this.equipos.map((evento, id) => {
                    return (
                      <div
                        key={evento.euid}
                        className="containerEvents containerEventsBaja"
                      >
                        <h4 className="nombreEquipoBaja">{evento.nombre_equipo}</h4>
                        <img
                          className="imagenEventoBaja"
                          src={
                            evento.name === null
                              ? imgPred
                              : `${URL_IMG}/images/` + evento.name
                          }
                          alt="Logo del evento"
                        />
                        <h4 className="nombreEventoBaja">{evento.nombre_evento}</h4>
                        <h4 className="tipoEventoBaja">{evento.nombre_tipo_evento}</h4>
                        <div>
                          {evento.participantes_equipo <= 1 ? (
                            <h4 className="modalidadEventoBaja">Individual</h4>
                          ) : (
                            <h4 className="modalidadEventoBaja">Equipo de {evento.participantes_equipo}</h4>
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
                              evento.participantes_equipo,
                              evento.nombre_equipo
                            )
                          }
                        >
                          Dar baja Equipo
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
