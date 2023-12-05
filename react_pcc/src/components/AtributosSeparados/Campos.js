import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';


function Campos({estadoCampos, cambiarEstadoCampos}){

    const cancelar = <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />;
    return (
        estadoCampos && (
        <div className='tituloCampos'>
            <h2>Campos Adicionales</h2>
            <div className='seccionCampo'>
                <h3>Secciones de información</h3>
                <div className='seccionesExtra'>
                {/* {this.state.atributos.map((atributo) => ( */}
                    <div className="campo-cont">
                      <div id="entradaEveNex">
                        <p id="textoCuadro">Seccion extra 1*</p>
                        <input
                          id="inputRegistro"
                        //   type={atributo.tipo_dato_atributo}
                          name="valor"
                          placeholder="Campo Adicional"
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
                        Agregar Sección de información +
                    </button>
                  </div>
                </div>
                <h3>Campos adicionales para el formulario de registro al evento</h3>
                <div className='seccionesExtra'>
                {/* {this.state.atributos.map((atributo) => ( */}
                    <div className="campo-cont">
                      <div id="entradaEveNex">
                        <p id="textoCuadro">Campo Numero 1*</p>
                        <input
                          id="inputRegistro"
                        //   type={atributo.tipo_dato_atributo}
                          name="valor"
                          placeholder="Campo Adicional"
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
                        Agregar Campo Para Formulario +
                    </button>
                  </div>
                </div>
            </div>
        </div>)

    );
}

export default Campos;