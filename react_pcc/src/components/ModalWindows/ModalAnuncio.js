import React, { useState} from "react";
import axios from "axios";
import "../../stylesheets/ModalWindowStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {URL_API} from '../../const';
const salir = <FontAwesomeIcon icon={faCircleXmark} />;

function ModalAnuncio({ estadoAnuncio, cambiarEstadoAnuncio }) {
  const [values, setValues] = useState({
    contenido_anuncio: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

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
    } else if (!/^[ :;.,\-\A-Za-z0-9áéíóúñÑ]{3,150}$/.test(values.contenido_anuncio)) {
      validationErrors.contenido_anuncio = "Ingrese un contenido válido";
    } 
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      const data = new FormData();

      data.append('contenido_anuncio', values.contenido_anuncio)

      const res = await axios.post(`${URL_API}/add-notice`, data);
      
      if (res.data.status === 200) {
        console.log(res);
        setValues({
           contenido_anuncio: "",
        });
        window.location.reload();
      }
    }
  };

  return (
    estadoAnuncio && (
      <div className="Overlay">
        <div className="ContenedorModal">
          <div className="EncabezadoModal">
            <div className="tituloEvento">
              <h1>Crear anuncio</h1>
            </div>
            <button onClick={salirVentanaModal} type="button" className="BotonSalir">
              {salir}
            </button>
          </div>
          <div className="registroTipoEvento">
            <form onSubmit={saveTypeEvent} id="form1">
            <p id="textoCuadroAtributo" className="textoCuadroAnuncio">Anuncio*</p>
              <textarea
                name="contenido_anuncio"
                className="inputEventoAnuncio"
                placeholder="Escriba el contenido"
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
