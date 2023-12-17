import React, {Component} from 'react';
import '../stylesheets/EditEventStyle.css'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {URL_API} from '../const';

const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{ color: "#ff0000", }} />;

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;

class EditarInformacionDeEventos extends Component{

  eventos = []
  id = cookies.get('ultimo_id_evento');

    getEventTypes = async () => {
        const url = `${URL_API}/type-events`; 

        this.setState({loader:true});
        const events = await axios.get(url);
        this.eventos = Array.from(events.data.events)
        this.setState({ loader:false});
    };

    componentDidMount(){
        this.getEventTypes();
        this.getEvent();
        this.getOrganizadores();
        this.getPatrocinadores();
    }

    getEvent=async()=>{
      const url = `${Eventos_Api_Url}/${this.id}`;
      const response = await axios.get(url)
      console.log(response)
      this.setState({ event: response.data})

      if(response.request.status === 200){
        this.setState({
          nombre_evento: response.data.nombre_evento,
          fecha_inicio: response.data.fecha_inicio,
          numero_contacto: response.data.numero_contacto,
          descripcion: response.data.descripcion,
          fecha_fin: response.data.fecha_fin,
          participantes_equipo: response.data.participantes_equipo,
          event_type_id: response.data.event_type_id,
          nombre_tipo_evento: response.data.event_type.nombre_tipo_evento,
          id_evento: response.data.id,
          atributos: response.data.attributes,
          requisitos: response.data.requirements,
          
          organizadores_de_evento : response.data.organizers,
          patrocinadores_de_evento : response.data.sponsors,
          image: response.data.name,

          numero_contacto_ant: response.data.numero_contacto,
          descripcion_ant: response.data.descripcion,
          fecha_inicio_ant: response.data.fecha_inicio,
          fecha_fin_ant: response.data.fecha_fin,
          event_type_id_ant: response.data.event_type_id,
        });
      }
    }

    getOrganizadores = async()=>{
      const url = `${URL_API}/get-organizador`; 
      const respuesta = await axios.get(url);
      this.setState({ organizadores: respuesta.data.organizadores})
    }

    getPatrocinadores = async()=>{
      const url = `${URL_API}/get-patrocinador`; 
      const respuesta = await axios.get(url);
      this.setState({ patrocinadores: respuesta.data.patrocinadores})
    }

    constructor(props){
        super(props)
        this.state = {
          nombre_tipo_evento: "",
          id_evento: "",

          image: "",
          nombre_evento: "",
          fecha_inicio: "",
          numero_contacto: "",
          descripcion: "",
          fecha_fin: "",
          participantes_equipo: "",
          event_type_id: "",
          errors: {},
          contador: 0,
          estadoModalAtributo: false,

          estadoModal: false,
          estadoModalOrganizador: false,
          estadoModalPatrocinador: false,
          estadoModalAnuncio: false,

          atributos: [],
          requisitos: [],
          seCargoArchivo: 0,
          organizadores_de_evento: [],
          organizadores: [],
          patrocinadores_de_evento: [],
          patrocinadores: [],

          numero_contacto_ant: "",
          descripcion_ant: "",
          fecha_inicio_ant: "",
          fecha_fin_ant: "",
          event_type_id_ant: "",
          listaCambio: [],
        };
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        
    }

    handleChange = (e) => {
        this.setState({
            image: e.target.files[0],
            seCargoArchivo: 1
        });
    }

    eliminarAtributo = (id) => {
      const url = `${URL_API}/delete-attribute/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
    }

    updateEvent = async (e) => {

        let valor = document.getElementById("event_type_id").value
        console.log("Se Cargo")
        console.log(this.state.seCargoArchivo)

        e.preventDefault();
        const validationErrors = {};

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

        if(!this.state.numero_contacto){
            validationErrors.numero_contacto = "Este campo es obligatorio"

        }else if(!/[7|6][0-9]{7}$/.test(this.state.numero_contacto)){
            validationErrors.numero_contacto = "Ingrese un numero de contacto valido"
        }


        if(!this.state.descripcion.trim()){
            validationErrors.descripcion = "Este campo es obligatorio"

        }else if(!/^[ .:;,\-\A-Za-z0-9áéíóúñÑ]{3,150}$/.test(this.state.descripcion)){
            validationErrors.descripcion = "Ingrese una descripcion valido"
        }

        if(!this.state.fecha_inicio.trim()){
            validationErrors.fecha_inicio = "Este campo es obligatorio"

        }else{
          let d2 = new Date(this.state.fecha_inicio);
          d2.setDate(d2.getDate() + 1);
          d2.setUTCHours(0, 0, 0, 0);

          let date_Actual1 = new Date();
          date_Actual1.setDate(date_Actual1.getDate() + 1);
          date_Actual1.setUTCHours(0, 0, 0, 0);
          
          let fecha1= d2.getTime()
          let fecha2= date_Actual1.getTime()
          if(fecha1 < fecha2){
            validationErrors.fecha_inicio = "Esta fecha no es valida"
          }
        }

        if(!this.state.fecha_fin.trim()){
            validationErrors.fecha_fin = "Este campo es obligatorio"

        }else{
          let d2 = new Date(this.state.fecha_fin);
          d2.setDate(d2.getDate() + 1);
          d2.setUTCHours(0, 0, 0, 0);

          let date_Actual1 = new Date();
          date_Actual1.setDate(date_Actual1.getDate() + 1);
          date_Actual1.setUTCHours(0, 0, 0, 0);
          
          let fecha1= d2.getTime()
          let fecha2= date_Actual1.getTime()
          if(fecha1 < fecha2){
            validationErrors.fecha_fin = "Esta fecha no es valida"
          }
        }

        if(this.state.seCargoArchivo === 0){
          console.log("NO SE CARGO")

        }else{
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
        }

        if(!this.state.event_type_id){
            validationErrors.event_type_id = "Debe seleccionar un tipo de evento"

        }

        this.setState({ errors: validationErrors });

        if(Object.keys(validationErrors).length === 0){

            //noti
            if(
              this.state.numero_contacto != this.state.numero_contacto_ant ||
              this.state.descripcion != this.state.descripcion_ant ||
              this.state.fecha_inicio != this.state.fecha_inicio_ant ||
              this.state.fecha_fin != this.state.fecha_fin_ant ||
              valor != this.state.event_type_id_ant
            ){
              if(this.state.numero_contacto != this.state.numero_contacto_ant){this.state.listaCambio.push(`numero de contacto: ${this.state.numero_contacto}`)}
              if(this.state.descripcion != this.state.descripcion_ant){this.state.listaCambio.push(`descripcion`)}
              if(this.state.fecha_inicio != this.state.fecha_inicio_ant){this.state.listaCambio.push(`fecha de inicio: ${this.state.fecha_inicio}`)}
              if(this.state.fecha_fin != this.state.fecha_fin_ant){this.state.listaCambio.push(`fecha de fin: ${this.state.fecha_fin}`)}
              if(valor != this.state.event_type_id_ant){this.state.listaCambio.push('tipo de evento')}

              const listastring = this.state.listaCambio.join(", ");
              console.log(listastring)
              console.log(this.state.listaCambio)

              const contenido = `El evento: ${this.state.nombre_evento}, tuvo las siguiente(s) modificacion(es): ${listastring}.`
              const url_notificacion = `${URL_API}/notifications`;
              const url_eventnotificacion= `${URL_API}/eventnotifications`;
              await axios.post(url_notificacion, {
                contenido: contenido,
                informacion: null,
                leido: 0
              })
              .then(response=>{
                axios.post(url_eventnotificacion, {
                  notification_id: response.data.id,
                  event_id: this.id
                })
              })
            }

            //fin noti
            
            const url = `${URL_API}/update-event/${this.id}`; 

            const data = new FormData();

            data.append('image', this.state.image)
            data.append('nombre_evento', this.state.nombre_evento)
            data.append('fecha_inicio', this.state.fecha_inicio)
            data.append('numero_contacto', this.state.numero_contacto)
            data.append('descripcion', this.state.descripcion)
            data.append('fecha_fin', this.state.fecha_fin)
            data.append('participantes_equipo', this.state.participantes_equipo)
            data.append('event_type_id', valor)
            data.append('seCargoArchivo', this.state.seCargoArchivo)

            axios.post(url, data).then(res => {
              if(res.data.status === 200){
                console.log(res);
                //window.location.href = './editar-evento-next';
                cookies.set("ultimo_id_evento", this.id, {path: "/",});
                cookies.set("esEditar", true, {path: "/",});
                window.location.href = './add-event-next-alt';
              }
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
            <div className="contenedorMaximo"></div>
            <div className="editarEventos">
              <div className="textoEvento">
                <p className="textoRegistro"> Edicion de eventos</p>
              </div>
              <div className="entradasDatos">
                <form onSubmit={this.updateEvent} encType="multipart/form-data" className='formularioRegistroEvento'>
                  <div className="datoNombre" id="entrada">
                    <p id="textoCuadro">Nombre*</p>
                    <input
                      id="inputRegistro"
                      type="text"
                      name="nombre_evento"
                      placeholder="Ingrese nombre"
                      value={this.state.nombre_evento}
                      onChange={this.handleInput}
                      readOnly
                    />
                  </div>

                  {this.state.errors.nombre_evento && (
                    <span className="advertenciaEdit">
                      {this.state.errors.nombre_evento}
                    </span>
                  )}

                  <div id="entrada">
                    <p id="textoCuadro">Numero de Contacto*</p>
                    <input
                      id="inputRegistro"
                      type="number"
                      name="numero_contacto"
                      placeholder="65487898"
                      value={this.state.numero_contacto}
                      onChange={this.handleInput}
                    />
                  </div>
                  {this.state.errors.numero_contacto && (
                    <span className="advertenciaEdit">
                      {this.state.errors.numero_contacto}
                    </span>
                  )}

                  <div id="entrada">
                    <p id="textoCuadro">Descripcion de Evento*</p>
                    <input
                      id="inputRegistro"
                      type="text"
                      name="descripcion"
                      placeholder="Descripcion"
                      value={this.state.descripcion}
                      onChange={this.handleInput}
                    />
                  </div>
                  {this.state.errors.descripcion && (
                    <span className="advertenciaEdit">
                      {this.state.errors.descripcion}
                    </span>
                  )}

                  <div id="entrada">
                    <p id="textoCuadro">Fecha de Inicio*</p>
                    <input
                      id="inputRegistro"
                      type="date"
                      name="fecha_inicio"
                      value={this.state.fecha_inicio}
                      onChange={this.handleInput}
                    />
                  </div>
                  {this.state.errors.fecha_inicio && (
                    <span className="advertenciaEdit">
                      {this.state.errors.fecha_inicio}
                    </span>
                  )}

                  <div id="entrada">
                    <p id="textoCuadro">Fecha fin del evento*</p>
                    <input
                      id="inputRegistro"
                      type="date"
                      name="fecha_fin"
                      value={this.state.fecha_fin}
                      onChange={this.handleInput}
                    />
                  </div>
                  {this.state.errors.fecha_fin && (
                    <span className="advertenciaEdit">
                      {this.state.errors.fecha_fin}
                    </span>
                  )}

                  <div id="entrada">
                    <p id="textoCuadro">
                      Cantidad de participantes por equipo*
                    </p>
                    <input
                      id="inputRegistro"
                      type="number"
                      name="participantes_equipo"
                      maxLength={2}
                      placeholder="Ingrese un numero de participantes"
                      value={this.state.participantes_equipo}
                      onChange={this.handleInput}
                      readOnly
                    />
                  </div>
                  {this.state.errors.participantes_equipo && (
                    <span className="advertenciaEdit">
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
                    <span className="advertenciaEdit">
                      {this.state.errors.image}
                    </span>
                  )}

                  <div id="entrada">
                    <p id="textoCuadro">Tipo de evento*</p>
                    <select id="desplegable" onChange={this.myFunction}>
                      <option disabled selected>
                        {" "}
                        {this.state.nombre_tipo_evento}
                      </option>
                      {this.eventos.map((evento, id) => {
                        return <option>{evento.nombre_tipo_evento}</option>;
                      })}
                    </select>
                    <input
                      type="hidden"
                      name="event_type_id"
                      id="event_type_id"
                      onChange={this.handleInput}
                      value={this.state.event_type_id}
                    />
                  </div>
                  {this.state.errors.event_type_id && (
                    <span className="advertenciaEdit">
                      {this.state.errors.event_type_id}
                    </span>
                  )}
                  
                  <div className="botonEnviar">
                    <button className="botonGuardarEdit" type="submit">
                      {" "}
                      Continuar
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