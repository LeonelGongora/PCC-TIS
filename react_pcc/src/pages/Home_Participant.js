import React, {Component, useEffect} from 'react';
import NavbarUser from '../components/NavbarUser';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";

import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Home_Participant extends Component{

    eventos = []

    state = {
        events: [],
        loader:false,
        url: "http://127.0.0.1:8000/api/eventoabiertos"

    };

    getEvents = async () => {

        this.setState({loader:true});
        const events = await axios.get(this.state.url);
        this.eventos = Array.from(events.data.events)
        console.log(events)
        

        this.setState({ events: events.data, loader:false});
        console.log(this.eventos)

    };

    componentDidMount(){
        this.getEvents();
    }

    masDetalles(id){
        console.log("clik");
        // console.log(id);
        cookies.set('idauxiliar', id, {path: "/"});
        // console.log(cookies.get('idauxiliar'));
        window.location.href='./event-user';
    }


    render(){

        return (
          <div className="App">
            <div className="background-image"></div> {/* Componente de fondo */}
            <div className="content">
              <NavbarUser />
              <div className="contenedor">
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">EDITAR EVENTO</p>
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
                          <h4 className="nombreEvento">
                            {evento.nombre_evento} {cookies.get("id_usuario")}
                          </h4>
                          <h4 className="tipoEv">
                            {evento.nombre_tipo_evento}
                          </h4>
                          <h4>{evento.fecha_inicio}</h4>
                          <h4>{evento.fecha_limite}</h4>
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

export default Home_Participant ;