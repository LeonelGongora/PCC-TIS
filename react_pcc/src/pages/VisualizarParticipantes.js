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
import configApi from '../configApi/configApi';

const cookies = new Cookies();

class VisualizarParticipantes extends Component{

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
        this.participantes = []
        this.Event_Url_Api= configApi.EVENTOC_API_URL;
    }

    componentDidMount(){
      this.getEvent();
      this.getUsers();
    }

    getUsers = async () => {
      //Route::get('/get-user-1/{event_id}', [UserController::class, 'getUser1']);
      const idevent = cookies.get('id_evento');
      const events = await axios.get(`http://127.0.0.1:8000/api/get-user-1/${idevent}`);
      console.log(events)
      console.log(events.data)
      this.participantes = Array.from(events.data)

      this.setState({ loader:false});
    };

    getEvent=async()=>{
      const idevent = cookies.get('id_evento');
      const response = await axios.get(`${this.Event_Url_Api}/${idevent}`);
      console.log("Eventos")
      console.log(response)
      // console.log(response)
      this.setState({ event: response.data})
      /*
       
      if(response.request.status === 200){
        this.setState({
          nombre_evento: response.data.nombre_evento,
          requisitos: response.data.requirements
        });
      }
      */
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
              {this.participantes[0] == null ? (
                <h1 className='tituloPagAcept'>No Hay Participantes en este evento</h1>
                ) : (<>
                <div className="contenedorTitulo-home">
                  <p className="tituloEvento-home">NOMBRE DEL EVENTO</p>
                  <input type="text" name="buscador" id="buscador" 
                  placeholder="Buscar..." onChange={this.manejarBuscador}/>
                  <FontAwesomeIcon icon={faSearch} className="lupa-icon" />
        
                </div>
                <div className="columna11">
                  <ListaEquipos campos={['img', 'nomb', 'correo', 'dni']}/>
                  {this.participantes.map((participante) => {
                    return (
                    <>
                      <div className="containerP">
                        <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                        <h4 className="nombreParticipante">{`${participante.nombre} ${participante.apellido}`} </h4>
                        <h4 className="correo">{participante.email}</h4>
                        <h4 className="dni">{participante.ci}</h4>
                      </div>
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

export default VisualizarParticipantes;