import React, { Component } from 'react';
import "../stylesheets/CreateEventStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons';

const plus = <FontAwesomeIcon icon={faPlus} />
const addBrac = <FontAwesomeIcon icon={faArrowUpFromBracket} />


class CreateEvents extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: "",
            requisito: "",
            fechaInicio: '2023-10-10',
            celular: "",
            descripcion: "",
            fechaLimite: '2023-10-10',
            fechaFinEvent: '2024-10-10',
            participantesEquip: "",
            seleccionTipo: "",
            errorNombre: ""
        };
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

        if (name == "nombre" && value.trim() !== "") {
            this.setState({ errorNombre: "" });
        }
    };
    handleSubmit = (event) => {
        event.preventDefault(); 

        if (this.state.nombre.trim() == "") {
            this.setState({ errorNombre: "El nombre es obligatorio" });
        }

        console.log("Datos enviados:", this.state);
    };

    handleFocus = () => {
        this.setState({ isFocused: true });
    }

    handleBlur = () => {
        this.setState({ isFocused: false });
    }

    render(){
        return (
        <div className='crearEventos'>
            <div className='textoEvento'>
                <p className='textoRegistro'> Registro de eventos</p>
            </div>
            <div className='entradasDatos'>
                <div className='datoNombre' id= {this.state.errorNombre ? 'error' : 'entrada'}>
                    <p id='textoCuadro'>Nombre</p>
                        <input type='text' name='nombre' value={this.state.nombre} onChange={this.handleChange} placeholder={this.state.errorNombre || "Ingrese el nombre"}
                        onFocus={this.handleFocus} onBlur={this.handleBlur}
                        />
                </div>
                <div className='datoRequisitos' id='entrada'>
                    <p id='textoCuadro'>Requisitos</p>
                    <input type='text' name='requisito' value={this.state.requisito} onChange={this.handleChange} placeholder="Ingrese requisitos"/>
                </div>
                <div className='fechaInicio' id='entrada'>
                    <p id='textoCuadro'>Fecha de Inicio</p>
                    <input type='date' name='fechaInicio' value={this.state.fechaInicio} onChange={this.handleChange} />
                </div>
                <div className='numeroContacto' id='entrada'>
                    <p id='textoCuadro'>Numero de Contacto</p>
                    <input type='tel' name='celular' value={this.state.celular} maxLength={8} onChange={this.handleChange} placeholder="Ingrese celular"/>
                </div>
                <div className='descripcionEvento' id='entrada'>
                    <p id='textoCuadro'>Descripcion</p>
                    <input type='text' name='descripcion' value={this.state.descripcion} onChange={this.handleChange} placeholder="Ingrese la descripcion"/>
                </div>
                <div className='fechaLimiteInscripcion' id='entrada'>
                    <p id='textoCuadro'>Fecha limite de inscripcion</p>
                    <input type='date' name='fechaLimite' value={this.state.fechaLimite} onChange={this.handleChange} />
                </div>    
                <div className='fechaFinEvento' id='entrada'>
                    <p id='textoCuadro'>Fecha fin del evento</p>
                    <input type='date' name='fechaFinEvent' value={this.state.fechaFinEvent} onChange={this.handleChange} />
                </div>      
                <div className='numeroParticipantes' id='entrada'>
                    <p id='textoCuadro'>Participantes por equipo</p>
                    <input type='tel' name='participantesEquip' value={this.state.participantesEquip} maxLength={2} onChange={this.handleChange} placeholder="Ingrese un numero de participantes"/>
                </div>
                <div className='tipoEvento2' id='entrada'>
                    <p id='textoCuadro'>Tipo de evento</p>
                    <div id='interiorTipo'>
                        <select id='option' name='seleccionTipo' value={this.state.seleccionTipo} onChange={this.handleChange} placeholder='Seleccion un tipo'>        
                        <option value="" disabled selected>Seleccione un tipo</option>
                        <option>Opcion1</option>
                        <option>Opcion2</option>
                        <option>Opcion3</option>
                    </select>
                    <button id='iconsImp'> {plus}</button>        
                    </div>
                </div>
                {/* <div className='patrocinadores' id='entrada'>
                    <p id='textoCuadro'>Patrocinadores</p>
                    <button id='iconsImp'> {addBrac}</button>
                </div>
                <div className='organizadores' id='entrada'>
                    <p id='textoCuadro'>Organizadores</p>
                    <button id='iconsImp'> {addBrac}</button>
                </div>     */}
                <div className='botonEnviar'>
                    <button className='botonRegistrar' onClick={this.handleSubmit}> Registrarse </button>
                </div>    
            </div>
        </div>
        );
    }
}

export default CreateEvents;