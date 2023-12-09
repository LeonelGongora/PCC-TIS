import React, { useState, useEffect } from "react";
import "../stylesheets/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "universal-cookie";
import {URL_API} from '../const';

const cookies = new Cookies();
const Notificacion_Url = `${URL_API}/misnotificaciones`;

function DropdownNotification({setOpenDropFath, isOpen}) {
  //const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState([])

  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropFath(null);
    } else {
      setOpenDropFath("notification");
    } 
  };

  useEffect(() => {
    getNotification();
  },[])

  const getNotification=async()=>{
    if(cookies.get('id_usuario') === '' || cookies.get('id_usuario')=== undefined){
      console.log(`${cookies.get('id_usuario')} No se encuentra registrado`)
    }else{
      const id = cookies.get('id_usuario');
      const url = `${Notificacion_Url}/${id}`;
      const response = await axios.get(url)
      const r = response.data.notifications

      //ordenar por id
      r.sort((o1, o2)=>{
        if(o1.id < o2.id){
          return -1;
        }else if(o1.id > o2.id){
          return 1;
        }else{
          return 0;
        }
      });
      //fin

      // console.log(r)
      setNotification(r)
    }
  }

  function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
       return a[p_key] > b[p_key];
    });
 }

  return (
    <div className="dropdown-container">
      <button
        className={`${isOpen
            ? "dropdown-button-notification-active"
            : "dropdown-button-notification "
          }`}
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon className="dropdownIcon-notification" icon={faBell} />
      </button>
      {isOpen && (
        
            <ul className="dropdown-menu-notification">
              {notification[0] != null ? (
                <>
                {notification.map((n) => {  
                      return (<div key={n.id}>
                        {n.informacion === null ? (
                          <>
                            <li>{n.contenido}
                            <p>{n.created_at}</p>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>{`${n.contenido}. Mayor Informacion: ${n.informacion}`}
                            <p>{n.created_at}</p>
                            </li>
                          </>
                        )}
                      </div>);
                })}</>
              ):(
                <li>No tiene notificaciones</li>
              )}  
            </ul>
      )}
    </div>
  );
}

export default DropdownNotification;
