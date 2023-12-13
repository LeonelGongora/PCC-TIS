import React, {Component} from 'react';
import NavbarUser from '../components/NavBars/NavbarUser';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";
import NavbarUserDinamico from '../components/NavBars/NavbarUserDinamico';

import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import imgPred from "../images/afiche.png";
import {URL_API, URL_IMG} from '../const';

const cookies = new Cookies();

class Home_User_Dinamico extends Component{

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loader: false,
      url: `${URL_API}/eventoabiertos`,
    };
    this.eventos = [];
  }
  

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
    }

    masDetalles(id){
        console.log("clik");
        // console.log(id);
        cookies.set('idauxiliar', id, {path: "/"});
        // console.log(cookies.get('idauxiliar'));
        window.location.href='./event-admin';
    }


    render(){

        return (
          <div className="App">
            <div className="background-image"></div> {/* Componente de fondo */}
            <div className="content">
              <NavbarUserDinamico />
              <div className="contenedor">
                {this.eventos[0] == null ? (
                  <div>
                  <p className="tituloEvento-home">VISUALIZAR EVENTOS</p>
                  <h1 className='tituloEvento-home'>No Hay Eventos Disponibles</h1>
                </div>
                ) : (<>
                    <div className="contenedorTitulo-home">
                      <p className="tituloEvento-home">VISUALIZAR EVENTOS</p>
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
                                    : `${URL_IMG}/images/` +
                                      evento.name
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
                                  <h4>
                                    Equipo de {evento.participantes_equipo}
                                  </h4>
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

export default Home_User_Dinamico ;