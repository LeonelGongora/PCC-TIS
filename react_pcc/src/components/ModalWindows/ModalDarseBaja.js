import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../stylesheets/ModalWindowStyle.css";


function ModalDarseBaja({ estadoDarseBaja1, cambiarEstadoDarseBaja1,cambiarEstadoBanner2, nombreBanner1, euid }) {

  const salirVentanaModalBanner = async(e) => {
    const url = `http://127.0.0.1:8000/api/eventousuarios/${euid}`;
    await axios.delete(url);
    // console.log(`se elimino ${euid}`)
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
