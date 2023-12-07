import React, {useState} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {URL_API} from '../../const';

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalCampoNumerico({estadoCampoNumerico, cambiarEstadoCampoNumerico, id_evento, atributos}){

    const [values, setValues] = useState({
      nombre_atributo: "",
      rango_bajo: "",
      rango_alto: "",
      con_rango: 0,
    });
    const [isChecked, setChecked] = useState(true);

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value,
        });
    }

    const salirVentanaModal = (e) => {
        cambiarEstadoCampoNumerico(false);
        setValues({
            nombre_atributo : '',
        });
        setErrors({});
    }

    const changeChecked = (e) => {

        if(e.target.checked === true){
            document.querySelectorAll(".inputEvento")[1].readOnly = true

            document.querySelectorAll(".inputEvento")[2].readOnly = true
            setValues({...values, con_rango : 0});
            setChecked((prevState) => !prevState);

        }else{
            
            document.querySelectorAll(".inputEvento")[1].readOnly = false
            document.querySelectorAll(".inputEvento")[2].readOnly = false
            setValues({ ...values, con_rango: 1 });
            setChecked({ isChecked: false });
            setChecked((prevState) => !prevState);
        }
    }

    const saveTypeEvent = async (e) => {
        console.log(values.con_rango)
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_atributo.trim()){
            validationErrors.nombre_atributo = "Este campo es obligatorio"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(values.nombre_atributo)){
            validationErrors.nombre_atributo = "Ingrese un nombre valido"
        }else{/* 
            for (let index = 0; index < atributos.length; index++) {

                let atributo = atributos[index].nombre_atributo.trim()
                let nuevo_atributo = values.nombre_atributo.trim()

                if(atributo === nuevo_atributo){
                    validationErrors.nombre_atributo = "Ya existe un atributo con este nombre"
                    break;
                }
            }
            */
        }

        if(parseInt(values.con_rango) === 1){

            if(!values.rango_bajo.trim()){
                validationErrors.rango_bajo = "Este campo es obligatorio"
                
            }else if(values.rango_alto){
                if(parseInt(values.rango_bajo) > parseInt(values.rango_alto)){

                    validationErrors.rango_bajo = "El limite inferior no puede ser mayor al superior"
                    validationErrors.rango_alto = "El limite inferior no puede ser mayor al superior"
                }
            }

            if(!values.rango_alto.trim()){
                validationErrors.rango_alto = "Este campo es obligatorio"
                
            }else if(values.rango_bajo){
                if(parseInt(values.rango_bajo) > parseInt(values.rango_alto)){

                    validationErrors.rango_bajo = "El limite inferior no puede ser mayor al superior"
                    validationErrors.rango_alto = "El limite inferior no puede ser mayor al superior"
                }
            }
            
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){


            const data = new FormData();
            data.append('nombre_atributo', values.nombre_atributo)
            data.append('tipo_dato_atributo', "number")
            if(values.con_rango === 1){
                let restriccion = values.rango_bajo + "," + values.rango_alto
                data.append('restriccion', restriccion)
            }
            
            data.append('event_id', id_evento)

            const res = await axios.post(`${URL_API}/add-attribute`, data);
            
            if(res.data.status === 200){
                console.log(res);
                setValues({
                    nombre_atributo : '',
                    rango_bajo : "",
                    rango_alto : "",
                    con_rango: 0,
                });
                window.location.reload();
            }
        }
    }

    return (
        estadoCampoNumerico && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Añadir campo numerico</h1>
                  </div>
                  <button
                    onClick={salirVentanaModal}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">
                        <p id="textoCuadroAtributo">Nombre*</p>
                        <input
                            type="text"
                            name="nombre_atributo"
                            className="inputEvento"
                            placeholder="Ingrese nombre"
                            onChange={handleInput}
                        />
                        {errors.nombre_atributo && (
                        <span className="span1Modal">{errors.nombre_atributo}</span>
                        )}

                        <div className="categoriaIndividual">
                            <input
                                type="checkbox"
                                id="checkBoxIndividual"
                                onChange={changeChecked}
                                defaultChecked = {true}
                            />
                            <span id="tituloIndividualAdd">Sin resticcion</span>
                        </div>

                        <p id={isChecked ? "textoCuadroAtributo-campNumerico" : "textoCuadroAtributo"}>Limite inferior*</p>
                        <input
                            type="number"
                            name="rango_bajo"
                            className="inputEvento"
                            placeholder=""
                            onChange={handleInput}
                            readOnly
                        />
                        {errors.rango_bajo && (
                        <span className="span1Modal">{errors.rango_bajo}</span>
                        )}

                        <p id={isChecked ? "textoCuadroAtributo-campNumerico" : "textoCuadroAtributo"}>Limite superior*</p>
                        <input
                            type="number"
                            name="rango_alto"
                            className="inputEvento"
                            placeholder=""
                            onChange={handleInput}
                            readOnly
                        />
                        {errors.rango_alto && (
                        <span className="span1Modal">{errors.rango_alto}</span>
                        )}
                    </form>

                    <button form="form1" type="submit" className="BotonRegistrar">
                        Agregar
                    </button>
                </div>
              </div>
            </div>
        )
    );
}

export default ModalCampoNumerico; 