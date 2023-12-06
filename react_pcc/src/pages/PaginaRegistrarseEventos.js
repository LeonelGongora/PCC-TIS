import React, {Component} from 'react';
import NavbarUser from '../components/NavBars/NavbarUser';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";

import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import imgPred from "../images/afiche.png";
import {URL_API} from '../const';

const cookies = new Cookies();


class PaginaRegistrarseEventos extends Component{


  se_Registro = cookies.get('se_Registro');
  id = cookies.get('id_usuario');

    eventos = []

    state = {
        events: [],
        loader:false,
        url: `${URL_API}/events`
    };

    getEvents = async () => {
      if(this.se_Registro){
        var url2 = `${URL_API}/register-to-events/${this.id}`; 
        this.setState({loader:true});
        //const events = await axios.get(this.state.url);
        const events = await axios.get(url2);
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

            fecha1 = new Date(this.eventos[i].fecha_inicio)
            var dia1 = fecha1.getDate() + 1
            var mes1 = fecha1.getMonth() + 1
            let format5 = dia1 + "-" + mes1 + "-" + fecha1.getFullYear();
            this.eventos[i].fecha_inicio = format5
            
        }
      }else{

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

            fecha1 = new Date(this.eventos[i].fecha_inicio)
            var dia1 = fecha1.getDate() + 1
            var mes1 = fecha1.getMonth() + 1
            let format5 = dia1 + "-" + mes1 + "-" + fecha1.getFullYear();
            this.eventos[i].fecha_inicio = format5
            
        }
        

      }
    };

    componentDidMount(){
        this.getEvents();
        console.log(this.se_Registro)
    }

    irRegistro(id, participantes){
        cookies.set('id_evento', id, {path: "/"});
        console.log(id)
        if(participantes > 1){ 
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
              {this.eventos[0] == null ? (
                  <div>
                  <p className="tituloEvento-home">REGISTRARSE A EVENTOS</p>
                  <h1 className='tituloEvento-home'>No Hay Eventos Disponibles</h1>
              </div>
              ) : (<>
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
                                evento.name === null
                                  ? imgPred
                                  : "http://127.0.0.1:8000/images/" +
                                    evento.name
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

export default PaginaRegistrarseEventos ;