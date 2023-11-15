import React, {Component} from 'react';
import '../stylesheets/EditEventStyle.css'
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import ModalWindowAtributo from '../components/ModalWindowAtributo';

import ModalWindowRequisito from '../components/ModalWindows/ModalWindowRequisito';

const cookies = new Cookies();

const Eventos_Api_Url = configApi.EVENTOC_API_URL;

class Add_Event_Next extends Component{

  eventos = []
  id = cookies.get('ultimo_id_evento');

    componentDidMount(){
        this.getEvento();
        this.getOrganizadores();
        this.getPatrocinadores();
    }

    getEvento=async()=>{
        console.log(this.id)
      const url = `${Eventos_Api_Url}/${this.id}`;
      const response = await axios.get(url)
      console.log(response)
      this.setState({ event: response.data})
      if(response.request.status === 200){
        this.setState({
          id_evento: response.data.id,
          atributos: response.data.attributes,
          requisitos: response.data.requirements
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
            event : [],
            estadoModalAtributo: false,
            estadoModalRequisito: false,
            atributos: [],
            requisitos: [],
            organizadores : [],
            organizadores_id : [],
            patrocinadores : [],
            patrocinadores_id : [],

            estadoModal: false,
            estadoModalOrganizador:false,
            estadoModalPatrocinador: false,
        }
    }

    cambiarEstadoModalAtributo = (nuevoEstado) => {
        this.setState({ estadoModalAtributo: nuevoEstado });
    }

    cambiarEstadoModalRequisito = (nuevoEstado) => {
        this.setState({ estadoModalRequisito: nuevoEstado });
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
  

    saveEvento = async (e) => {

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

        console.log(this.state.organizadores_id)
        console.log(this.state.patrocinadores_id)

        const validationErrors = {};

        this.setState({ errors: validationErrors });

        if(Object.keys(validationErrors).length === 0){

            const urlOrganizador = `http://127.0.0.1:8000/api/add-event_organizer`; 
            const urlPatrocinador = `http://127.0.0.1:8000/api/add-event_sponsor`; 
            ;//add-event-organizer

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
                  <form onSubmit={this.saveEvento} encType="multipart/form-data">
                    <h1>
                        Campos
                    </h1>
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
                    <br/>
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

export default Add_Event_Next;