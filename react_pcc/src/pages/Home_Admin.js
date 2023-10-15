import React, {Component, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin';
import Eventos from '../components/Eventos';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";
import Loader from './Loader';
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import BotonesAdmin from '../components/BotonesAdmin';
import ModalWindow from '../components/ModalWindow';

const cookies = new Cookies();


class Home_Admin extends Component{

    constructor(props) {
        super(props);
        this.cambiarEstadoModal = this.cambiarEstadoModal.bind(this);
        this.state  = {
            events: [],
            loader:false,
            url: "http://127.0.0.1:8000/api/events",
            estadoModal: false
    
        };
        this.eventos = []
        console.log("Isuuuas");

      }

    

    

    getEvents = async () => {

        this.setState({loader:true});
        const events = await axios.get(this.state.url);
        this.eventos = Array.from(events.data.events)
        //console.log(events)
        

        this.setState({ events: events.data, loader:false});
        //console.log(this.eventos)

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
    cambiarEstadoModal = () => {
        this.setState({ estadoModal: !this.estadoModal });
    };
    render(){
        return (
            <div className="App">
                {this.state.estadoModal && (<ModalWindow estado={this.estadoModal} cambiarEstado={this.cambiarEstadoModal} />)}
                <div className="background-image"></div> {/* Componente de fondo */}
                <div className="content">
                   <NavbarAdmin/>
                   <div className="contenedor">
                        <div className="columna1">
                            <ListaEventos/>

                                { this.eventos.map((evento,id) => {
                                    
                                    return (<><div className='containerEvents' onClick={()=>this.masDetalles(evento.id)}>
                                     <img className='imageEvent' src={"http://127.0.0.1:8000/images/" + evento.name} alt='Logo del evento' />
                                     <h4 className='nombreEvento'>{evento.nombre_evento}</h4>
                                     <h4 className='tipoEv'>{evento.event_type.nombre_tipo_evento}</h4>
                                     <h4>{evento.fecha_inicio}</h4>
                                     <h4>{evento.fecha_fin}</h4>
                                     
                                     </div></>);
                                     
                                })}

                        </div>

                        <div className="columna2">
                        <BotonesAdmin estado={this.estadoModal} cambiarEstado={this.cambiarEstadoModal}/>

                        </div>

                        {this.state.loader ? <Loader/> : ""}

                    </div>
                </div>

                
           </div>

        );
    }
}

export default Home_Admin;