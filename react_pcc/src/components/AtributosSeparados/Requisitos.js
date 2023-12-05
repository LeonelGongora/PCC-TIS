import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';


function Requisitos({estadoRequisitos, cambiarEstadoRequisitos}){

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;
    return (
        estadoRequisitos && (
        <div className='tituloCampos'>
            <h2>Requisitos</h2>
            <div className='seccionCampo'>
                <div className='seccionesExtra'>
                {/* {this.state.atributos.map((atributo) => ( */}
                    <div className="campo-cont requisito-cont">
                      <div id="entradaEveNex">
                      <p id="textoCuadro" className='cuadroRequisito'>Requisito 1</p>
                        <textarea
                          name="contenido_anuncio"
                          className="inputRequisitoOp"
				                  rows={2}
				                  cols={20}
                          // placeholder={requisito.contenido_requisito}
                          readOnly
                        />
                      </div>
                      <button
                        className="botonEliminarCampo"
                        type="button"
                        // onClick={() => this.eliminarAtributo(atributo.id)}
                      >
                        {cancelar}
                      </button>
                    </div>
                  {/* ))} */}
                  <div className='contenedorBotonCampo'>
                    <button
                        className="botonAgregarCampo"
                        type="button"
                        // onClick={() =>
                        // this.cambiarEstadoModalEleccion(!this.state.estadoModalEleccion)
                        // }
                    >
                        Agregar Requisito +
                    </button>
                  </div>
                </div>
            </div>
        </div>)

    );
}

export default Requisitos;