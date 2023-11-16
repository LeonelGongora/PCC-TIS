import React, {Component} from 'react';
import '../stylesheets/EditEventStyle.css'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import ModalWindowAtributo from './ModalWindowAtributo';
import ModalWindowRequisito from './ModalWindows/ModalWindowRequisito';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;

class EditarInformacionDeEventosNext extends Component{

  eventos = []
  id = cookies.get('idauxiliar');

    getEventTypes = async () => {
        const url = "http://127.0.0.1:8000/api/type-events"; 

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
          id_evento: response.data.id,
          atributos: response.data.attributes,
          requisitos: response.data.requirements,
          organizadores_de_evento : response.data.organizers,
          patrocinadores_de_evento : response.data.sponsors,
        });
      }
    }

    getOrganizadores = async()=>{
      const url = "http://127.0.0.1:8000/api/get-organizador"; 
      const respuesta = await axios.get(url);
      this.setState({ organizadores: respuesta.data.organizadores})
    }

    getPatrocinadores = async()=>{
      const url = "http://127.0.0.1:8000/api/get-patrocinador"; 
      const respuesta = await axios.get(url);
      this.setState({ patrocinadores: respuesta.data.patrocinadores})
    }

    constructor(props){
        super(props)
        this.state = {

            id_evento: '',
            errors : {},
            estadoModalAtributo: false,
            atributos: [],
            requisitos: [],
            organizadores : [],
            organizadores_de_evento: [],
            organizadores_id : [],
            patrocinadores : [],
            patrocinadores_de_evento: [],
            patrocinadores_id : [],
        }
    }

    cambiarEstadoModalAtributo = (nuevoEstado) => {
      this.setState({ estadoModalAtributo: nuevoEstado });
    }

    cambiarEstadoModalRequisito = (nuevoEstado) => {
        this.setState({ estadoModalRequisito: nuevoEstado });
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
      const url = `http://127.0.0.1:8000/api/delete-attribute/${id}`; 
      axios.delete(url).then(res => {
        if(res.data.status === 200){
          console.log(res);
          window.location.reload();
        }
      })
    }

    eliminarRequisito = (id) => {
        console.log(id)
        //const url = `http://127.0.0.1:8000/api/delete-attribute/${id}`; 
        //axios.delete(url).then(res => {
          //if(res.data.status === 200){
            //console.log(res);
            //window.location.reload();
          //}
        //})
    }

    updateEvent = async (e) => {

        e.preventDefault();

        let organizadoresSeleccionados = document.querySelectorAll('.organizadoresSeleccionados');
        let arrayOrganizadores = Array.from(organizadoresSeleccionados);

        for (let index = 0; index < arrayOrganizadores.length; index++) {
            if(arrayOrganizadores[index].checked === true){
                this.state.organizadores_id.push(arrayOrganizadores[index].value)
            }
        }

        let patrocinadoresSeleccionados = document.querySelectorAll('.patrocinadoresSeleccionados');
        let arrayPatrocinadores = Array.from(patrocinadoresSeleccionados);

        for (let index = 0; index < arrayPatrocinadores.length; index++) {
            if(arrayPatrocinadores[index].checked === true){
                this.state.patrocinadores_id.push(arrayPatrocinadores[index].value)
            }
        }

        let organizadores_id_registrados = [];

        for (let index = 0; index < this.state.organizadores_de_evento.length; index++) {
          organizadores_id_registrados.push(this.state.organizadores_de_evento[index].id);
        }

        let organizadores_id_numeros = []

        for (let index = 0; index < this.state.organizadores_id.length; index++) {
          organizadores_id_numeros.push(parseInt(this.state.organizadores_id[index])); 
        }

        let patrocinadores_id_registrados = [];

        for (let index = 0; index < this.state.patrocinadores_de_evento.length; index++) {
          patrocinadores_id_registrados.push(this.state.patrocinadores_de_evento[index].id);
        }

        let patrocinadores_id_numeros = []

        for (let index = 0; index < this.state.patrocinadores_id.length; index++) {
          patrocinadores_id_numeros.push(parseInt(this.state.patrocinadores_id[index])); 
        }

        const validationErrors = {};

        this.setState({ errors: validationErrors });

        if(Object.keys(validationErrors).length === 0){

            let organizador_seleccionado;
            let organizador_registrado;
            let organizadores_agregar = [];
            let organizadores_eliminar = [];

            for (let index = 0; index < organizadores_id_numeros.length; index++) {
              organizador_seleccionado = organizadores_id_numeros[index]

              for (let index2 = 0; index2 <  organizadores_id_registrados.length; index2++) {
                organizador_registrado = organizadores_id_registrados[index2];
                if(organizador_seleccionado === organizador_registrado){
                  break;
                }
                if(index2 === (organizadores_id_registrados.length -1)){
                  organizadores_agregar.push(organizador_seleccionado)
                }
              }
            }

            for (let index = 0; index < organizadores_id_registrados.length; index++) {
              if(!organizadores_id_numeros.includes(organizadores_id_registrados[index])){
                organizadores_eliminar.push(organizadores_id_registrados[index])
              }
            }

            console.log("Agregar")
            console.log(organizadores_agregar)
            console.log("Eliminar")
            console.log(organizadores_eliminar)

            let patrocinador_seleccionado;
            let patrocinador_registrado;
            let patrocinadores_agregar = [];
            let patrocinadores_eliminar = [];

            for (let index = 0; index < patrocinadores_id_numeros.length; index++) {
              patrocinador_seleccionado = patrocinadores_id_numeros[index]

              for (let index2 = 0; index2 <  patrocinadores_id_registrados.length; index2++) {
                patrocinador_registrado = patrocinadores_id_registrados[index2];
                if(patrocinador_seleccionado === patrocinador_registrado){
                  break;
                }
                if(index2 === (patrocinadores_id_registrados.length -1)){
                  patrocinadores_agregar.push(patrocinador_seleccionado)
                }
              }
            }

            for (let index = 0; index < patrocinadores_id_registrados.length; index++) {
              if(!patrocinadores_id_numeros.includes(patrocinadores_id_registrados[index])){
                patrocinadores_eliminar.push(patrocinadores_id_registrados[index])
              }
            }

            console.log("Agregar")
            console.log(patrocinadores_agregar)
            console.log("Eliminar")
            console.log(patrocinadores_eliminar)

            const urlOrganizador = `http://127.0.0.1:8000/api/add-event_organizer`; 
            const urlPatrocinador = `http://127.0.0.1:8000/api/add-event_sponsor`; 

            const url = `http://127.0.0.1:8000/api/update-event/${this.id}`; 
            ;//add-event-organizer

            /*
            
            

            for (let index = 0; index < this.state.organizadores_id.length; index++) {
              const data = new FormData()
              let organizador = this.state.organizadores_id[index]
              data.append("organizador", organizador)
              data.append("evento", this.id)

              axios.post(urlOrganizador, data).then(res => {
                if(res.data.status === 200){
                  console.log(res);
                  //window.location.href = './paginaEditarEventos';
                }
              })
            }

            for (let index = 0; index < this.state.patrocinadores_id.length; index++) {
              const data = new FormData()
              let patrocinador = this.state.patrocinadores_id[index]
              data.append("patrocinador", patrocinador)
              data.append("evento", this.id)

              axios.post(urlPatrocinador, data).then(res => {
                if(res.data.status === 200){
                  console.log(res);
                  //window.location.href = './paginaEditarEventos';
                }
              })
              
            }

            */

            //axios.post(url, data).then(res => {
              //if(res.data.status === 200){
                //console.log(res);
                //window.location.href = './paginaEditarEventos';
              //}
            //})
        }

    }

    render(){
        return (
            <><div className='contenedorMaximo'></div>
              <div className="editarEventos">
              { <ModalWindowAtributo estadoAtributo={ this.state.estadoModalAtributo} 
              cambiarEstadoModalAtributo={this.cambiarEstadoModalAtributo}
              id_evento = {this.state.id_evento}
              atributos = {this.state.atributos}/> }

              { <ModalWindowRequisito estadoAtributo={ this.state.estadoModalRequisito} 
              cambiarEstadoModalAtributo={this.cambiarEstadoModalRequisito}
              id_evento = {this.state.id_evento}/> }

                <div className="textoEvento">
                  <p className="textoRegistro"> Edicion de eventos</p>
                </div>
                <div className="entradasDatos">
                  <form onSubmit={this.updateEvent} encType="multipart/form-data">

                    {this.state.atributos.map((atributo) => (
                     <div className="campo-container">
                       <div id="entrada">
                         <p id="textoCuadro">{atributo.nombre_atributo}*</p>
                         <input
                           id="inputRegistro"
                           type="text"
                           name="valor"
                           placeholder="Campo Adicional"
                           readOnly
                         />
                       </div>
                       <button className="botonEliminar" type='button' onClick={() => this.eliminarAtributo(atributo.id)}>X</button>
                     </div>
                   ))}
                    <button className="botonAgregarEdit" type='button' onClick={() => this.cambiarEstadoModalAtributo(!this.state.estadoModal)}>Agregar Campo +</button>

                    <h1>
                        Requisitos
                    </h1>
                    {this.state.requisitos.map((requisito) => (
                     <div className="campo-container">
                       <div id="entrada">
                         <p id="textoCuadro">{requisito.contenido_requisito}*</p>
                         <input
                           id="inputRegistro"
                           type="text"
                           name="valor"
                           placeholder="Campo Adicional"
                           readOnly
                         />
                       </div>
                       <button className="botonEliminar" type='button' onClick={() => this.eliminarRequisito(requisito.id)}>X</button>
                     </div>
                    ))}
                    <button className="botonAgregarEdit" type='button' onClick={() => this.cambiarEstadoModalRequisito(!this.state.estadoModal)}>Agregar Requisito +</button>

                    <br/>
                    <h1>
                        Organizadores
                    </h1>

                    {this.state.organizadores.map((organizador) => (
                     <div>
                        <input type="checkbox" className="organizadoresSeleccionados" name="vehicle1" value={organizador.id}/>{organizador.nombre_organizador} <br/>
                     </div>
                    ))}

                    <br/>
                    <h1>
                        Patrocinadores
                    </h1>

                    {this.state.patrocinadores.map((patrocinador) => (
                     <div>
                        <input type="checkbox" className="patrocinadoresSeleccionados" name="vehicle1" value={patrocinador.id}/>{patrocinador.nombre_patrocinador} <br/>
                     </div>
                    ))}

                    <div className="botonEnviar">
                      <button className="botonGuardarEdit" type="submit">
                        {" "}
                        Guardar
                      </button>
                    </div>
                  </form>
                  
                </div>
            </div>
            </>
        );
    }
}

export default EditarInformacionDeEventosNext;