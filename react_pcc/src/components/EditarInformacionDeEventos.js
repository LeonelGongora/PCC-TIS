import React, { useState, useEffect, Component} from 'react';
import '../stylesheets/ViewEventStyle.css'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;



//const [event, setEvent] = useState ( [] );

class EditarInformacionDeEventos extends Component{

  eventos = []
  id = cookies.get('idauxiliar');

    getEventTypes = async () => {
        const url = "http://127.0.0.1:8000/api/type-events"; 


        this.setState({loader:true});
        const events = await axios.get(url);
        this.eventos = Array.from(events.data.events)
        //console.log(events)
        this.setState({ loader:false});

        
    };

    componentDidMount(){
        this.getEventTypes();
        this.getEvent();

    }
    
    getEvent=async()=>{
      console.log(this.id)
      const url = `${Eventos_Api_Url}/${this.id}`;
      const response = await axios.get(url)
      console.log(response)
      this.setState({ event: response.data})
      console.log()
    }
    
    
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
            contador : 0,
            event : []
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
        //this.setState({ event_type_id: valor });

        e.preventDefault();
        const validationErrors = {};


        if(this.state.fecha_inicio && this.state.fecha_limite){
            var d1 = new Date(this.state.fecha_inicio);
            var d2 = new Date(this.state.fecha_limite);

            var fecha1= d1.getTime()
            var fecha2= d2.getTime()

            if(fecha2 > fecha1){
                validationErrors.fecha_inicio = "La Fecha de Limite no puede ser superior a la Fecha de Inicio ";
                validationErrors.fecha_limite = "La Fecha de Limite no puede ser superior a la Fecha de Inicio";
            }
        }

        if(this.state.fecha_inicio && this.state.fecha_fin){
            var d1 = new Date(this.state.fecha_inicio);
            var d2 = new Date(this.state.fecha_fin);

            var fecha1= d1.getTime()
            var fecha2= d2.getTime()

            if(fecha1 > fecha2){
                validationErrors.fecha_inicio = "La Fecha de Inicio no puede ser superior a la Fecha de Fin ";
                validationErrors.fecha_fin = "La Fecha de Inicio no puede ser superior a la Fecha de Fin";
            }

        }

        if(this.state.fecha_limite && this.state.fecha_fin){
            var d1 = new Date(this.state.fecha_limite);
            var d2 = new Date(this.state.fecha_fin);

            var fecha1= d1.getTime()
            var fecha2= d2.getTime()

            if(fecha1 > fecha2){
                validationErrors.fecha_limite = "La Fecha de Limite no puede ser superior a la Fecha de Fin ";
                validationErrors.fecha_fin = "La Fecha de Limite no puede ser superior a la Fecha de Fin";
            }

        }

        if(!this.state.nombre_evento.trim()){
            validationErrors.nombre_evento = "Este campo es obligatorio"
            
            
        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(this.state.nombre_evento)){
            validationErrors.nombre_evento = "Ingrese un nombre valido"
        }


        if(!this.state.requisitos.trim()){
            validationErrors.requisitos = "Este campo es obligatorio"

        }else if(!/^\S[A-Z|a-z|`|&|.|'|"|0-9|Ñ|ñ|áéíóú|\s|(|)|!|-|,]{3,150}\S$/.test(this.state.requisitos)){
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

        }else if(!/^\S[A-Z|a-z|.|0-9|Ñ|ñ|áéíóú|\s|,]{3,150}\S$/.test(this.state.descripcion)){
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

        }else if(this.state.image.name){
            const extensiones = ["png","PNG" ,"jpg", "jpeg"];

                var nombreArchivo = this.state.image.name;
                const extension = nombreArchivo.substring(nombreArchivo.lastIndexOf('.') + 1, nombreArchivo.length);
                if (!extensiones.includes(extension)){
                    document.getElementsByClassName("imagen_input").value = "";
                    
                    this.setState({ image: '' });
                    validationErrors.image = "La imagen tiene que tener una extension .png, .jpg, .PNG o .jpeg";

                }
        }

        if(!this.state.event_type_id){
            validationErrors.event_type_id = "Debe seleccionar un tipo de evento"

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

    myFunction = async (e) => {

        let id_tipo_eventos = []
        let nombre_tipo_eventos = []
        var x = document.getElementById("desplegable");
        var i;

        if(this.state.contador == 0){
          x.remove(0)
          this.setState({ contador: 1 });

        }

        for (i = 0; i < x.length; i++) {
            
            nombre_tipo_eventos.push(x.options[i].value);
            id_tipo_eventos.push(i+1);
        }
        console.log(id_tipo_eventos)
        console.log(nombre_tipo_eventos)

        var y = document.getElementById("desplegable").value;
        var indice;
        for (indice = 0; indice < x.length; indice++) {
            if(y === nombre_tipo_eventos[indice]){
                document.getElementById("event_type_id").value = id_tipo_eventos[indice];
                let valor = document.getElementById("event_type_id").value
                this.setState({ event_type_id: valor });
                break;
            }
        }
    }

    render(){
        return (
            <>
              <div className="crearEventos">
                <div className="textoEvento">
                  <p className="textoRegistro"> {this.state.event.nombre_evento}</p>
                </div>
                <div className="entradasDatos">
                  <form onSubmit={this.saveEvent}>
                    <div className="datoNombre" id="entrada">
                      <p id="textoCuadro">Nombre*</p>
                      <input
                        id="inputRegistro"
                        type="text"
                        name="nombre_evento"
                        placeholder="Ingrese nombre"
                        value={this.state.event.nombre_evento}
                        onChange={this.handleInput}
                      />
                    </div>

                    {this.state.errors.nombre_evento && (
                      <span className="advertencia">
                        {this.state.errors.nombre_evento}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Requisitos*</p>
                      <input
                        id="inputRegistro"
                        type="text"
                        name="requisitos"
                        placeholder="requisitos"
                        value={this.state.event.requisitos}
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.requisitos && (
                      <span className="advertencia">
                        {this.state.errors.requisitos}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Fecha de Inicio*</p>
                      <input
                        id="inputRegistro"
                        type="date"
                        name="fecha_inicio"
                        placeholder="Ingrese fecha"
                        value={this.state.event.fecha_inicio}
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.fecha_inicio && (
                      <span className="advertencia">
                        {this.state.errors.fecha_inicio}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Numero de Contacto*</p>
                      <input
                        id="inputRegistro"
                        type="number"
                        name="numero_contacto"
                        placeholder="65487898"
                        value={this.state.event.numero_contacto}
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.numero_contacto && (
                      <span className="advertencia">
                        {this.state.errors.numero_contacto}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Descripcion*</p>
                      <input
                        id="inputRegistro"
                        type="text"
                        name="descripcion"
                        placeholder="Descripcion"
                        value={this.state.event.descripcion}
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.descripcion && (
                      <span className="advertencia">
                        {this.state.errors.descripcion}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Fecha limite de inscripcion*</p>
                      <input
                        id="inputRegistro"
                        type="date"
                        name="fecha_limite"
                        value={this.state.event.fecha_limite}
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.fecha_limite && (
                      <span className="advertencia">
                        {this.state.errors.fecha_limite}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Fecha fin del evento*</p>
                      <input
                        id="inputRegistro"
                        type="date"
                        name="fecha_fin"
                        value={this.state.event.fecha_fin}
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.fecha_fin && (
                      <span className="advertencia">
                        {this.state.errors.fecha_fin}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Participantes por equipo*</p>
                      <input
                        id="inputRegistro"
                        type="tel"
                        name="participantes_equipo"
                        maxLength={2}
                        placeholder="Ingrese un numero de participantes"
                        value={this.state.event.participantes_equipo}
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.participantes_equipo && (
                      <span className="advertencia">
                        {this.state.errors.participantes_equipo}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Afiche*</p>
                      <input
                        id="inputRegistro"
                        type="file"
                        name="image"
                        onChange={this.handleChange}
                        className="imagen_input"
                      />
                    </div>
                    {this.state.errors.image && (
                      <span className="advertencia">
                        {this.state.errors.image}
                      </span>
                    )}
  
                    <div id="entrada">
                      <p id="textoCuadro">Tipo de evento*</p>
                      <select id="desplegable" onChange={this.myFunction}>

                        <option disabled selected > Seleccione un tipo</option>
                        {this.eventos.map((evento, id) => {
                          return <option>{evento.nombre_tipo_evento}</option>;
                        })}

                      </select>
                      <input
                        type="hidden"
                        name="event_type_id"
                        id="event_type_id"
                        onChange={this.handleInput}
                      />
                    </div>
                    {this.state.errors.event_type_id && (
                      <span className="advertencia">
                        {this.state.errors.event_type_id}
                      </span>
                    )}
  
                    <div className="botonEnviar">
                      <button className="botonRegistrar" type="submit">
                        {" "}
                        Registrar
                      </button>
                    </div>
                  </form>
                </div>
            </div>
    
            </>

        );
    }
}

export default EditarInformacionDeEventos;