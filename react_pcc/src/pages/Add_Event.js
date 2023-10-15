import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/CreateEventStyle.css";
import Loader from "./Loader";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import {faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons';

// const plus = <FontAwesomeIcon icon={faPlus} />
// const addBrac = <FontAwesomeIcon icon={faArrowUpFromBracket} />

class Add_Event extends Component {
	eventos = [];

	// state = {
	// events: [],
	// loader:false,
	// url: "http://127.0.0.1:8000/api/type-events"

	//};
	/*
  The code below will change
  the heading with id = "myH"
  and the paragraph with id = "myP"
  in my web page:
  */

	getEventTypes = async () => {
		const url = "http://127.0.0.1:8000/api/type-events";

		this.setState({ loader: true });
		const events = await axios.get(url);
		this.eventos = Array.from(events.data.events);
		console.log(events);

		this.setState({ events: events.data, loader: false });
		console.log(this.eventos);
	};

	componentDidMount() {
		this.getEventTypes();
	}
	/*
  
  
	  state = {
		  events: [],
		  loader:false,
		  url: "http://127.0.0.1:8000/api/type-events",
  
  
		  nombre_evento: '',
		  requisitos: '',
		  fecha_inicio: '',
		  numero_contacto: '',
		  descripcion: '',
		  fecha_limite: '',
		  fecha_fin: '',
		  participantes_equipo: '',
		  event_type_id: '',
		  image: ''
	  }
	  */

	constructor(props) {
		super(props);
		this.state = {
			image: "",
			nombre_evento: "",
			requisitos: "",
			fecha_inicio: "",
			numero_contacto: "",
			descripcion: "",
			fecha_limite: "",
			fecha_fin: "",
			participantes_equipo: "",
			event_type_id: "",
			errorNombre: "",
			advertenciaNombre: false,
			errorRequisitos: "",
			advertenciaRequisitos: false,
			errorFechaInicio: "",
			advertenciaFechaInicio: false,
			errorNumero: "",
			advertenciaNumero: false,
			errorDescripcion: "",
			advertenciaDescripcion: false,
			errorFechaLimite: "",
			advertenciaFechaLimite: false,
			errorFechaFinEvento: "",
			advertenciaFechaFinEvento: false,
			errorParticipantes: "",
			advertenciaParticipantes: false,
			errorTipoEvento: "",
			advertenciaTipoEvento: false,
		};
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});

		if (e.target.name === "nombre_evento" && e.target.value.trim() !== "") {
			this.setState({ errorNombre: "" });
			this.setState({ advertenciaNombre: false });
		}
		if (e.target.name === "requisitos" && e.target.value.trim() !== "") {
			this.setState({ errorRequisitos: "" });
			this.setState({ advertenciaRequisitos: false });
		}
		if (e.target.name === "fecha_inicio" && e.target.value.trim() !== "") {
			this.setState({ errorFechaInicio: "" });
			this.setState({ advertenciaFechaInicio: false });
		}
		if (e.target.name === "numero_contacto" && e.target.value.trim() !== "") {
			this.setState({ errorNumero: "" });
			this.setState({ advertenciaNumero: false });
		}
		if (e.target.name === "descripcion" && e.target.value.trim() !== "") {
			this.setState({ errorDescripcion: "" });
			this.setState({ advertenciaDescripcion: false });
		}
		if (e.target.name === "fecha_limite" && e.target.value.trim() !== "") {
			this.setState({ errorFechaLimite: "" });
			this.setState({ advertenciaFechaLimite: false });
		}
		if (e.target.name === "fecha_fin" && e.target.value.trim() !== "") {
			this.setState({ errorFechaFinEvento: "" });
			this.setState({ advertenciaFechaFinEvento: false });
		}
		if (
			e.target.name === "participantes_equipo" &&
			e.target.value.trim() !== ""
		) {
			this.setState({ errorParticipantes: "" });
			this.setState({ advertenciaParticipantes: false });
		}
		if (e.target.name === "event_type_id" && e.target.value.trim() !== "") {
			this.setState({ errorTipoEvento: "" });
			this.setState({ advertenciaTipoEvento: false });
		}
	};

	handleChange = (e) => {
		this.setState({
			image: e.target.files[0],
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.nombre_evento.trim() === "") {
			this.setState({ errorNombre: "El nombre es obligatorio" });
			this.setState({ advertenciaNombre: !this.advertenciaNombre });
		}
		if (this.state.requisitos.trim() === "") {
			this.setState({ errorRequisitos: "Campo vacio" });
			this.setState({ advertenciaRequisitos: !this.advertenciaRequisitos });
		}
		if (this.state.fecha_inicio.trim() === "") {
			this.setState({ errorFechaInicio: "Campo vacio" });
			this.setState({ advertenciaFechaInicio: !this.advertenciaFechaInicio });
		}
		if (this.state.numero_contacto.trim() === "") {
			this.setState({ errorNumero: "Campo vacio" });
			this.setState({ advertenciaNumero: !this.advertenciaNumero });
		}
		if (this.state.descripcion.trim() === "") {
			this.setState({ errorDescripcion: "Campo vacio" });
			this.setState({ advertenciaDescripcion: !this.advertenciaDescripcion });
		}
		if (this.state.fecha_limite.trim() === "") {
			this.setState({ errorFechaLimite: "Campo vacio" });
			this.setState({ advertenciaFechaLimite: !this.advertenciaFechaLimite });
		}
		if (this.state.fecha_fin.trim() === "") {
			this.setState({ errorFechaFinEvento: "Campo vacio" });
			this.setState({
				advertenciaFechaFinEvento: !this.advertenciaFechaFinEvento,
			});
		}
		if (this.state.participantes_equipo.trim() === "") {
			this.setState({ errorParticipantes: "Campo vacio" });
			this.setState({
				advertenciaParticipantes: !this.advertenciaParticipantes,
			});
		}
		if (this.state.event_type_id.trim() === "") {
			this.setState({ errorTipoEvento: "Campo vacio" });
			this.setState({ advertenciaTipoEvento: !this.advertenciaTipoEvento });
		}
	};

	saveEvent = async (e) => {
		let valor = document.getElementById("event_type_id").value;

		e.preventDefault();

		const url = "http://127.0.0.1:8000/api/add-event";
		const data = new FormData();
		data.append("image", this.state.image);

		data.append("nombre_evento", this.state.nombre_evento);
		data.append("requisitos", this.state.requisitos);
		data.append("fecha_inicio", this.state.fecha_inicio);
		data.append("numero_contacto", this.state.numero_contacto);
		data.append("descripcion", this.state.descripcion);
		data.append("fecha_limite", this.state.fecha_limite);
		data.append("fecha_fin", this.state.fecha_fin);
		data.append("participantes_equipo", this.state.participantes_equipo);
		data.append("event_type_id", valor);

		axios.post(url, data).then((res) => {
			console.log(res);
		});
	};

	myFunction() {
		let id_tipo_eventos = [];
		let nombre_tipo_eventos = [];
		var x = document.getElementById("desplegable");
		var i;
		for (i = 0; i < x.length; i++) {
			nombre_tipo_eventos.push(x.options[i].value);
			id_tipo_eventos.push(i + 1);
		}
		//console.log(id_tipo_eventos);
		//console.log(nombre_tipo_eventos);

		//console.log(x)

		var y = document.getElementById("desplegable").value;
		var indice;
		for (indice = 0; indice < x.length; indice++) {
			if (y === nombre_tipo_eventos[indice]) {
				document.getElementById("event_type_id").value =
					id_tipo_eventos[indice];
				break;
			}
		}
		//console.log(y)
		//document.getElementById("demo").innerHTML = x;
	}

	render() {
		return (
			<>
				<div className="crearEventos">
					<div className="textoEvento">
						<p className="textoRegistro"> Registro de eventos</p>
					</div>
					<div className="entradasDatos">
						<form onSubmit={this.saveEvent}>
							<div id={this.state.errorNombre ? "error" : "entrada"}>
								<p id="textoCuadro">Nombre</p>
								<input
									id="inputRegistro"
									type="text"
									name="nombre_evento"
									placeholder="Ingrese nombre"
									onChange={this.handleInput}
								/>
							</div>
							{this.state.advertenciaNombre && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							<div id={this.state.errorRequisitos ? "error" : "entrada"}>
								<p id="textoCuadro">Requisitos</p>
								<input
									id="inputRegistro"
									type="text"
									name="requisitos"
									placeholder="requisitos"
									onChange={this.handleInput}
								/>
							</div>
							{this.state.advertenciaRequisitos && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							<div id={this.state.errorFechaInicio ? "error" : "entrada"}>
								<p id="textoCuadro">Fecha de Inicio</p>
								<input
									id="inputRegistro"
									type="date"
									name="fecha_inicio"
									placeholder="Ingrese fecha"
									onChange={this.handleInput}
								/>
							</div>
							{this.state.advertenciaFechaInicio && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							<div id={this.state.errorNumero ? "error" : "entrada"}>
								<p id="textoCuadro">Numero de Contacto</p>
								<input
									id="inputRegistro"
									type="tel"
									maxLength={8}
									name="numero_contacto"
									placeholder="65487898"
									onChange={this.handleInput}
								/>
							</div>

							{this.state.advertenciaNumero && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							<div id={this.state.errorDescripcion ? "error" : "entrada"}>
								<p id="textoCuadro">Descripcion</p>
								<input
									id="inputRegistro"
									type="text"
									name="descripcion"
									placeholder="Descripcion"
									onChange={this.handleInput}
								/>
							</div>
							{this.state.advertenciaDescripcion && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							<div id={this.state.errorFechaLimite ? "error" : "entrada"}>
								<p id="textoCuadro">Fecha limite de inscripcion</p>
								<input
									id="inputRegistro"
									type="date"
									name="fecha_limite"
									onChange={this.handleInput}
								/>
							</div>
							{this.state.advertenciaFechaLimite && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							<div id={this.state.errorFechaFinEvento ? "error" : "entrada"}>
								<p id="textoCuadro">Fecha fin del evento</p>
								<input
									id="inputRegistro"
									type="date"
									name="fecha_fin"
									onChange={this.handleInput}
								/>
							</div>
							{this.state.advertenciaFechaFinEvento && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							<div id={this.state.errorParticipantes ? "error" : "entrada"}>
								<p id="textoCuadro">Participantes por equipo</p>

								<input
									id="inputRegistro"
									type="tel"
									name="participantes_equipo"
									maxLength={2}
									placeholder="Ingrese un numero de participantes"
									onChange={this.handleInput}
								/>
							</div>

							{this.state.advertenciaParticipantes && (
								<p className="advertencia">Campo Obligatorio</p>
							)}

							{/* <div id='entrada'>
                            <p id='textoCuadro'>Afiche</p>
                            <input id='inputRegistro' type='file' name="image" onChange={this.handleChange}/>
                        </div> */}

							<div id={this.state.errorTipoEvento ? "error" : "entrada"}>
								<p id="textoCuadro">Tipo de evento</p>
								<div id="interiorTipo">
									<select id="option" onChange={this.myFunction}>
										<option value="" disabled selected>
											Seleccione un tipo
										</option>
										{this.eventos.map((evento, id) => {
											return <option>{evento.nombre_tipo_evento}</option>;
										})}
									</select>
									<input
										type="hidden"
										name="event_type_id"
										id="event_type_id"
										onChange={this.handleInput}
									/>
								</div>
							</div>
							{this.state.advertenciaTipoEvento && (
								<p className="advertencia">Campo Obligatorio</p>
							)}
							{/* <div className='Patrocinadores' id='entrada'>
                            <p id='textoCuadro'>Patrocinadores</p>
                       </div>
                        <div className='Organizadores' id='entrada'>
                            <p id='textoCuadro'>Organizadores</p>
                        </div>    */}
							{/* <Link to={'add-type-event'}> Añadir Tipo de Evento</Link> */}
							<div className="botonEnviar">
								<button
									onClick={this.handleSubmit}
									className="botonRegistrar"
									type="submit"
								>
									{" "}
									Registrarse
								</button>
							</div>
						</form>
						{this.state.loader ? <Loader /> : ""}
					</div>
				</div>
			</>
		);
	}
}

export default Add_Event;
