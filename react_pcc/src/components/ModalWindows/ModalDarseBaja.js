import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../stylesheets/ModalWindowStyle.css";
import {URL_API} from '../../const';

function ModalDarseBaja({ estadoDarseBaja1, cambiarEstadoDarseBaja1,cambiarEstadoBanner2, nombreBanner1, euid, pe, ne }) {
  
  const [clic , setClic]= useState(false);
  const salirVentanaModalBanner = async(e) => {
    if (pe <=1 ){
      // console.log(`${pe}individual ${euid}`)
      const url = `${URL_API}/eventousuarios/${euid}`;
      await axios.delete(url);
      // console.log(`se elimino ${euid}`)
      cambiarEstadoDarseBaja1(false);
      cambiarEstadoBanner2(true);
    }else{
      setClic(true)
      // console.log(`${pe}equipo ${euid}`)
      const url = `${URL_API}/delete-team/${euid}`;
      const uno = axios.delete(url);

      const urlidusers = `${URL_API}/iduserofteams/${euid}`
      const tres = axios.get(urlidusers) 
      
      const results = await Promise.all([tres, uno])

      const resusers= results[0];

      const contenido2 = `El equipo: ${ne}, al que perteneces, ha sido dado de baja del evento: ${nombreBanner1}`
      const url_notificacion = `${URL_API}/notifications`;
      const url_notificacionuser = `${URL_API}/notificationusers`;

      const res = await axios.post(url_notificacion, {
        contenido: contenido2,
        informacion: null,
        leido: 0
        })
        .then(res=>{

            (async () => {
                for await (const commit of resusers.data) {
                //   console.log(commit.id);
                    axios.post(url_notificacionuser, {
                        notification_id: res.data.id,
                        user_id: commit.id,
                        auxieventid: null
                    })
                    .then(resp=>{
                        console.log(`Se creo notificacion del participante ${commit.id}`)
                    })
                }
            })()
        })

        console.log(`termino`)
        setTimeout(recargarPagina, 2500);
      }
  };

  const recargarPagina = () => {
    cambiarEstadoDarseBaja1(false);
    cambiarEstadoBanner2(true);
};

  const salirVentanaModal = (e) => {
    cambiarEstadoDarseBaja1(false);
    
  };

  return (
    estadoDarseBaja1 && (
      <div className="Overlay">
        <div className="ContenedorModal">
          <div className="EncabezadoModal">
            <div className="tituloEvento">
              <h1>ADVERTENCIA</h1>
            </div>
          </div>
          <div className="registroTipoEvento-DarseBaja">
            <span className="textoDarseBaja">
              {pe <= 1 ? (
                <>
                ¿Está seguro darse de baja del evento {nombreBanner1 }?
                </>
              ) : (
                <>
                ¿Está seguro dar de baja el equipo del evento {nombreBanner1 }?
                </>
              )}
            </span>
            <div className="botonesDarseBaja">
              <button
                type="submit"
                className="BotonRegistrar"
                onClick={() => salirVentanaModal(false)}
                disabled={clic}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="BotonRegistrar"
                onClick={() => salirVentanaModalBanner(false)}
                disabled={clic}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalDarseBaja;
