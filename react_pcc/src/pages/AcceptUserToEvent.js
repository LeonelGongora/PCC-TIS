import React, {Component, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin';
import "../stylesheets/AcceptUserToEventStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

const cookies = new Cookies();


class AcceptUserToEvent extends Component{
    render(){

        return(

            <div className="App">
                <div className="background-image"></div> {/* Componente de fondo */}
                <div className="content">
                   <NavbarAdmin/>
                   <div className="contenedor">
                        <div className="contenedorSolicitudes">
                            <h1 className='tituloPagAcept'>Nombre Evento</h1>
                            <div className='containerUserSol'>
                                <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                                <h4 className='nameUser'>Andrews Ivar Valdivia</h4>
                                <a><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a>
                                <button className='buttonAcceptUser'> Aceptar </button>
                            </div>
                            <div className='containerUserSol'>
                                <FontAwesomeIcon className='buttonIconUser' icon={faUser} />
                                <h4 className='nameUser'>Andrews Ivar Valdivia</h4>
                                <a><FontAwesomeIcon className='buttonIconDownload' icon={faDownload} /></a>
                                <button className='buttonAcceptUser'> Aceptar </button>
                            </div>
                        </div>
                    </div>
                </div>

                
           </div>

        );
    }
}

export default AcceptUserToEvent;