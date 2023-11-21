import React, { useState, useEffect } from "react";
import axios from "axios";
//import React, {Component} from 'react';
import "../../stylesheets/ModalWindowStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const salir = <FontAwesomeIcon icon={faCircleXmark} />;

function ModalAnuncio({ estadoAnuncio, cambiarEstadoAnuncio }) {
  const [values, setValues] = useState({
    contenido_anuncio: "",
  });

  const [errors, setErrors] = useState({});
  const [tipo_eventos, setTipo_eventos] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

//   useEffect(() => {
//     getTipos_Evento();
//   }, []);

//   const getTipos_Evento = async (e) => {
//     const url = "http://127.0.0.1:8000/api/type-events";
//     const respuesta = await axios.get(url);
//     setTipo_eventos(respuesta.data.events);
//   };

  const salirVentanaModal = (e) => {
    cambiarEstadoAnuncio(false);
    setValues({
      contenido_anuncio: "",
    });
    setErrors({});
  };

  const saveTypeEvent = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!values.contenido_anuncio.trim()) {
      validationErrors.contenido_anuncio = "Este campo es obligatorio";
    } else if (
      !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,500}[A-Za-zÑñáéíóú]$/.test(
        values.contenido_anuncio
      )
    ) {
      validationErrors.contenido_anuncio = "Ingrese un nombre valido";
    } 
    setErrors(validationErrors);

    // if (Object.keys(validationErrors).length === 0) {
    //   const res = await axios.post(
    //     "http://127.0.0.1:8000/api/add-event_type",
    //     values
    //   );
    //   if (res.data.status === 200) {
    //     console.log(values.contenido_anuncio);
    //     setValues({
    //       contenido_anuncio: "",
    //     });
    //     window.location.reload();
    //   }
    // }
  };

  return (
    estadoAnuncio && (
      <div className="Overlay">
        <div className="ContenedorModal">
          <div className="EncabezadoModal">
            <div className="tituloEvento">
              <h1>Crear anuncio</h1>
            </div>
            <button onClick={salirVentanaModal} className="BotonSalir">
              {salir}
            </button>
          </div>
          <div className="registroTipoEvento">
            <form onSubmit={saveTypeEvent} id="form1">
              
              <textarea
                name="contenido_anuncio"
                className="inputEventoAnuncio"
                placeholder="Ingrese anuncio"
                onChange={handleInput}
				rows={10}
				cols={50}
              />
            </form>
            {errors.contenido_anuncio && (
              <span className="span1Modal">{errors.contenido_anuncio}</span>
            )}
            <button form="form1" type="submit" className="BotonRegistrar">
              Publicar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalAnuncio;
