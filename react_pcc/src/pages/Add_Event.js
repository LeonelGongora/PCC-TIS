import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "../stylesheets/CreateEventStyle.css";
import Loader from './Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons';

const plus = <FontAwesomeIcon icon={faPlus} />
const addBrac = <FontAwesomeIcon icon={faArrowUpFromBracket} />

class Add_Event extends Component{

    eventos = []

   // state = {
       // events: [],
       // loader:false,
       // url: "http://127.0.0.1:8000/api/type-events"

    //};
    /*
The code below will change
the heading with id = "myH"
and the paragraph with id = "myP"
in my web page:
*/

    getEventTypes = async () => {
        const url = "http://127.0.0.1:8000/api/type-events"; 


        this.setState({loader:true});
        const events = await axios.get(url);
        this.eventos = Array.from(events.data.events)
        console.log(events)
        

        this.setState({ events: events.data, loader:false});
        console.log(this.eventos)

        

    };

    componentDidMount(){
        this.getEventTypes();
    }
    /*


    state = {
        events: [],
        loader:false,
        url: "http://127.0.0.1:8000/api/type-events",


        nombre_evento: '',
        requisitos: '',
        fecha_inicio: '',
        numero_contacto: '',
        descripcion: '',
        fecha_limite: '',
        fecha_fin: '',
        participantes_equipo: '',
        event_type_id: '',
        image: ''
    }
    */

    constructor(props){
        super(props)
        this.state = {
            
            image: '',
            nombre_evento: '',
            requisitos: '',
            fecha_inicio: '',
            numero_contacto: '',
            descripcion: '',
            fecha_limite: '',
            fecha_fin: '',
            participantes_equipo: '',
            event_type_id: '',
        }

    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
            
        });
        
    }

    handleChange = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    }



    saveEvent = async (e) => {
        let valor = document.getElementById("event_type_id").value

        e.preventDefault();
        
        const url = "http://127.0.0.1:8000/api/add-event"; 
        const data = new FormData();
        data.append('image', this.state.image)

        data.append('nombre_evento', this.state.nombre_evento)
        data.append('requisitos', this.state.requisitos)
        data.append('fecha_inicio', this.state.fecha_inicio)
        data.append('numero_contacto', this.state.numero_contacto)
        data.append('descripcion', this.state.descripcion)
        data.append('fecha_limite', this.state.fecha_limite)
        data.append('fecha_fin', this.state.fecha_fin)
        data.append('participantes_equipo', this.state.participantes_equipo)
        data.append('event_type_id', valor)

        axios.post(url, data).then(res => {
            console.log(res)
        })

    }

    myFunction() {

        let id_tipo_eventos = []
        let nombre_tipo_eventos = []
        var x = document.getElementById("desplegable");
        var i;
        for (i = 0; i < x.length; i++) {
            nombre_tipo_eventos.push(x.options[i].value);
            id_tipo_eventos.push(i+1);
        }
        //console.log(id_tipo_eventos);
        //console.log(nombre_tipo_eventos);

        //console.log(x)

        
        var y = document.getElementById("desplegable").value;
        var indice;
        for (indice = 0; indice < x.length; indice++) {
            if(y === nombre_tipo_eventos[indice]){
                document.getElementById("event_type_id").value = id_tipo_eventos[indice];
                break;
            }
        }
        //console.log(y)
        //document.getElementById("demo").innerHTML = x;
    }

    render(){
        return(
            <>
            <div className='crearEventos'>
                <div className='textoEvento'>
                    <p className='textoRegistro'> Registro de eventos</p>
                </div>
                <div className='entradasDatos'>
                    <form onSubmit={this.saveEvent}>
                        <div className='datoNombre' id='entrada'>
                            <p id='textoCuadro'>Nombre</p>
                            <input id ="input"type="text" name="nombre_evento" placeholder="Ingrese nombre" onChange={this.handleInput}  />
                        </div>
                        
                        <div id='entrada'>
                            <p id='textoCuadro'>Requisitos</p>
                            <input id ="input" type="text" name="requisitos" placeholder="requisitos" onChange={this.handleInput} />
                        
                        </div>

                        <div id='entrada'>
                            <p id='textoCuadro'>Fecha de Inicio</p>
                            <input id ="input" type="date" name="fecha_inicio" placeholder="Ingrese fecha" onChange={this.handleInput} />
                        </div>
                        
                        <div id='entrada'>
                            <p id='textoCuadro'>Numero de Contacto</p>
                            <input type="number" name="numero_contacto" placeholder="65487898" onChange={this.handleInput}  />
                        </div>

                        <div id='entrada'>
                            <p id='textoCuadro'>Descripcion</p>
                            <input type="text" name="descripcion" placeholder="Descripcion" onChange={this.handleInput}  />
                        </div>

                        <div id='entrada'>
                            <p id='textoCuadro'>Fecha limite de inscripcion</p>
                            <input type="date" name="fecha_limite" onChange={this.handleInput} />
                        </div>

                        <div id='entrada'>
                            <p id='textoCuadro'>Fecha fin del evento</p>
                            <input type="date" name="fecha_fin" onChange={this.handleInput} />
                        </div>
                        
                        <div id='entrada'>
                            <p id='textoCuadro'>Participantes por equipo</p>
                            <input type="number" name="participantes_equipo" onChange={this.handleInput}  />
                        </div>

                        <div id='entrada'>
                            <p id='textoCuadro'>Afiche</p>
                            <input type='file' name="image" onChange={this.handleChange}/>
                        </div>

                        <div id='entrada'>
                            <p id='textoCuadro'>Tipo de evento</p>
                            <select id = "desplegable"onChange={this.myFunction} >

                                { this.eventos.map((evento,id) => {
                                    return (
                                        
                                        <option>{evento.nombre_tipo_evento}</option>
                                        
                                    );
                                    
                                })}
                                </select>
                                <input type="hidden" name="event_type_id" id='event_type_id' onChange={this.handleInput} />
                        </div>

                        


                        <div className='Patrocinadores' id='entrada'>
                            <p id='textoCuadro'>Patrocinadores</p>
                       </div>
                        <div className='Organizadores' id='entrada'>
                            <p id='textoCuadro'>Organizadores</p>
                        </div>   
                        


                        <Link to={'add-type-event'}> Añadir Tipo de Evento</Link>

                        <div className='botonEnviar'>
                            <button className='botonRegistrar' type="submit"> Registrar evento</button>
                        </div>
                        

                        

                    </form>
                    {this.state.loader ? <Loader/> : ""}


                </div>
            </div>
    
            </>

        );
    }
}


export default Add_Event;
