import React, { useState, useEffect } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "universal-cookie";
import {URL_API} from '../const';

const cookies = new Cookies();
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

  return (
    <div className="dropdown-container">
      <button
        className={`${
          isOpen
            ? "dropdown-button-notification-active"
            : "dropdown-button-notification "
        }`}
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
                        <li>
                          {n.contenido}
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
                  </div>
                );
              })}
            </>
          ) : (
            <li>No tiene notificaciones</li>
          )}
          {/* <li>Registrarse a Eventos</li>
          <li>Visualizar eventos</li>
          <li>Darse de Baja de evento</li> */}
        </ul>
      )}
    </div>
  );
}

export default DropdownNotification;
