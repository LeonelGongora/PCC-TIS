import React, {Component} from 'react';
import NavbarUser from '../components/NavBars/NavbarUser';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";

import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class PaginaRegistrarseEventos extends Component{


  se_Registro = cookies.get('se_Registro');

    eventos = []

    state = {
        events: [],
        loader:false,
        url: "http://127.0.0.1:8000/api/events"
    };

    getEvents = async () => {

        //var url2 = `http://127.0.0.1:8000/api/register-to-events/${this.id}`; 

        this.setState({loader:true});
        //const events = await axios.get(this.state.url);
        const events = await axios.get(this.state.url);
        // console.log(events)

        this.eventos = Array.from(events.data.events)
        // console.log(this.eventos)
        
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
        console.log(this.se_Registro)
    }

    irRegistro(id, participantes){
        cookies.set('id_evento', id, {path: "/"});
        console.log(id)
        if(participantes > 0){ 
          cookies.set('participantes_equipo', participantes, {path: "/"});
          window.location.href='./register-to-event-teams';
        }else{
          window.location.href='./register-to-event';
        }
        // console.log(cookies.get('idauxiliar'));
    }

    render(){

        return (
          <div className="App">
            <div className="background-image"></div> {/* Componente de fondo */}
            <div className="content">
              <NavbarUser />
              <div className="contenedor">
                {!this.eventos == true || this.eventos.length == 0 ? (
                  <div className="contenedorTitulo-home">
                    <p className="tituloEvento-home">
                      NO HAY EVENTOS REGISTRADOS
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="contenedorTitulo-home">
                      <p className="tituloEvento-home">REGISTRARSE A EVENTOS</p>
                    </div>
                    <div className="columna1">
                      <ListaEventos />

                      {this.eventos.map((evento, id) => {
                        return (
                          <div
                            key={evento.id}
                            className="containerEvents"
                            onClick={() =>
                              this.irRegistro(
                                evento.id,
                                evento.participantes_equipo
                              )
                            }
                          >
                            <img
                              className="imageEvent"
                              src={
                                "http://127.0.0.1:8000/images/" + evento.name
                              }
                              alt="Logo del evento"
                            />
                            <h4 className="nombreEvento">
                              {evento.nombre_evento}{" "}
                            </h4>
                            <h4 className="tipoEv">
                              {evento.event_type.nombre_tipo_evento}
                            </h4>
                            <h4>{evento.fecha_limite}</h4>
                            <h4>{evento.fecha_fin}</h4>
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

export default PaginaRegistrarseEventos ;