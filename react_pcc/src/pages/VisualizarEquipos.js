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
import configApi from '../configApi/configApi'

const cookies = new Cookies();
const Eventos_Api_Url = configApi.EVENTOC_API_URL;

class VisualizarEquipos extends Component{

  id_evento = cookies.get('id_evento');
  usuarios = []
  indice = -1


    constructor(props) {
        super(props);
        this.state  = {
          loader: false,
            event: [],
            equipos : [],
            usuarios: [],
            url: "http://127.0.0.1:8000/api/events",
            estadoModal: false,
            estadoModalOrganizador:false,
            estadoModalPatrocinador: false,
        };
        this.equipos = []
    }

    getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${this.id_evento}`;
      const response = await axios.get(url)
      console.log(response)
      this.setState({ event: response.data});

      const res = await axios.get(`http://127.0.0.1:8000/api/get-team-1/${this.id_evento}`);
      this.equipos = Array.from(res.data)

      this.setState({loader:false});
      console.log(this.equipos)

      for (let i = 0; i < this.equipos.length; i++) {

        this.usuarios.push(this.equipos[i].users)
      }
    }

    componentDidMount(){
      this.getEvent();
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
              {this.equipos[0] == null ? (
                <h1 className='tituloPagAcept'>No Hay Equipos en este evento</h1>
                ) : (<>
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">{this.state.event.nombre_evento}</p>
                  <input type="text" name="buscador" id="buscador" 
                  placeholder="Buscar..." onChange={this.manejarBuscador}/>
                  <FontAwesomeIcon icon={faSearch} className="lupa-icon" />
        
                </div>
                <div className="columna11">
                  <ListaEquipos campos={['img', 'nomb', 'rol', 'correo', 'dni']}/>

                  {this.equipos.map((equipo) => {
                    this.indice = this.indice +1
                    return (
                    <>
                      <p className="nombreEquipo" onLoad={this.manejarContador}>{equipo.nombre_equipo}</p>
                      {this.usuarios[this.indice].map((usuario) => {
                        return (
                        <>
                        <div className="containerP">
                            <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                            <h4 className="nombreParticipante">{usuario.nombre} </h4>
                            <h4 className="rol"> Participante </h4>
                            <h4 className="correo">{usuario.email}</h4>
                            <h4 className="dni">{usuario.ci}</h4>
                        </div>
                        </>
                        );
                      })}
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

export default VisualizarEquipos;