import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ContenedorSlider from '../components/ContenedorSlider';
import NavbarAdmin from '../components/NavbarAdmin';
import Eventos from '../components/Eventos';
import ListaEventos from '../components/ListaEventos';
import "../stylesheets/EventosStyles.css";

import NewsSide from '../components/NewsSide';
import Loader from './Loader';
import BotonesAdmin from '../components/BotonesAdmin';
import '../App.css';
import axios from 'axios';

class Home_Admin extends Component{

    eventos = []

    state = {
        events: [],
        loader:false,
        url: "http://127.0.0.1:8000/api/events"

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

    render(){

        return(

            <div className="App">
                <div className="background-image"></div> {/* Componente de fondo */}
                <div className="content">
                   <NavbarAdmin/>
                   <div className="contenedor">
                        <div className="columna1">
                            <div className='colSlider'>
                                <ContenedorSlider/>
                            </div>
                            <ListaEventos/>

                                { this.eventos.map((evento,id) => {
                                    
                                     return (<><div className='containerEvents'>
                                     <img className='imageEvent' src={"http://127.0.0.1:8000/images/" + evento.name} alt='Logo del evento' />
                                     <h4 className='nombreEvento'>{evento.nombre_evento}</h4>
                                     <h4 className='tipoEv'>{evento.event_type.nombre_tipo_evento}</h4>
                                     <h4>{evento.fecha_inicio}</h4>
                                     <h4>{evento.fecha_fin}</h4>
                                     </div></>);
                                     
                                })}

                        </div>

                        <div className="columna2">
                            <BotonesAdmin/>
                        </div>

                        {this.state.loader ? <Loader/> : ""}

                    </div>
                </div>
           </div>

        );
    }
}

export default Home_Admin;