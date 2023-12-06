import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Organizadores({estadoOrganizadores, cambiarEstadoOrganizadores}){

    const id = cookies.get('ultimo_id_evento');

    const [organizadores, setOrganizadores] = useState ( [] );

    const getOrganizadores = async()=>{
        const url = "http://127.0.0.1:8000/api/get-organizador"; 
        const respuesta = await axios.get(url);
        setOrganizadores(respuesta.data.organizadores)
    }

    useEffect(()=>{
        getOrganizadores();
    }, [])

    return (
        estadoOrganizadores && (
        <div className='tituloCampos'>
            <h2>Organizadores</h2>
            <div className='seccionCampo'>
                <div className='seccionesExtra extraOrganizador'>
                    {organizadores.map((organizador) => ( 
                        <><div className="contCadaOrganizador">
                            <input
                                type="checkbox"
                                className="organizadoresSeleccionados"
                                id="checkBoxAddEvent"
                                name="vehicle1"
                                value={organizador.id} />
                            <span id="titulosCheckbox" className='nombreCheckOrg'>
                                {organizador.nombre_organizador}
                            </span>
                        </div>
                        </>
                    ))} 
                </div>
            </div>
            
        </div>
        )

    );
}

export default Organizadores;