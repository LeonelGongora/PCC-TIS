import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';


function Organizadores({estadoOrganizadores, cambiarEstadoOrganizadores}){


    return (
        estadoOrganizadores && (
        <div className='tituloCampos'>
            <h2>Organizadores</h2>
            <div className='seccionCampo'>
                <div className='seccionesExtra extraOrganizador'>
                    {/* {this.state.organizadores.map((organizador) => ( */}
                        <div className="contCadaOrganizador">
                        <input
                            type="checkbox"
                            className="organizadoresSeleccionados"
                            id="checkBoxAddEvent"
                            name="vehicle1"
                            // value={organizador.id}
                        />
                        <span id="titulosCheckbox" className='nombreCheckOrg'>
                            Organizador 1
                            {/* {organizador.nombre_organizador} */}
                        </span>
                        </div>
                        <div className="contCadaOrganizador">
                        <input
                            type="checkbox"
                            className="organizadoresSeleccionados"
                            id="checkBoxAddEvent"
                            name="vehicle1"
                        />
                        <span id="titulosCheckbox" className='nombreCheckOrg'>
                            Organizador 1 dkfjhsdfjhs kjsdf hsyse huifysuyh seufysufsefy
                        </span>
                        </div>
                        <div className="contCadaOrganizador">
                        <input
                            type="checkbox"
                            className="organizadorSelect"
                            id="checkBoxAddEvent"
                            name="vehicle1"
                        />
                        <span id="titulosCheckbox" className='nombreCheckOrg'>
                            Organizador 1
                        </span>
                        </div>
                        <div className="contCadaOrganizador">
                        <input
                            type="checkbox"
                            className="organizadorSelect"
                            id="checkBoxAddEvent"
                            name="vehicle1"
                        />
                        <span id="titulosCheckbox" className='nombreCheckOrg'>
                            Organizador 1
                        </span>
                        </div>
                        <div className="contCadaOrganizador">
                        <input
                            type="checkbox"
                            className="organizadorSelect"
                            id="checkBoxAddEvent"
                            name="vehicle1"
                        />
                        <span id="titulosCheckbox" className='nombreCheckOrg'>
                            Organizador 1
                        </span>
                        </div>
                    {/* ))} */}
                </div>
            </div>
        </div>)

    );
}

export default Organizadores;