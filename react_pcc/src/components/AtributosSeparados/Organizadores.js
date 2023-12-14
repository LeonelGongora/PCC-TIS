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

const Eventos_Api_Url = configApi.EVENTOC_API_URL;

function Organizadores({estadoOrganizadores, cambiarEstadoOrganizadores, organizadoresRegistrados}){

    const id = cookies.get('ultimo_id_evento');

    const [organizadores, setOrganizadores] = useState ( [] );
    
    const organizadores_agregar = cookies.get('organizadores_agregar');
    const organizadores_eliminar = cookies.get('organizadores_eliminar');

    //organizadores : [],
    

    let mostrar_organizador = false;

    const getOrganizadores = async()=>{
        const url = `${URL_API}/get-organizador`;
        const respuesta = await axios.get(url);
        setOrganizadores(respuesta.data.organizadores)
    }

    const registrarOrganizadores = async(e)=>{
        e.preventDefault();
        let organizadores_id = [];

        let organizadoresSeleccionados = document.querySelectorAll('.organizadoresSeleccionados');
        let arrayOrganizadores = Array.from(organizadoresSeleccionados);

        for (let index = 0; index < arrayOrganizadores.length; index++) {
            if(arrayOrganizadores[index].checked === true){
                organizadores_id.push(parseInt(arrayOrganizadores[index].value))
            }
        }

        let organizadores_id_registrados = [];

        for (let index = 0; index < organizadoresRegistrados.length; index++) {
          organizadores_id_registrados.push(organizadoresRegistrados[index].id);
        }

        const validationErrors = {};

        if(Object.keys(validationErrors).length === 0){

            console.log("Registrados")
            console.log(organizadores_id_registrados)
            console.log("Seleccionados")
            console.log(organizadores_id)

            let organizadores_agregar = [];
            let organizadores_eliminar = [];

            for (let i = 0; i < organizadores_id.length; i++) {
                if(!organizadores_id_registrados.includes(organizadores_id[i])){
                    organizadores_agregar.push(organizadores_id[i])
                }
            }

            for (let i = 0; i < organizadores_id_registrados.length; i++) {
                if(!organizadores_id.includes(organizadores_id_registrados[i])){
                  organizadores_eliminar.push(organizadores_id_registrados[i])
                }
            }
  
            console.log("Agregar")
            console.log(organizadores_agregar)
            console.log("Eliminar")
            console.log(organizadores_eliminar)

            const url_Organizador_agregar = `${URL_API}/add-event_organizer`; 
            const url_Organizador_eliminar = `${URL_API}/delete-event_organizer`; 

            for (let index = 0; index < organizadores_agregar.length; index++) {
                const data = new FormData()
                let organizador = organizadores_agregar[index]
                data.append("organizador", organizador)
                data.append("evento", id)
  
                axios.post(url_Organizador_agregar, data).then(res => {
                  if(res.data.status === 200){
                    console.log(res);
                  }
                })
            }

            for (let index = 0; index < organizadores_eliminar.length; index++) {
              
                const data = new FormData()
                let organizador = organizadores_eliminar[index]
                data.append("organizador", organizador)
                data.append("evento", id)
  
                axios.post(url_Organizador_eliminar, data).then(res => {
                  if(res.data.status === 200){
                    console.log(res);
                  }
                })
            }

        }
    }
    const actualizarOrganizadores = (e)=>{
        
        let organizadores_id = [];

        let organizadoresSeleccionados = document.querySelectorAll('.organizadoresSeleccionados');
        let arrayOrganizadores = Array.from(organizadoresSeleccionados);

        for (let index = 0; index < arrayOrganizadores.length; index++) {
            if(arrayOrganizadores[index].checked === true){
                organizadores_id.push(parseInt(arrayOrganizadores[index].value))
            }
        }
        
        console.log(organizadoresRegistrados)

        let organizadores_id_registrados = [];

        for (let index = 0; index < organizadoresRegistrados.length; index++) {
          organizadores_id_registrados.push(organizadoresRegistrados[index].id);
        }

        console.log("Registrados")
        console.log(organizadores_id_registrados)
        console.log("Seleccionados")
        console.log(organizadores_id)
        
        let organizadores_agregar = [];
        let organizadores_eliminar = [];

        for (let i = 0; i < organizadores_id.length; i++) {
             if(!organizadores_id_registrados.includes(organizadores_id[i])){
                organizadores_agregar.push(organizadores_id[i])
            }
        }

        for (let i = 0; i < organizadores_id_registrados.length; i++) {
            if(!organizadores_id.includes(organizadores_id_registrados[i])){
                organizadores_eliminar.push(organizadores_id_registrados[i])
            }
        }
  
        console.log("Agregar")
        console.log(organizadores_agregar)
        console.log("Eliminar")
        console.log(organizadores_eliminar)

        cookies.set('organizadores_agregar', organizadores_agregar, { path: "/" });
        cookies.set('organizadores_eliminar', organizadores_eliminar, { path: "/" });
    }

    useEffect(()=>{
        getOrganizadores();
    }, [])

    return (
        estadoOrganizadores && (
        <>
        <div className='tituloCampos'>
            <h2>Organizadores</h2>
            <div className='seccionCampo'>
                <div className='seccionesExtra extraOrganizador'>
                    {organizadores.map((organizador) => {

                        mostrar_organizador = false;

                        for (let i = 0; i < organizadoresRegistrados.length; i++) {
                            if(organizador.id === organizadoresRegistrados[i].id){
                              mostrar_organizador = true;
                            }
                        }
                        organizador["valor"] = mostrar_organizador;
                        return (
                        <>
                           <div className="contCadaOrganizador">
                               <input
                                    type="checkbox"
                                    className="organizadoresSeleccionados"
                                    id="checkBoxAddEvent"
                                    name="vehicle1"
                                    value={organizador.id}
                                    defaultChecked = {organizador.valor}
                                    onClick={actualizarOrganizadores}
                                />
                               <span id="titCheck" className='nombreCheckOrg'>
                                    {organizador.nombre_organizador}
                                </span>
                            </div>
                        </>
                        );
                    })} 
                </div>
            </div>
            
        </div>
        <div className='contBotonRegist'>
            <button className='botonesCambiar'
            onClick={registrarOrganizadores}
            //onClick={() => { cambiarEstadoModalEleccion(false); cambiarEstadoCampoSeleccion(true);}}
            >
            Terminar Registro
            </button>
        </div>
        </>
        )

    );
}

export default Organizadores;