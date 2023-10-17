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
    errores = []

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
        //console.log(events)
        

        this.setState({ events: events.data, loader:false});
        //console.log(this.eventos)

        

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
    
    //const [errors, setErrors] = useState({});

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
            errors : {},
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
        const validationErrors = {};

        if(!this.state.nombre_evento.trim()){
            validationErrors.nombre_evento = "Este campo es obligatorio"
            console.log("Imagen")
            console.log(this.state.image)

        }else if(!/^\S[A-Z|a-z|`|&|.|'|Ñ|ñ|áéíóú|\s]{3,60}\S$/.test(this.state.nombre_evento)){
            validationErrors.nombre_evento = "Ingrese un nombre valido"
        }


        if(!this.state.requisitos.trim()){
            validationErrors.requisitos = "Este campo es obligatorio"

        }else if(!/^\S[A-Z|a-z|`|&|.|'|0-9|Ñ|ñ|áéíóú|\s|!|-|,]{3,60}\S$/.test(this.state.requisitos)){
            validationErrors.requisitos = "Ingrese requisitos validos"
        }

        if(!this.state.fecha_inicio.trim()){
            validationErrors.fecha_inicio = "Este campo es obligatorio"

        }

        if(!this.state.numero_contacto.trim()){
            validationErrors.numero_contacto = "Este campo es obligatorio"

        }else if(!/[7|6][0-9]{7}$/.test(this.state.numero_contacto)){
            validationErrors.numero_contacto = "Ingrese un numero de contacto valido"
        }


        if(!this.state.descripcion.trim()){
            validationErrors.descripcion = "Este campo es obligatorio"

        }else if(!/^\S[A-Z|a-z|.|0-9|Ñ|ñ|áéíóú|\s|,]{3,120}\S$/.test(this.state.descripcion)){
            validationErrors.descripcion = "Ingrese una descripcion valido"
        }

        if(!this.state.fecha_limite.trim()){
            validationErrors.fecha_limite = "Este campo es obligatorio"

        }

        if(!this.state.fecha_fin.trim()){
            validationErrors.fecha_fin = "Este campo es obligatorio"

        }


        if(!this.state.participantes_equipo.trim()){
            validationErrors.participantes_equipo = "Este campo es obligatorio"

        }else if(!/[1-9]{1}$/.test(this.state.participantes_equipo)){
            validationErrors.participantes_equipo = "Ingrese un numero de participantes valido"
        }

        if(!this.state.image.name){
            validationErrors.image = "Debe subir una imagen"

        }


        this.setState({ errors: validationErrors });

        if(Object.keys(validationErrors).length === 0){
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
                window.location.href = './';
            })
        }

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

        var y = document.getElementById("desplegable").value;
        var indice;
        for (indice = 0; indice < x.length; indice++) {
            if(y === nombre_tipo_eventos[indice]){
                document.getElementById("event_type_id").value = id_tipo_eventos[indice];
                break;
            }
        }
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
                            <input id='inputRegistro' type="text" name="nombre_evento" placeholder="Ingrese nombre" onChange={this.handleInput}  />
                        </div>
                        {this.state.errors.nombre_evento && <span className='advertencia'>{this.state.errors.nombre_evento}</span>}
                        
                        <div id='entrada'>
                            <p id='textoCuadro'>Requisitos</p>
                            <input id='inputRegistro' type="text" name="requisitos" placeholder="requisitos" onChange={this.handleInput} />
                        </div>
                        {this.state.errors.requisitos && <span className='advertencia'>{this.state.errors.requisitos}</span>}


                        <div id='entrada'>
                            <p id='textoCuadro'>Fecha de Inicio</p>
                            <input id='inputRegistro' type="date" name="fecha_inicio" placeholder="Ingrese fecha" onChange={this.handleInput} />
                        </div>
                        {this.state.errors.fecha_inicio && <span className='advertencia'>{this.state.errors.fecha_inicio}</span>}
                        
                        <div id='entrada'>
                            <p id='textoCuadro'>Numero de Contacto</p>
                            <input id='inputRegistro' type="number" name="numero_contacto" placeholder="65487898" onChange={this.handleInput}  />
                        </div>
                        {this.state.errors.numero_contacto && <span className='advertencia'>{this.state.errors.numero_contacto}</span>}

                        <div id='entrada'>
                            <p id='textoCuadro'>Descripcion</p>
                            <input id='inputRegistro' type="text" name="descripcion" placeholder="Descripcion" onChange={this.handleInput}  />
                        </div>
                        {this.state.errors.descripcion && <span className='advertencia'>{this.state.errors.descripcion}</span>}

                        <div id='entrada'>
                            <p id='textoCuadro'>Fecha limite de inscripcion</p>
                            <input id='inputRegistro' type="date" name="fecha_limite" onChange={this.handleInput} />
                        </div>
                        {this.state.errors.fecha_limite && <span className='advertencia'>{this.state.errors.fecha_limite}</span>}

                        <div id='entrada'>
                            <p id='textoCuadro'>Fecha fin del evento</p>
                            <input id='inputRegistro' type="date" name="fecha_fin" onChange={this.handleInput} />
                        </div>
                        {this.state.errors.fecha_fin && <span className='advertencia'>{this.state.errors.fecha_fin}</span>}
                        
                        <div id='entrada'>
                            <p id='textoCuadro'>Participantes por equipo</p>
                            <input id='inputRegistro' type='tel' name="participantes_equipo" maxLength={2} placeholder="Ingrese un numero de participantes" onChange={this.handleInput}  />
                        </div>
                        {this.state.errors.participantes_equipo && <span className='advertencia'>{this.state.errors.participantes_equipo}</span>}

                        <div id='entrada'>
                            <p id='textoCuadro'>Afiche</p>
                            <input type='file' name="image" onChange={this.handleChange}/>
                        </div>
                        {this.state.errors.image && <span className='advertencia'>{this.state.errors.image}</span>}

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
