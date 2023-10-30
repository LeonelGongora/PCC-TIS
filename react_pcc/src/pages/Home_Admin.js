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

const cookies = new Cookies();


class Home_Admin extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            events: [],
            loader:false,
            url: "http://127.0.0.1:8000/api/events"
    
        };
        this.eventos = []

      }

    getEvents = async () => {

        this.setState({loader:true});
        const events = await axios.get(this.state.url);
        this.eventos = Array.from(events.data.events)
        //console.log(events)
        

        this.setState({ events: events.data, loader:false});
        console.log(this.eventos)
        var i;
        var fecha;
        var fecha1;

        for (i = 0; i < this.eventos.length; i++) {
            fecha = new Date(this.eventos[i].fecha_inicio)
            var dia = fecha.getDate() + 1
            var mes = fecha.getMonth() + 1
            let format4 = dia + "-" + mes + "-" + fecha.getFullYear();
            this.eventos[i].fecha_inicio = format4

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
        console.log("clik");
        // console.log(id);
        cookies.set('idauxiliar', id, {path: "/"});
        // console.log(cookies.get('idauxiliar'));
        window.location.href='./event-admin';
    }

    render(){

        return(

            <div className="App">
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
                                     <h4>{evento.fecha_limite}</h4>
                                     
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