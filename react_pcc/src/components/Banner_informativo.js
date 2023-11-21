import React, { useState } from "react";
import "../stylesheets/BannerInformativoStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const salir = <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#ffffff",}} />;

function Banner_informativo({ estadoBanner1, cambiarEstadoBanner1, nombreBanner1 }) {

	const salirBanner = (e) => {
		cambiarEstadoBanner1(false);
	};

	return (
    estadoBanner1 && (
      <>
        <div className="banner">
          <span> Se dio de baja exitosamente del evento {nombreBanner1}</span>
          <button id="botonSalirBanner" onClick={salirBanner}>
            {salir}
          </button>
        </div>
      </>
    )
  );
}

export default Banner_informativo;
