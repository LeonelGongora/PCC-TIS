import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../stylesheets/ModalWindowStyle.css";
import {URL_API} from '../../const';

function ModalDarseBaja({ estadoDarseBaja1, cambiarEstadoDarseBaja1,cambiarEstadoBanner2, nombreBanner1, euid, pe }) {

  const salirVentanaModalBanner = async(e) => {
    if (pe <=1 ){
      // console.log(`${pe}individual ${euid}`)
      const url = `${URL_API}/eventousuarios/${euid}`;
      await axios.delete(url);
      // console.log(`se elimino ${euid}`)
    }else{
      // console.log(`${pe}equipo ${euid}`)
      const url = `${URL_API}/delete-team/${euid}`;
      await axios.delete(url);
    }
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
              ¿Está seguro darse de baja del evento {nombreBanner1 }?
            </span>
            <div className="botonesDarseBaja">
              <button
                type="submit"
                className="BotonRegistrar"
                onClick={() => salirVentanaModal(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="BotonRegistrar"
                onClick={() => salirVentanaModalBanner(false)}
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
