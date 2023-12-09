import React, {Component} from 'react';
import '../stylesheets/Add_Event_NextAlt.css'
import "../stylesheets/RegisterEventAdminStyles.css";
import NavbarCreateEvent from './NavBars/NavBarCreateEvent';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Campos from './AtributosSeparados/Campos';
import Requisitos from './AtributosSeparados/Requisitos';
import Actividades from './AtributosSeparados/Actividades';
import Organizadores from './AtributosSeparados/Organizadores';
import Patrocinadores from './AtributosSeparados/Patrocinadores';
const Eventos_Api_Url = configApi.EVENTOC_API_URL;

const cookies = new Cookies();

class Add_Event_NextAlt extends Component{

    id = cookies.get('ultimo_id_evento');

    componentDidMount(){
        this.getEvento();
        //this.getOrganizadores();
        //this.getPatrocinadores();
    }

    constructor(props) {
        super(props);
        this.state = {
            pestañas: [true, false, false, false, false],// Inicialmente, todas las pestañas están en false

            estadoModalAtributo: false,
            estadoModalRequisito: false,
            estadoModalActividad: false,
            estadoModalEleccion: false,
            estadoCampoNumerico: false,
            estadoCampoFecha: false,
            estadoCampoSeleccion: false, 

            atributos: [],
            atributosInformacion: [],
            requisitos: [],
            actividades: [],
            id_evento: ''
        };
        
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
          requisitos: response.data.requirements,
          actividades: response.data.activities,
          atributosInformacion : response.data.informations
        });
      }
    }

    cambiarEstadoPestaña = (indice) => {
    const nuevasPestañas = [...this.state.pestañas];

    nuevasPestañas.fill(false);
    nuevasPestañas[indice] = true;

    this.setState({ pestañas: nuevasPestañas });
    };  


    render(){
        const pestañas = this.state.pestañas;
        return (
          <>
                <div className="contenedorMaximo"></div>
                <div className="vistaPestana">
                    <p className="tituloEvento-home">REGISTRAR EVENTO</p>
                    <div className='contenedorInfoPestana'>
                        <div className='pestanasEventos'>
                            <div className={`campoPestana cmp${pestañas[0] ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoPestaña(0)}>
                                <h3>Campos</h3>
                            </div>
                            <div className={`campoPestana req${pestañas[1] ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoPestaña(1)}>
                                <h3>Requisitos</h3>
                            </div>
                            <div className={`campoPestana act${pestañas[2] ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoPestaña(2)}>
                                <h3>Actividades</h3>
                            </div>
                            <div className={`campoPestana org${pestañas[3] ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoPestaña(3)}>
                                <h3>Organizadores</h3>
                            </div>
                            <div className={`campoPestana ptr${pestañas[4] ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoPestaña(4)}>
                                <h3>Patrocinadores</h3>
                            </div>
                        </div>
                        <div className='contenedorCamb'>
                            <Campos
                                estadoCampos={pestañas[0]}
                                cambiarEstadoCampos={this.cambiarEstadoCampos}
                                atributosFormulario = {this.state.atributos}
                                atributosInformacion = {this.state.atributosInformacion}
                            />
                            <Requisitos
                                estadoRequisitos={this.state.pestañas[1]}
                                cambiarEstadoRequisitos={this.cambiarEstadoRequisitos}
                                requisitos = {this.state.requisitos}
                            />
                            <Actividades
                                estadoActividades={this.state.pestañas[2]}
                                cambiarEstadoActividades={this.cambiarEstadoActividades}
                                actividades = {this.state.actividades}
                            />
                            <Organizadores
                                estadoOrganizadores={this.state.pestañas[3]}
                                cambiarEstadoOrganizadores={this.cambiarEstadoOrganizadores}
                            />
                            <Patrocinadores
                                estadoPatrocinadores={this.state.pestañas[4]}
                                cambiarEstadoPatrocinadores={this.cambiarEstadoPatrocinadores}
                            />
                        </div>
                        <div className='opcionesCambiar'>
                            <button className={`botonesCambiar ${pestañas[0] ? ' activo' : ''}`}>
                                Anterior
                            </button>
                            <button className='botonesCambiar'>
                                Terminar Registro
                            </button>
                            <button className={`botonesCambiar ${pestañas[4] ? ' activo' : ''}`}>
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
          </>
          )}
}
export default Add_Event_NextAlt;