import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';


function Patrocinadores({estadoPatrocinadores, cambiarEstadoPatrocinadores}){


    return (
        estadoPatrocinadores && (
        <div className='tituloCampos'>
            <h2>Patrocinadores</h2>
            <div className='seccionCampo patrocinadoresReg'>
                <h3>GOLD</h3>
                <div className='seccionesExtra extraOrganizador'>
                {/* {this.state.patrocinadores.map((patrocinador) => ( */}
                    <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="organizadoresSeleccionados"
                        id="checkBoxAddEvent"
                        name="vehicle1"
                        // value={patrocinador.id}
                      />
                      <span id="titulosCheckbox" className='nombreCheckOrg'>
                        Patrocinador 1
                        {/* {patrocinador.nombre_patrocinador} */}
                      </span>
                    </div>
                {/* ))} */}
                </div>
                <h3>SILVER</h3>
                <div className='seccionesExtra extraOrganizador'>
                {/* {this.state.patrocinadores.map((patrocinador) => ( */}
                <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="organizadoresSeleccionados"
                        id="checkBoxAddEvent"
                        name="vehicle1"
                        // value={patrocinador.id}
                      />
                      <span id="titulosCheckbox" className='nombreCheckOrg'>
                        Patrocinador 1
                        {/* {patrocinador.nombre_patrocinador} */}
                      </span>
                    </div>
                {/* ))} */}
                  
                </div>
                <h3>BRONCE</h3>
                <div className='seccionesExtra extraOrganizador'>
                {/* {this.state.patrocinadores.map((patrocinador) => ( */}
                <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="organizadoresSeleccionados"
                        id="checkBoxAddEvent"
                        name="vehicle1"
                        // value={patrocinador.id}
                      />
                      <span id="titulosCheckbox" className='nombreCheckOrg'>
                        Patrocinador 1
                        {/* {patrocinador.nombre_patrocinador} */}
                      </span>
                    </div>
                {/* ))} */}
                  
                </div>
            </div>
        </div>)

    );
}

export default Patrocinadores;