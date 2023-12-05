import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';


function Actividades({estadoActividades, cambiarEstadoActividades}){

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;
    return (
        estadoActividades && (
        <div className='tituloCampos'>
            <h2>Actividades</h2>
            <div className='seccionCampo'>
                <div className='seccionesExtraActividad'>
                {/* {this.state.atributos.map((atributo) => ( */}
                    <h3>Actividad Num 1</h3>
                    <div className="campo-cont actividad-cont">
                      <div id="entradaEveNex">
                        <p id="textoCuadro">Descripción*</p>
                        <textarea
                          name="contenido_anuncio"
                          className="inputRequisitoOp"
				                  rows={2}
				                  cols={20}
                          // placeholder={requisito.contenido_requisito}
                          readOnly
                        />
                      </div>
                      <div className='fechasActividadModif'>
                        <div className='cuadroFechasActModif'>
                            <div className='fechaActModif'>
                                <h4>Fecha inicio</h4>
                                <p>04/06 /2001</p>
                            </div>
                            <div className='fechaActModif'>
                                <h4>Fecha fin</h4>
                                <p>08/10/2001</p>
                            </div>
                        </div>
                      </div>
                      <button
                        className="botonEliminarCampo botonEliminarActividad"
                        type="button"
                        // onClick={() => this.eliminarAtributo(atributo.id)}
                      >
                        {cancelar}
                      </button>
                    </div>
                  {/* ))} */}
                  
                </div>
                <div className='contenedorBotonCampo'>
                    <button
                        className="botonAgregarCampo"
                        type="button"
                        // onClick={() =>
                        // this.cambiarEstadoModalEleccion(!this.state.estadoModalEleccion)
                        // }
                    >
                        Agregar Actividad +
                    </button>
                  </div>
            </div>
        </div>)

    );
}

export default Actividades;