import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';
import {URL_API} from '../../const';

const cookies = new Cookies();

function Patrocinadores({estadoPatrocinadores, cambiarEstadoPatrocinadores}){

  const id = cookies.get('ultimo_id_evento');

    const [patrocinadores, setPatrocinadores] = useState ( [] );

    const getPatrocinadores = async()=>{
        const url = `${URL_API}/get-patrocinador`;
        const respuesta = await axios.get(url);
        setPatrocinadores(respuesta.data.patrocinadores)
    }

    useEffect(()=>{
      getPatrocinadores();
    }, [])


    return (
        estadoPatrocinadores && (
          <>
        <div className='tituloCampos'>
            <h2>Patrocinadores</h2>
            <div className='seccionCampo patrocinadoresReg'>
                <h3>GOLD</h3>
                <div className='seccionesExtra extraOrganizador'>
                {patrocinadores.map((patrocinador) => ( 
                    <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="organizadoresSeleccionados"
                        id="checkBoxAddEvent"
                        name="vehicle1"
                        value={patrocinador.id}
                      />
                      <span id="titCheck" className='nombreCheckOrg'>
                        {patrocinador.nombre_patrocinador}
                      </span>
                    </div>
                ))} 
                </div>
                <h3>SILVER</h3>
                <div className='seccionesExtra extraOrganizador'>
                {patrocinadores.map((patrocinador) => (
                <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="organizadoresSeleccionados"
                        id="checkBoxAddEvent"
                        name="vehicle1"
                        value={patrocinador.id}
                      />
                      <span id="titCheck" className='nombreCheckOrg'>
                        {patrocinador.nombre_patrocinador} 
                      </span>
                    </div>
                ))} 
                  
                </div>
                <h3>BRONCE</h3>
                <div className='seccionesExtra extraOrganizador'>
                {patrocinadores.map((patrocinador) => ( 
                <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="organizadoresSeleccionados"
                        id="checkBoxAddEvent"
                        name="vehicle1"
                        value={patrocinador.id}
                      />
                      <span id="titCheck" className='nombreCheckOrg'>
                        {patrocinador.nombre_patrocinador}
                      </span>
                    </div>
                ))} 
                  
                </div>
            </div>
        </div>
        <div className='contBotonRegist'>
            <button className='botonesCambiar'>
            Terminar Registro
            </button>
        </div>
        </>
        )

    );
}

export default Patrocinadores;