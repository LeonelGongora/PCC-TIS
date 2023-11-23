import React, {Component} from 'react';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
// import ModalRegister from '../components/ModalWindows/ModalRegister';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalAnuncio from '../components/ModalWindows/ModalAnuncio';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const buscar = <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#000000",}} />;

const cookies = new Cookies();

class Home_Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loader: false,
      url: "http://127.0.0.1:8000/api/events",
      estadoModal: false,
      estadoModalOrganizador: false,
      estadoModalPatrocinador: false,
      estadoModalAnuncio: false,
      tipos_de_evento: [],
    };
    this.eventos = [];
  }

  getEventTypes = async () => {
    const url = "http://127.0.0.1:8000/api/type-events";

    //this.setState({loader:true});
    const respuesta = await axios.get(url);
    console.log(respuesta);
    this.setState({ tipos_de_evento: respuesta.data.events });

    //this.eventos = Array.from(events.data.events)
    //this.setState({ loader:false});
  };

  getEvents = async () => {
    this.setState({ loader: true });
    const events = await axios.get(this.state.url);
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

      fecha1 = new Date(this.eventos[i].fecha_limite);
      var dia1 = fecha1.getDate() + 1;
      var mes1 = fecha1.getMonth() + 1;
      let format5 = dia1 + "-" + mes1 + "-" + fecha1.getFullYear();
      this.eventos[i].fecha_limite = format5;
    }
  };

  componentDidMount() {
    this.getEvents();
    this.getEventTypes();
  }

  masDetalles(id) {
    cookies.set("idauxiliar", id, { path: "/" });
    // console.log(cookies.get('idauxiliar'));
    window.location.href = "./event-admin";
  }

  cambiarEstadoModal = (nuevoEstado) => {
    this.setState({ estadoModal: nuevoEstado });
  };

  cambiarEstadoModalOrganizador = (nuevoEstado) => {
    this.setState({ estadoModalOrganizador: nuevoEstado });
  };

    getEvents = async () => {

        this.setState({loader:true});
        const events = await axios.get(this.state.url);
        this.eventos = Array.from(events.data.events)

        this.setState({ events: events.data, loader:false});
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
        this.getEventTypes();
    }

    masDetalles(id){
        cookies.set('idauxiliar', id, {path: "/"});
        // console.log(cookies.get('idauxiliar'));
        window.location.href='./event-admin';
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

    manejarBuscador = (e) => {

      if (e.target.matches("#buscador")){
        if (e.key ==="Escape") {e.target.value = ""}
      
        document.querySelectorAll(".containerEvents").forEach(evento =>{
          evento.querySelector(".nombreEvento").textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?evento.classList.remove("filtro")
            :evento.classList.add("filtro")
        })
      }
    };

    manejar_Filtro_Por_Tipo = (e) => {
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
    }

  manejarBuscador = (e) => {
    if (e.target.matches("#buscador")) {
      if (e.key === "Escape") {
        e.target.value = "";
      }
    };

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
            <div className="contenedorTitulo-home">
              <p className="tituloEvento-home">VISUALIZAR EVENTOS</p>

              <div className="filtrarElementos-admin">
                <div className="entradaBuscador-admin">
                  <input
                    type="text"
                    name="buscador"
                    id="buscador-admin"
                    placeholder="Buscar..."
                    onChange={this.manejarBuscador}
                  />
                  <span id="botonBuscar-admin">{buscar}</span>
                </div>
                <div className="capsulaDesplegable-admin">
                  <select
                    id="desplegable-admin"
                    onChange={this.manejar_Filtro_Por_Tipo}
                  >
                    <option disabled selected>
                      {" "}
                      Seleccione tipo evento
                    </option>
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
                        src={"http://127.0.0.1:8000/images/" + evento.name}
                        alt="Logo del evento"
                      />
                      <h4 className="nombreEvento">{evento.nombre_evento}</h4>
                      <h4 className="tipoEv">
                        {evento.event_type.nombre_tipo_evento}
                      </h4>
                      <h4>{evento.fecha_limite}</h4>
                      <h4>{evento.fecha_fin}</h4>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home_Admin;