import React, { useState, useEffect } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import configApi from '../configApi/configApi'
import Cookies from "universal-cookie";
import {URL_API} from '../const';
import ModalActividad from "./ModalWindows/ModalActividad";
import ModalCamposEquipo from "./ModalWindows/ModalCamposEquipo";

const cookies = new Cookies();
const Eventos_Api_Url = configApi.EVENTOC_API_URL;
const Notificacion_Url = `${URL_API}/misnotificaciones`;
const User_Url = `${URL_API}/usuarios`;

function DropdownNotification({setOpenDropFath, isOpen}) {
  //const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0); 
  const [notificationlength, setNotificationlength] = useState(0); 

  const incrementNotifications = () => {
    setNotificationCount(notificationCount + 1);
  };

  const toggleDropdown = async () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("notification");
    }

    if (notificationCount>0) {
      // console.log(`actualizar countnoti ${notificationCount}`)
      const id = cookies.get("id_usuario");
      const url = `${User_Url}/${id}`
      // console.log(url)
      await axios.put(url, {
        auxinoti: notificationlength
      })
      setNotificationCount(0)
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    if (
      cookies.get("id_usuario") === "" ||
      cookies.get("id_usuario") === undefined
    ) {
      console.log(`${cookies.get("id_usuario")} No se encuentra registrado`);
    } else {
      const id = cookies.get("id_usuario");
      const url = `${Notificacion_Url}/${id}`;
      const response = await axios.get(url);
      const r = response.data.notifications;
      const countnoti = response.data.countnoti;

      //ordenar por id
      r.sort((o1, o2) => {
        if (o1.id < o2.id) {
          return 1;
        } else if (o1.id > o2.id) {
          return -1;
        } else {
          return 0;
        }
      });
      //fin
      console.log(r)
      
      for (let i = 0; i < r.length; i++) {
        const fecha1 = r[i].created_at.split(' ')[0]
        const hora = r[i].created_at.split(' ')[1]
        let fecha = new Date(fecha1);
        var dia = fecha.getDate() + 1;
        var mes = fecha.getMonth() + 1;
        let format4 = dia + "-" + mes + "-" + fecha.getFullYear();
        r[i].created_at = format4 + " " + hora ;
      }

      // console.log(r)
      setNotification(r);
      
      setNotificationlength(r.length);

      // console.log(r.length)
      // console.log(countnoti)
      if (countnoti<r.length){
        const cn = r.length-countnoti;
        setNotificationCount(cn)
        // console.log(`SE muestra esto: ${countnoti}`)
      }else{
        // console.log("no se muestra nada")
        setNotificationCount(0)
      }
    }
  };

  function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
      return a[p_key] > b[p_key];
    });
  }

  async function abrirmodal(id_notification, id_user, id_event) {

    
    
    const url = `${Eventos_Api_Url}/${id_event}`;
    
    axios.get(url).then( response => {
      console.log(response)
      setEstadoModalActividad(!estadoModalActividad)

      let atributos_Aux = response.data.attributes
      for (let i = 0; i < atributos_Aux.length; i++) {
        if(atributos_Aux[i].tipo_dato_atributo === "select"){
          atributos_Aux[i]["esSelect"] = true;
          let nueva_Restriccion = atributos_Aux[i].restriccion.split(",");
          atributos_Aux[i].restriccion = nueva_Restriccion;
        }else{
          atributos_Aux[i]["esSelect"] = false;
        }
      }
      console.log(atributos_Aux)
      cookies.set('campos_evento', atributos_Aux, {path: "/"});
      
    })
    /* 
      
      if(response){
        let atributos_Aux = response.data.attributes
        for (let i = 0; i < atributos_Aux.length; i++) {
          if(atributos_Aux[i].tipo_dato_atributo === "select"){
            atributos_Aux[i]["esSelect"] = true;
            let nueva_Restriccion = atributos_Aux[i].restriccion.split(",");
            atributos_Aux[i].restriccion = nueva_Restriccion;
          }else{
            atributos_Aux[i]["esSelect"] = false;
          }
        }

        //setEvent(response.data)
        //setAtributos(atributos_Aux)
      }
    */
    
    console.log(id_notification)
    console.log(id_user)
    console.log(id_event)
  }

  const [estadoModalActividad, setEstadoModalActividad] = useState(false);
  
  const cambiarEstadoModalActividad = (nuevoEstado) => {
    setEstadoModalActividad(nuevoEstado);
  }

  return (

    <>
    <ModalCamposEquipo
      estadoActividad={estadoModalActividad}
      cambiarEstadoModalActividad={cambiarEstadoModalActividad}
      />
      
      <div className="dropdown-container">
        <button
          className={`${isOpen
              ? "dropdown-button-notification-active"
              : "dropdown-button-notification "}`}
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon className="dropdownIcon-notification" icon={faBell} />
          {notificationCount > 0 && (
            <span className="notification-count">{notificationCount}</span>
          )}
        </button>
        {isOpen && (
          <ul className="dropdown-menu-notification">
            <p id="tituloNotif">Notificaciones</p>
            {notification[0] != null ? (
              <>
                {notification.map((n) => {
                  return (
                    <div key={n.id}>
                      {n.informacion === null ? (
                        <>
                          {n.leido === 1 ? (
                            <>
                              <li onClick={() => abrirmodal(n.id, n.user_id, n.auxieventid)}>
                                {n.contenido}
                                <p>{n.created_at}</p>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                {n.contenido}
                                <p>{n.created_at}</p>
                              </li>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {n.leido === 1 ? (
                            <>
                              <li onClick={() => abrirmodal(n.id, n.user_id, n.auxieventid)}>
                                {`${n.contenido}. Mayor Informacion: ${n.informacion}`}
                                <p>{n.created_at}</p>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                {`${n.contenido}. Mayor Informacion: ${n.informacion}`}
                                <p>{n.created_at}</p>
                              </li>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <li>No tiene notificaciones</li>
            )}
          </ul>
        )}
      </div>
      </>
  );
}

export default DropdownNotification;
