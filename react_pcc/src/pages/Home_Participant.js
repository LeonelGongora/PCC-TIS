import React, {Component} from 'react';
import NavbarUser from '../components/NavBars/NavbarUser';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import imgPred from "../images/afiche.png";
import {URL_API, URL_IMG} from '../const';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const buscar = <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#000000",}} />;

const cookies = new Cookies();

class Home_Participant extends Component{

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loader: false,
      url: `${URL_API}/eventoabiertos`,
      tipos_de_evento: [],
    };
    this.eventos = [];
  }

  getEventTypes = async () => {
    const url = `${URL_API}/type-events`;
    const respuesta = await axios.get(url);
    // console.log(respuesta);
    // console.log(this.eventos)
    this.setState({ tipos_de_evento: respuesta.data.events });

  };
  
    getEvents = async () => {

        this.setState({loader:true});
        const events = await axios.get(this.state.url);
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

            fecha1 = new Date(this.eventos[i].fecha_inicio)
            var dia1 = fecha1.getDate() + 1
            var mes1 = fecha1.getMonth() + 1
            let format5 = dia1 + "-" + mes1 + "-" + fecha1.getFullYear();
            this.eventos[i].fecha_inicio = format5
            
        }

    };

    componentDidMount(){
      this.getEvents();
      this.getEventTypes();
    }

    masDetalles(id){
        cookies.set('idauxiliar', id, {path: "/"});
        window.location.href='./event-admin';
    }

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

    render(){

        return (
          <div className="App">
            <div className="background-image"></div> {/* Componente de fondo */}
            <div className="content">
              <NavbarUser />
              <div className="contenedor">
                {this.eventos[0] == null ? (
                  <div>
                    <p className="tituloEvento-home">VISUALIZAR EVENTOS</p>
                    <h1 className="tituloEvento-home">
                      No Hay Eventos Disponibles
                    </h1>
                  </div>
                ) : (
                  <>
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
                              return (
                                <option key={evento.id}>
                                  {evento.nombre_tipo_evento}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="columna1">
                      <ListaEventos />

                      {this.eventos.map((evento, id) => {
                        return (
                          <div
                            className="containerEvents"
                            onClick={() => this.masDetalles(evento.id)}
                            key={evento.id}
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

export default Home_Participant ;