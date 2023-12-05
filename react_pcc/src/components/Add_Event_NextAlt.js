import React, {Component} from 'react';
import '../stylesheets/Add_Event_NextAlt.css'
import "../stylesheets/RegisterEventAdminStyles.css";
import NavbarCreateEvent from './NavBars/NavBarCreateEvent';
import configApi from '../configApi/configApi'
import axios from 'axios'
import Cookies from 'universal-cookie';
import ModalWindowAtributo from './ModalWindows/ModalWindowAtributo';
import ModalWindowRequisito from './ModalWindows/ModalWindowRequisito';
import ModalActividad from './ModalWindows/ModalActividad';
import ModalEleccionTipoCampo from './ModalWindows/ModalEleccionTipoCampo';
import ModalCampoNumerico from './ModalWindows/ModalCampoNumerico';
import ModalCampoFecha from './ModalWindows/ModalCampoFecha';
import ModalCampoSeleccion from './ModalWindows/ModalCampoSeleccion';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Campos from './AtributosSeparados/Campos';
import Requisitos from './AtributosSeparados/Requisitos';
import Actividades from './AtributosSeparados/Actividades';
import Organizadores from './AtributosSeparados/Organizadores';
import Patrocinadores from './AtributosSeparados/Patrocinadores';

class Add_Event_NextAlt extends Component{
    constructor(props) {
        super(props);
        this.state = {
          estadoCamposInfo: true,
          estadoRequisitosInfo: false,
          estadoActividadesInfo: false,
          estadoOrganizadoresInfo: false,
          estadoPatrocinadoresInfo: false,
        };
      }
    cambiarEstadoCampos = (nuevoEstado) => {
        this.setState({ estadoCamposInfo: true });
        this.setState({ estadoRequisitosInfo: false });
        this.setState({ estadoActividadesInfo: false });
        this.setState({ estadoOrganizadoresInfo: false });
        this.setState({ estadoPatrocinadoresInfo: false });
    };
    cambiarEstadoRequisitos = (nuevoEstado) => {
        this.setState({ estadoRequisitosInfo: true });
        this.setState({ estadoCamposInfo: false });
        this.setState({ estadoActividadesInfo: false });
        this.setState({ estadoOrganizadoresInfo: false });
        this.setState({ estadoPatrocinadoresInfo: false });
    };
    cambiarEstadoActividades = (nuevoEstado) => {
        this.setState({ estadoRequisitosInfo: false });
        this.setState({ estadoCamposInfo: false });
        this.setState({ estadoActividadesInfo: true });
        this.setState({ estadoOrganizadoresInfo: false });
        this.setState({ estadoPatrocinadoresInfo: false });
    };
    cambiarEstadoOrganizadores = (nuevoEstado) => {
        this.setState({ estadoRequisitosInfo: false });
        this.setState({ estadoCamposInfo: false });
        this.setState({ estadoActividadesInfo: false });
        this.setState({ estadoOrganizadoresInfo: true });
        this.setState({ estadoPatrocinadoresInfo: false });
    };
    cambiarEstadoPatrocinadores = (nuevoEstado) => {
        this.setState({ estadoRequisitosInfo: false });
        this.setState({ estadoCamposInfo: false });
        this.setState({ estadoActividadesInfo: false });
        this.setState({ estadoOrganizadoresInfo: false });
        this.setState({ estadoPatrocinadoresInfo: true });
    };

    render(){
        const { estadoCamposInfo } = this.state;
        const { estadoRequisitosInfo } = this.state;
        const { estadoActividadesInfo } = this.state;
        const { estadoOrganizadoresInfo } = this.state;
        const { estadoPatrocinadoresInfo } = this.state;
        return (
          <>
                <div className="contenedorMaximo"></div>
                <div className="vistaPestana">
                    <p className="tituloEvento-home">REGISTRAR EVENTO</p>
                    <div className='contenedorInfoPestana'>
                        <div className='pestanasEventos'>
                            <div className={`campoPestana cmp${estadoCamposInfo ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoCampos()}>
                                <h3>Campos</h3>
                            </div>
                            <div className={`campoPestana req${estadoRequisitosInfo ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoRequisitos()}>
                                <h3>Requisitos</h3>
                            </div>
                            <div className={`campoPestana act${estadoActividadesInfo ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoActividades()}>
                                <h3>Actividades</h3>
                            </div>
                            <div className={`campoPestana org${estadoOrganizadoresInfo ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoOrganizadores()}>
                                <h3>Organizadores</h3>
                            </div>
                            <div className={`campoPestana ptr${estadoPatrocinadoresInfo ? ' activo' : ''}`} onClick={() =>this.cambiarEstadoPatrocinadores()}>
                                <h3>Patrocinadores</h3>
                            </div>
                        </div>
                        <div className='contenedorCamb'>
                            <Campos
                                estadoCampos={this.state.estadoCamposInfo}
                                cambiarEstadoCampos={this.cambiarEstadoCampos}
                            />
                            <Requisitos
                                estadoRequisitos={this.state.estadoRequisitosInfo}
                                cambiarEstadoRequisitos={this.cambiarEstadoRequisitos}
                            />
                            <Actividades
                                estadoActividades={this.state.estadoActividadesInfo}
                                cambiarEstadoActividades={this.cambiarEstadoActividades}
                            />
                            <Organizadores
                                estadoOrganizadores={this.state.estadoOrganizadoresInfo}
                                cambiarEstadoOrganizadores={this.cambiarEstadoOrganizadores}
                            />
                            <Patrocinadores
                                estadoPatrocinadores={this.state.estadoPatrocinadoresInfo}
                                cambiarEstadoPatrocinadores={this.cambiarEstadoPatrocinadores}
                            />
                        </div>
                    </div>
                </div>
          </>
          )}
}
export default Add_Event_NextAlt;