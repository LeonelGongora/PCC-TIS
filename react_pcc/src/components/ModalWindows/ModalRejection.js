import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const salir = <FontAwesomeIcon icon={faCircleXmark} />
const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const EventoUsuario_Url_Api= configApi.EVENTO_USUARIO_API_URL;
const Notification_Url_Api= configApi.NOTIFICATION_API_URL;
const NotificationUser_Url_Api=configApi.NOTIFICATIONUSER_API_URL;

function ModalRejection({estadoRejection, cambiarEstadoModalRejection, id_evento, id_user, id}){

    const [event, setEvent] = useState ( [] );
    const [requisitos, setRequisitos] = useState ( [] );
    const [state, setState] = useState ({
        id:'',
        nombre_evento:'',
    });
    const [checkedList, setCheckedList] = useState([]);
    const [razon, setRazon] = useState ('');

    const [values, setValues] = useState({
        razon_rechazo : "",
    });

    const [errors, setErrors] = useState({});

    const salirVentanaModal = (e) => {
        cambiarEstadoModalRejection(false);
        setValues({
            razon_rechazo : '',
        });
        setErrors({});
    }

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
    }

    const handleRazonChange = (event) => {
        setRazon(event.target.value);
    };
    
    const saveTypeEvent = async (e) => {
        e.preventDefault();
    
        const validationErrors = {};
    
        if(!razon.trim()){
            validationErrors.razon_rechazo = "Este campo es obligatorio"
        }
    
        setErrors(validationErrors);
    
        if(Object.keys(validationErrors).length === 0){
            
            // console.log(id_user);
            const req = checkedList.join(", ");
            var contenido = `Ha sido rechazado del evento: ${state.nombre_evento}, por no cumplir con los siguiente(s) requisito(s): ${req}`;
            if(checkedList.length ===0){
                contenido = `Ha sido rechazado del evento: ${state.nombre_evento}. Razon: ${razon}`
            }
            // console.log(contenido)
            await axios.put(`${EventoUsuario_Url_Api}/${id_user}`, {
                solicitud: 2,
            })
            .then(response=>{
                axios.post(Notification_Url_Api, {
                    contenido: contenido,
                    informacion: razon,
                    leido: 0
                })
                .then(response=>{
                    axios.post(NotificationUser_Url_Api, {
                        notification_id: response.data.id,
                        user_id: id
                    }).then(response=>{
                        window.location.reload();
                    })
                })
            })
        }
    }

    useEffect(() => {
        getEvent()
        // console.log(id_evento)
        // console.log(id_user)
    },[])
    
    const getEvent=async()=>{
        const idevent = cookies.get('auteId');
        const url = `${Eventos_Api_Url}/${idevent}`;
        const response = await axios.get(url)

        setRequisitos(response.data.requirements)
        setState({
            id: response.data.id,
            nombre_evento: response.data.nombre_evento
        });
    }

    useEffect(()=>{
        // console.log(event)
        // console.log(state.id)
        // console.log(state.nombre_evento)
        // console.log(requisitos)
        // console.log(checkedList)
        // console.log(razon)
    })

    const handleSelect = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
     
        if (isChecked) {
          setCheckedList([...checkedList, value]);
        } else {
          const filteredList = checkedList.filter((item) => item !== value);
          setCheckedList(filteredList);
        }
    };

    return (
        estadoRejection && (
            <div className="Overlay">
              <div className="ContenedorModal contRej">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Razón de rechazo</h1>
                  </div>
                  <button
                    onClick={salirVentanaModal}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento reqCont">
                    <form onSubmit={saveTypeEvent} id="form1" className='reqForm'>
                        {requisitos.map((r, index) => {  
                        return (<div key={r.id}>
                            <label>
                                <input 
                                    type='checkbox' 
                                    defaultChecked={false} 
                                    className='reqCheckbox'
                                    value={r.contenido_requisito}
                                    onChange={handleSelect}
                                />
                                {index+1}. {r.contenido_requisito}
                            </label>
                        </div>);
                        })}

                        {/* <label>
                            <input type='checkbox' defaultChecked={true} className='reqCheckbox'/>
                                Requisito numero 1 ksjhfnksjdfh skdjfhsdf sdfsdf sdfsdf asdasdad asasa asdasdasd asdasdaqweqwe asdasdqwe
                        </label>
                        <label>
                            <input type='checkbox' defaultChecked={true} className='reqCheckbox'/>
                                Requisito numero 1 ksjhfnksjdfh skdjfhsdf sdfsdf sdfsdf asdasdad asasa asdasdasd asdasdaqweqwe asdasdqwe Requisito numero 1 ksjhfnksjdfh skdjfhsdf sdfsdf sdfsdf asdasdad asasa asdasdasd asdasdaqweqwe asdasdqwe
                        </label> */}
                        <div className='extraInfo'>
                            <p id="textoCuadroAtributo">Añadir información</p>
                        
                            <textarea
                            type="text"
                            name="razónRechazo"
                            className="inputMasInfo"
                            placeholder="Mayor informacion del rechazo"
                            onChange={handleRazonChange}/>
                        </div>
                        {errors.razon_rechazo && (
                        <span className="span1Modal">{errors.razon_rechazo}</span>
                        )}

                    </form>
                    <button form="form1" type="submit" className="BotonRegistrar">
                        Enviar
                    </button>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalRejection;