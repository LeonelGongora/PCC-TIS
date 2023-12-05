import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';


function Patrocinadores({estadoPatrocinadores, cambiarEstadoPatrocinadores}){


    return (
        estadoPatrocinadores && (<h4>hola5</h4>)
    );
}

export default Patrocinadores;