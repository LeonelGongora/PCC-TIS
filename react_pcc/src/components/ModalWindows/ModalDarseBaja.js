import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../stylesheets/ModalWindowStyle.css";


function ModalDarseBaja({ estadoDarseBaja1, cambiarEstadoDarseBaja1,cambiarEstadoBanner2 }) {

  const salirVentanaModalBanner = (e) => {
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
              ¿Esta seguro darse de baja del evento?
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
