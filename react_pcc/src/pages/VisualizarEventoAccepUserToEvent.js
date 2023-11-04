import React, {Component, useEffect} from 'react';
import Navbar from '../components/NavBarCreateEvent';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";

import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import configApi from '../configApi/configApi';

const cookies = new Cookies();

class VisualizarEventoAccepUserToEvent extends Component{


    constructor(props) {
        super(props);
        this.EventoAbierto_Api_Url = configApi.EVENTOABIERTOS_USUARIO_API_URL;
        this.eventos = []
    }

    getEvents = async () => {
        const events = await axios.get(this.EventoAbierto_Api_Url);
        this.eventos = Array.from(events.data.events)
        // console.log(events)
        this.setState({ events: events.data, loader:false});
        // console.log(this.eventos)

    };

    componentDidMount(){
        this.getEvents();
    }

    masDetalles(id){
        // console.log("clik");
        // console.log(id);
        cookies.set('auteId', id, {path: "/"});
        // console.log(cookies.get('idauxiliar'));
        window.location.href='./acceptUser';
    }


    render(){

        return(

            <div className="App">
                <div className="background-image"></div> {/* Componente de fondo */}
                <div className="content">
                   <Navbar/>
                   <div className="contenedor">
                        <div className="columna1">
                            <ListaEventos/>

                                { this.eventos.map((evento,id) => {
                                    
                                    return (<><div key={evento.id} className='containerEvents' onClick={()=>this.masDetalles(evento.id)}>
                                     <img className='imageEvent' src={"http://127.0.0.1:8000/images/" + evento.name} alt='Logo del evento' />
                                     <h4 className='nombreEvento'>{evento.nombre_evento} {cookies.get('id_usuario')}</h4>
                                     <h4 className='tipoEv'>{evento.nombre_tipo_evento}</h4>
                                     <h4>{evento.fecha_inicio}</h4>
                                     <h4>{evento.fecha_limite}</h4>
                                     </div></>);
                                     
                                })}
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

export default VisualizarEventoAccepUserToEvent ;