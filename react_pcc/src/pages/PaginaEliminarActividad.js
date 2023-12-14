import React, {Component} from 'react';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";
import '../stylesheets/AtributosSeparadosStyles.css'
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import imgPred from "../images/afiche.png";
import {URL_API, URL_IMG} from '../const';
import ModalEliminarActividad from '../components/ModalWindows/ModalEliminarActividad';
import configApi from '../configApi/configApi';

const Eventos_Api_Url = configApi.EVENTOC_API_URL;

const cookies = new Cookies();


class PaginaEliminarActividad extends Component{

  se_Registro = cookies.get('se_Registro');
  id = cookies.get('id_usuario');

    eventos = []

    state = {
        events: [],
        loader:false,
        url: `${URL_API}/events`,
        estadoModalActividad: false,
    };

    getEvents = async () => {
      if(this.se_Registro){
        //var url2 = `${URL_API}/register-to-events/${this.id}`; 
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

    cambiarEstadoModalActividad = (nuevoEstado) => {
        this.setState({ estadoModalActividad: nuevoEstado });
    };
    

    async abrirModalActividad(id){
        cookies.set('id_evento', id, {path: "/"});
        const url = `${Eventos_Api_Url}/${id}`;
        const response = await axios.get(url)
        cookies.set('actividades', response.data.activities, {path: "/"});
        this.cambiarEstadoModalActividad(!this.state.estadoModalActividad);
        // console.log(cookies.get('idauxiliar'));
    }

    render(){

        return (
          <div className="App">
            <ModalEliminarActividad
                estadoActividad={this.state.estadoModalActividad}
                cambiarEstadoModalActividad={this.cambiarEstadoModalActividad}
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
                  <p className="tituloEvento-home">ELIMINAR ACTIVIDAD</p>
                  <h1 className='tituloEvento-home'>No Hay Eventos Disponibles</h1>
              </div>
              ) : (<>
                    <div className="contenedorTitulo-home">
                      <p className="tituloEvento-home">ELIMINAR ACTIVIDAD</p>
                    </div>
                    <div className="columna1">
                      <ListaEventos />

                      {this.eventos.map((evento, id) => {
                        return (
                          <div
                            key={evento.id}
                            className="containerEvents"
                            onClick={() =>
                              this.abrirModalActividad(
                                evento.id
                              )
                            }
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

export default PaginaEliminarActividad ;