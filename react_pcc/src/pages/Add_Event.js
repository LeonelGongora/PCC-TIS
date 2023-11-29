import axios from 'axios';
import React, {Component} from 'react';
import "../stylesheets/CreateEventStyle.css";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Add_Event extends Component {
  eventos = [];

  eventos_registrados = [];

  getEventTypes = async () => {
    const url = "http://127.0.0.1:8000/api/type-events";

    this.setState({ loader: true });
    const events = await axios.get(url);
    this.eventos = Array.from(events.data.events);
    //console.log(events)
    this.setState({ loader: false });
  };

  componentDidMount() {
    this.getEventTypes();
    this.gentEvents();
  }

  gentEvents = async () => {
    const url = "http://127.0.0.1:8000/api/events";

    const events = await axios.get(url);
    this.eventos_registrados = Array.from(events.data.events);

    //console.log(events)
    //document.getElementsByName("participantes_equipo").type = "hidden";
    //let inputParticipantes = document.getElementsByName("participantes_equipo");
    //console.log(inputParticipantes)
    //inputParticipantes.type = 'hidden';
    //console.log(inputParticipantes)
  };

  constructor(props) {
    super(props);
    this.state = {
      image: "",
      nombre_evento: "",
      numero_contacto: "",
      descripcion: "",
      fecha_limite: "",
      fecha_fin: "",
      participantes_equipo: "",
      event_type_id: "",
      errors: {},
      contador: 0,
      isChecked: false,
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  saveEvent = async (e) => {

    let valor = document.getElementById("event_type_id").value;
    e.preventDefault();
    const validationErrors = {};

    console.log(this.state.image)
    console.log(this.state.image.name)
    if(!this.state.image){
      console.log("No hay archivo")
    }

    if (this.state.fecha_limite && this.state.fecha_fin) {
      var d1 = new Date(this.state.fecha_limite);
      var d2 = new Date(this.state.fecha_fin);

      var fecha1 = d1.getTime();
      var fecha2 = d2.getTime();

      if (fecha1 > fecha2) {
        validationErrors.fecha_limite =
          "La Fecha de Limite no puede ser superior a la Fecha de Fin ";
        validationErrors.fecha_fin =
          "La Fecha de Limite no puede ser superior a la Fecha de Fin";
      }
    }

    if (!this.state.nombre_evento.trim()) {
      validationErrors.nombre_evento = "Este campo es obligatorio";
    } else if (
      !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s0-9]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(this.state.nombre_evento)) {
      validationErrors.nombre_evento = "Ingrese un nombre válido";
    }else{
      for (let index = 0; index < this.eventos_registrados.length; index++) {

        let evento = this.eventos_registrados[index].nombre_evento.trim()

        if(evento === this.state.nombre_evento.trim()){
            validationErrors.nombre_evento = "Ya existe un evento con este nombre"
            break;
        }
      }
    }

    if (!this.state.numero_contacto.trim()) {
      validationErrors.numero_contacto = "Este campo es obligatorio";
    } else if (!/^(?!-)[7|6][0-9]{7}$/.test(this.state.numero_contacto)) {
      validationErrors.numero_contacto = "Ingrese un numero de contacto valido";
    }

    if (!this.state.descripcion.trim()) {
      validationErrors.descripcion = "Este campo es obligatorio";
    } else if (
      !/^[:;.,\-\A-Za-z0-9áéíóúñÑ][ :;.,\-\A-Za-z0-9áéíóúñÑ]{9,250}$/.test(
        this.state.descripcion
      )
    ) {
      validationErrors.descripcion = "Ingrese una descripción válida";
    }

    if (!this.state.fecha_limite.trim()) {
      validationErrors.fecha_limite = "Este campo es obligatorio";
    } else {
      let d2 = new Date(this.state.fecha_limite);
      d2.setDate(d2.getDate() + 1);
      d2.setUTCHours(0, 0, 0, 0);

      let date_Actual1 = new Date();
      date_Actual1.setDate(date_Actual1.getDate() + 1);
      date_Actual1.setUTCHours(0, 0, 0, 0);

      let fecha1 = d2.getTime();
      let fecha2 = date_Actual1.getTime();
      if (fecha1 < fecha2) {
        validationErrors.fecha_limite = "Esta fecha no es válida";
      }
    }

    if (!this.state.fecha_fin.trim()) {
      validationErrors.fecha_fin = "Este campo es obligatorio";
    } else {
      let d2 = new Date(this.state.fecha_fin);
      d2.setDate(d2.getDate() + 1);
      d2.setUTCHours(0, 0, 0, 0);

      let date_Actual1 = new Date();
      date_Actual1.setDate(date_Actual1.getDate() + 1);
      date_Actual1.setUTCHours(0, 0, 0, 0);

      let fecha1 = d2.getTime();
      let fecha2 = date_Actual1.getTime();
      if (fecha1 < fecha2) {
        validationErrors.fecha_fin = "Esta fecha no es válida";
      }
    }

    if (!this.state.participantes_equipo.trim() && this.state.participantes_equipo !== "0") {
      validationErrors.participantes_equipo = "Este campo es obligatorio"
    } else {
      if (
        (!/^(?!-)(?:[2-9]|[1]\d)$/.test(this.state.participantes_equipo) ||
        this.state.participantes_equipo === "0") && this.state.isChecked === false 
      ) {
        validationErrors.participantes_equipo =
          "Ingrese un número de participantes válido";
      }
    }

    if (this.state.image.name) {
      const extensiones = ["png", "PNG", "jpg", "jpeg"];

      var nombreArchivo = this.state.image.name;
      const extension = nombreArchivo.substring(
        nombreArchivo.lastIndexOf(".") + 1,
        nombreArchivo.length
      );
      if (!extensiones.includes(extension)) {
        document.getElementsByClassName("imagen_input").value = "";

        this.setState({ image: "" });
        validationErrors.image =
          "La imagen tiene que tener una extension .png, .jpg, .PNG o .jpeg";
      }
    }

    if (!this.state.event_type_id) {
      validationErrors.event_type_id = "Debe seleccionar un tipo de evento";
    }

    this.setState({ errors: validationErrors });

    if (Object.keys(validationErrors).length === 0) {
      let date_Actual = new Date();
      let dia = date_Actual.getDate();
      let mes = date_Actual.getMonth() + 1;
      let fecha_Actual = dia + "-" + mes + "-" + date_Actual.getFullYear();

      const url = "http://127.0.0.1:8000/api/add-event";
      const data = new FormData();

      if (this.state.image) {
        data.append("image", this.state.image);
      }
      data.append("nombre_evento", this.state.nombre_evento);
      data.append("fecha_inicio", fecha_Actual);
      data.append("numero_contacto", this.state.numero_contacto);
      data.append("descripcion", this.state.descripcion);
      data.append("fecha_limite", this.state.fecha_limite);
      data.append("fecha_fin", this.state.fecha_fin);
      if (this.state.participantes_equipo === "0") {
        data.append("participantes_equipo", 1);
      } else {
        data.append("participantes_equipo", this.state.participantes_equipo);
      }

      data.append("event_type_id", valor);

      axios.post(url, data).then((res) => {
        console.log(res);
        cookies.set("ultimo_id_evento", res.data.ultimo_id_evento, {path: "/",});
        window.location.href = "./add-event-next";
      });
    }
  };

  myFunction = async (e) => {
    let id_tipo_eventos = [];
    let nombre_tipo_eventos = [];
    var x = document.getElementById("desplegable");
    var i;

    if (this.state.contador === 0) {
      x.remove(0);
      this.setState({ contador: 1 });
    }

    for (i = 0; i < x.length; i++) {
      nombre_tipo_eventos.push(x.options[i].value);
      id_tipo_eventos.push(i + 1);
    }
    console.log(id_tipo_eventos);
    console.log(nombre_tipo_eventos);

    var y = document.getElementById("desplegable").value;
    var indice;
    for (indice = 0; indice < x.length; indice++) {
      if (y === nombre_tipo_eventos[indice]) {
        document.getElementById("event_type_id").value =
          id_tipo_eventos[indice];
        let valor = document.getElementById("event_type_id").value;
        this.setState({ event_type_id: valor });
        break;
      }
    }
  };
  changeChecked = (e) => {

    if(e.target.checked === true){
      document.querySelectorAll("#inputRegistro")[5].readOnly = true
      document.querySelectorAll("#inputRegistro")[5].value = ""
      this.setState({ participantes_equipo: "0"});

    }else{
      document.querySelectorAll("#inputRegistro")[5].readOnly = false
      this.setState({ participantes_equipo: ""});
    }
    this.setState((prev) => ({
      isChecked: !prev.isChecked,
    }));
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="crearEventos">
          <div className="textoEvento">
            <p className="textoRegistro"> Registro de Evento</p>
          </div>
          <div className="entradasDatos">
            <form  onSubmit={this.saveEvent}>
              <div className="datoNombre" id="entrada">
                <p id="textoCuadro">Nombre*</p>
                <input
                  id="inputRegistro"
                  type="text"
                  name="nombre_evento"
                  placeholder="Ingrese nombre"
                  onChange={this.handleInput}
                />
              </div>

              {this.state.errors.nombre_evento && (
                <span className="advertencia-creEve">
                  {this.state.errors.nombre_evento}
                </span>
              )}

              <div id="entrada">
                <p id="textoCuadro">Número de Contacto*</p>
                <input
                  id="inputRegistro"
                  type="number"
                  name="numero_contacto"
                  placeholder="65487898"
                  onChange={this.handleInput}
                />
              </div>
              {this.state.errors.numero_contacto && (
                <span className="advertencia-creEve">
                  {this.state.errors.numero_contacto}
                </span>
              )}

              <div id="entrada-area">
                <p id="textoCuadro">Descripcion de Evento*</p>
                <textarea
                  id="inputRegistro"
                  name="descripcion"
                  placeholder="Descripcion"
                  rows={5}
                  cols={30}
                  onChange={this.handleInput}
                />
              </div>
              {this.state.errors.descripcion && (
                <span className="advertencia-creEve">
                  {this.state.errors.descripcion}
                </span>
              )}

              <div id="entrada">
                <p id="textoCuadro">Fecha Limite de inscripcion*</p>
                <input
                  id="inputRegistro"
                  type="date"
                  name="fecha_limite"
                  onChange={this.handleInput}
                />
              </div>
              {this.state.errors.fecha_limite && (
                <span className="advertencia-creEve">
                  {this.state.errors.fecha_limite}
                </span>
              )}

              <div id="entrada">
                <p id="textoCuadro">Fecha Fin del evento*</p>
                <input
                  id="inputRegistro"
                  type="date"
                  name="fecha_fin"
                  onChange={this.handleInput}
                />
              </div>
              {this.state.errors.fecha_fin && (
                <span className="advertencia-creEve">
                  {this.state.errors.fecha_fin}
                </span>
              )}

              <div className="lineaCategoria">
                <div className="categoriaIndividual">
                  <input
                    type="checkbox"
                    id="checkBoxIndividual"
                    onChange={this.changeChecked}
                  />
                  <span id="tituloIndividualAdd">Individual</span>
                </div>
                <div className="entradaCantidadEqui">
                  <div id="entradaEsp">
                    <p id={this.state.isChecked ? "textoCuadroV2" : "textoCuadro"}>
                      Cantidad de participantes por equipo*
                    </p>
                    <input
                      id="inputRegistro"
                      type="number"
                      name="participantes_equipo"
                      maxLength={2}
                      placeholder="Ingrese un numero de participantes"
                      onChange={this.handleInput}
                      disabled={this.state.isChecked}
                    />
                  </div>
                  {this.state.errors.participantes_equipo && (
                    <span className="advertencia-creEveEsp">
                      {this.state.errors.participantes_equipo}
                    </span>
                  )}
                </div>
              </div>

              <div id="entrada">
                <p id="textoCuadro">Afiche</p>
                <input
                  id="inputRegistro"
                  type="file"
                  name="image"
                  onChange={this.handleChange}
                  className="imagen_input"
                />
              </div>

              {this.state.errors.image && (
                <span className="advertencia-creEve">
                  {this.state.errors.image}
                </span>
              )}

              <div id="entrada">
                <p id="textoCuadro">Tipo de evento*</p>
                <select id="desplegable" onChange={this.myFunction}>
                  <option disabled selected>
                    {" "}
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
              {this.state.errors.event_type_id && (
                <span className="advertencia-creEve">
                  {this.state.errors.event_type_id}
                </span>
              )}

              <div className="botonEnviar">
                <button className="botonRegistrar" type="submit">
                  {" "}
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Add_Event;
