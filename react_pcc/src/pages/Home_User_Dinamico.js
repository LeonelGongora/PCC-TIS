import React, {Component} from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import NavbarUserDinamico from '../components/NavbarUserDinamico';

const cookies = new Cookies();

class Home_User_Dinamico extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: [],
            loader:false,
            url: "http://127.0.0.1:8000/api/events",
            estadoModal: false,
            estadoModalOrganizador:false,
            estadoModalPatrocinador: false,
    
        };
        this.eventos = []

      }

    getEvents = async () => {

        this.setState({loader:true});
        const events = await axios.get(this.state.url);
        this.eventos = Array.from(events.data.events)
        console.log(this.eventos)

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
    
    render(){

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
              cambiarEstadoModalPatrocinador={
                this.cambiarEstadoModalPatrocinador
              }
            />
            <div className="background-image"></div> {/* Componente de fondo */}
            <div className="content">
              <NavbarUserDinamico
                estado1={this.estadoModal}
                cambiarEstado1={this.cambiarEstadoModal}
                estadoOrganizador={this.estadoModalOrganizador}
                cambiarEstadoOrganizador={this.cambiarEstadoModalOrganizador}
                estadoPatrocinador={this.estadoModalPatrocinador}
                cambiarEstadoPatrocinador={this.cambiarEstadoModalPatrocinador}
              />
              <div className="contenedor">
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">VISUALIZAR EVENTOS</p>
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
                            {evento.nombre_evento}
                          </h4>
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

export default Home_User_Dinamico;