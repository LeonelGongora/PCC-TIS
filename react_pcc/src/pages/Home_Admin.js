import React, {Component} from 'react';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalAnuncio from '../components/ModalWindows/ModalAnuncio';
import imgPred from '../images/afiche.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {URL_API, URL_IMG} from '../const';

const buscar = <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#000000",}} />;

const cookies = new Cookies();


class Home_Admin extends Component {

  se_Registro = cookies.get('se_Registro');
  id_usuario = cookies.get('id_usuario');
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loader: false,
      url: `${URL_API}/events`,
      estadoModal: false,
      estadoModalOrganizador: false,
      estadoModalPatrocinador: false,
      estadoModalAnuncio: false,
      tipos_de_evento: [],
    };
    this.eventos = [];
  }

  getEventTypes = async () => {
    const url = `${URL_API}/type-events`;
    const respuesta = await axios.get(url);
    console.log(respuesta);
    console.log(this.eventos)
    this.setState({ tipos_de_evento: respuesta.data.events });

  };

  getEvents = async () => {
    this.setState({ loader: true });
    const events = await axios.get(this.state.url);
    console.log(events)
    
    this.eventos = Array.from(events.data.events);

    this.setState({ events: events.data, loader: false });
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

  masDetalles(id) {
    cookies.set("idauxiliar", id, { path: "/" });
    // console.log(cookies.get('idauxiliar'));
    window.location.href = "./event-admin";
  }

    componentDidMount(){

      if(this.id_usuario){

      }

      //cookies.remove("se_Registro");
      const cookieKeys = Object.keys(cookies.getAll());
      cookieKeys.forEach(key => {
        console.log(key)
        cookies.remove(key);
      });
      this.getEvents();
      this.getEventTypes();
      console.log(this.se_Registro)
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

    manejarBuscador = (e) => {
      let tipo_evento_seleccionado = document.querySelector("#desplegable-admin");
      let tipo_evento_seleccionado_valor = tipo_evento_seleccionado.value;

      if(tipo_evento_seleccionado.value === "Todos"){
        if (e.target.matches("#buscador-admin")){
          if (e.key ==="Escape") {e.target.value = ""}
        
          document.querySelectorAll(".containerEvents").forEach(evento =>{
            evento.querySelector(".nombreEvento").textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?evento.classList.remove("filtro")
              :evento.classList.add("filtro")
          })
        }
      }else{

        if (e.target.matches("#buscador-admin")){
          if (e.key ==="Escape") {e.target.value = ""}

          document.querySelectorAll(".containerEvents").forEach(evento =>{
  
            if(evento.querySelector(".nombreEvento").textContent.toLowerCase().includes(e.target.value.toLowerCase())
              && evento.querySelector(".tipoEv").textContent.toLowerCase().includes(tipo_evento_seleccionado_valor.toLowerCase())){

              evento.classList.remove("filtro")

            }else{
              evento.classList.add("filtro")
            }
          })
        }
      }
    };

    manejar_Filtro_Por_Tipo = (e) => {
      let nombre_seleccionado = document.querySelector("#buscador-admin");
      let nombre_seleccionado_valor = nombre_seleccionado.value;

      if(nombre_seleccionado_valor === ""){

        if(e.target.value === "Todos"){
          document.querySelectorAll(".containerEvents").forEach(evento =>{
              evento.classList.remove("filtro")
          })
  
        }else{
          document.querySelectorAll(".containerEvents").forEach(evento =>{
            evento.querySelector(".tipoEv").textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?evento.classList.remove("filtro")
              :evento.classList.add("filtro")
          })
        }

      }else{

        if(e.target.value === "Todos"){
          document.querySelectorAll(".containerEvents").forEach(evento =>{
            if(evento.querySelector(".nombreEvento").textContent.toLowerCase().includes(nombre_seleccionado_valor.toLowerCase())){
              evento.classList.remove("filtro")
              
            }else{
              evento.classList.add("filtro")
            }
          })
  
        }else{
          document.querySelectorAll(".containerEvents").forEach(evento =>{
  
            if(evento.querySelector(".nombreEvento").textContent.toLowerCase().includes(nombre_seleccionado_valor.toLowerCase())
              && evento.querySelector(".tipoEv").textContent.toLowerCase().includes(e.target.value.toLowerCase())){

              evento.classList.remove("filtro")

            }else{

              evento.classList.add("filtro")

            }
          })
        }
      }
    }

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
              <p className="tituloEvento-home">VISUALIZAR EVENTOS</p>
              <h1 className='tituloEvento-home'>No Hay Eventos Disponibles</h1>
            </div>
          ) : (<>
            <div className="contenedorTitulo-home">
              <p className="tituloEvento-home">VISUALIZAR EVENTOS</p>

              <div className="filtrarElementos-admin">
                <div className="entradaBuscador-admin">
                  <input
                    type="text"
                    name="buscador"
                    id="buscador-admin"
                    placeholder="Buscar por nombre..."
                    onChange={this.manejarBuscador}
                  />
                  <span id="botonBuscar-admin">{buscar}</span>
                </div>
                <div className="capsulaDesplegable-admin">
                  <select
                    id="desplegable-admin"
                    onChange={this.manejar_Filtro_Por_Tipo}
                  >
                    <option> Todos</option>
                    {this.state.tipos_de_evento.map((evento, id) => {
                      return <option>{evento.nombre_tipo_evento}</option>;
                    })}
                  </select>
                </div>
              </div>
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
                            ? (imgPred)
                            : `${URL_IMG}/images/` + evento.name
                        }
                        alt="Logo del evento"
                      />
                      <h4 className="nombreEvento">{evento.nombre_evento}</h4>
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

export default Home_Admin;