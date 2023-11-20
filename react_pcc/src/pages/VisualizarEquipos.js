import React, {Component} from 'react';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ListaEquipos from '../components/ListaEquipos';
import "../stylesheets/ViewParticipantsStyle.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import ModalWindow from '../components/ModalWindows/ModalWindow';

const cookies = new Cookies();

class VisualizarEquipos extends Component{

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
              <NavbarAdmin
                estado1={this.estadoModal}
                cambiarEstado1={this.cambiarEstadoModal}
                estadoOrganizador={this.estadoModalOrganizador}
                cambiarEstadoOrganizador={this.cambiarEstadoModalOrganizador}
                estadoPatrocinador={this.estadoModalPatrocinador}
                cambiarEstadoPatrocinador={this.cambiarEstadoModalPatrocinador}
              />
              <div className="contenedor">
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">NOMBRE DEL EVENTO</p>
                  <input type="text" name="buscador" id="buscador" 
                  placeholder="Buscar..." onChange={this.manejarBuscador}/>
                  <FontAwesomeIcon icon={faSearch} className="lupa-icon" />
        
                </div>
                <div className="columna11">
                  <ListaEquipos campos={['img', 'nomb', 'rol', 'correo', 'dni']}/>
                  {/*{this.eventos.map((evento, id) => {
                    return (
                    <>*/}
                      <p className="nombreEquipo">Nombre del equipo</p>
                        <div className="containerP">
                          <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                          <h4 className="nombreParticipante">Juan Manuel Calle </h4>
                          <h4 className="rol"> Entrenador </h4>
                          <h4 className="correo">manucg@gmail.com</h4>
                          <h4 className="dni">8330380</h4>
                        </div>
                        <div className="containerP">
                          <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                          <h4 className="nombreParticipante">Laura Rojas </h4>
                          <h4 className="rol"> Participante </h4>
                          <h4 className="correo">lr@gmail.com</h4>
                          <h4 className="dni">8330380</h4>
                        </div>
                     { /*</>
                    );
                  })}*/}
                </div>

              </div>
            </div>
          </div>
        );
    }
}

export default VisualizarEquipos;